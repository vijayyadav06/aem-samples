
package com.medtronic.com.workflow.processes;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.Rendition;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

/**
 * Workflow process to manage tags by using a defined spreadsheet format. The spreadsheet must have the following
 * format: <br/>
 * Row 1: Labels <br/>
 * Row 2+: Data <br/>
 * Column 1: Remove? (if cell is empty, whitespace-only, "add", "no", or "false" then add the tag, all other values are
 * assumed to indicate the tag is to be removed) <br/>
 * Columns 2+: Tag parts (friendly names). <br/>
 * <table>
 * <tr>
 * <td><b>add/remove<b></td>
 * <td><b>Namespace</b></td>
 * <td><b>Level 1</b></td>
 * <td><b>Level 2</b></td>
 * <td><b>Level...</b></td>
 * </tr>
 * <tr>
 * <td></td>
 * <td>This is</td>
 * <td>a new</td>
 * <td>tag & its</td>
 * <td>parent tags</td>
 * </tr>
 * <tr>
 * <td>X</td>
 * <td>This will</td>
 * <td>remove this</td>
 * <td>tag & its</td>
 * <td>child tags</td>
 * </tr>
 * </table>
 */
@Component(label = "Medtronic.com -  Tag Import Workflow Process ", metatype = true, immediate = true)
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Tag Import Workflow Process"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Tag Import Workflow Process") })
@Service
public class TagImportWorkflowProcess implements WorkflowProcess {

    private static final Logger LOG = LoggerFactory.getLogger(TagImportWorkflowProcess.class);

    private static final String ETC_TAGS = "/etc/tags/";
    private static final char NON_BREAKING_SPACE = '\u00A0';
    private static final char SPACE = ' ';
    private static final char HYPHEN = '-';
    
    private static final String SPECIAL_CHARS;
    private static final String SPECIAL_REPLACEMENTS;

    static {
        // Build up the special chars and replacements
        StringBuilder specialCharsSb = new StringBuilder("/:[]*|'#").append(SPACE);
        SPECIAL_CHARS =  specialCharsSb.toString();
        SPECIAL_REPLACEMENTS = StringUtils.leftPad(StringUtils.EMPTY, SPECIAL_CHARS.length(), HYPHEN);
    }

    private String getValidJcrName(final String potentiallyBadName) {
        final String nbspAsSpace = potentiallyBadName.replace(NON_BREAKING_SPACE, SPACE);
        final String trimmed = StringUtils.trimToEmpty(nbspAsSpace);
        final String specialCharsAsHyphen = StringUtils.replaceChars(trimmed, SPECIAL_CHARS, SPECIAL_REPLACEMENTS);
        final String finalString = specialCharsAsHyphen.toLowerCase();

        return finalString;
    }

    private void createTag(final CharSequence tagIdCs,
                           final String tagTitle,
                           final TagManager tagManager) {
        LOG.trace("begin createTag(), id: {}, title: {}", tagIdCs, tagTitle);
        final String tagId = tagIdCs.toString();

        try {
            if (tagManager.canCreateTag(tagId)) {
                tagManager.createTag(tagId, tagTitle, StringUtils.EMPTY);
            }
        } catch (InvalidTagFormatException e) {
            LOG.error("Could not create tag {}", tagId, e);
        }

        LOG.trace("end createTag(), id: {}, title: {}", tagIdCs, tagTitle);
    }

    private void createTags(final List<String> tagParts,
                            final TagManager tagManager) {
        LOG.trace("begin createTags(), parts: {}", tagParts);

        final StringBuilder tagIdSb = new StringBuilder(100);

        tagIdSb.append(ETC_TAGS);

        for (String tagTitle : tagParts) {
            tagIdSb.append(getValidJcrName(tagTitle)).append("/");
            createTag(tagIdSb, tagTitle, tagManager);
        }

        LOG.trace("end createTags(), parts: {}", tagParts);
    }

    private void removeTags(final List<String> tagParts,
                            final TagManager tagManager) {
        LOG.trace("begin removeTags(), parts: {}", tagParts);
        final StringBuilder tagIdSb = new StringBuilder(100);

        tagIdSb.append(ETC_TAGS);

        for (String tagTitle : tagParts) {
            tagIdSb.append(getValidJcrName(tagTitle)).append("/");
            createTag(tagIdSb, tagTitle, tagManager);
        }
        
        final String tagId = tagIdSb.toString();
        final Tag tagToDelete = tagManager.resolve(tagId);

        if (tagToDelete != null) {
            tagManager.deleteTag(tagToDelete);
        } else {
            LOG.debug("Tried to remove non-existant tag {}", tagId);
        }

        LOG.trace("end removeTags(), parts: {}", tagParts);
    }

    private boolean getRemoveValue(final String text) {
        return !(StringUtils.isEmpty(text) || StringUtils.equalsIgnoreCase(text, "add")
                || StringUtils.equalsIgnoreCase(text, "no") || StringUtils.equalsIgnoreCase(text, "false"));
    }

    private void handleRow(final Row row,
                           final TagManager tagManager) {
        LOG.trace("begin handleRow(), row: {}", row.getRowNum());

        final Iterator<Cell> cellIterator = row.cellIterator();

        if (cellIterator.hasNext()) {
            // Get the first cell and check if it is the remove cell
            final Cell removeCell = row.getCell(0);
            boolean removeTag = false;

            if (removeCell != null && removeCell.getCellType() == Cell.CELL_TYPE_STRING) {
                removeTag = getRemoveValue(StringUtils.trimToEmpty(removeCell.getStringCellValue()));
                // ensure we skip the first cell inthe the iterator, since it is the remove cell
                cellIterator.next();
            }

            final List<String> tagParts = new ArrayList<>(5);

            while (cellIterator.hasNext()) {
                final Cell cell = cellIterator.next();
                if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
                    tagParts.add(StringUtils.trimToEmpty(cell.getStringCellValue()));
                }
            }

            if (tagParts.size() > 0) {
                if (!removeTag) {
                    createTags(tagParts, tagManager);
                } else {
                    removeTags(tagParts, tagManager);
                }
            }
        } else {
            LOG.error("No cells in row {}", row.getRowNum());
        }

        LOG.trace("end handleRow(), row: {}", row.getRowNum());
    }

    private void handleSheet(final Sheet sheet,
                             final TagManager tagManager) {
        LOG.trace("begin handleSheet(), sheet name: {}", sheet.getSheetName());
        final Iterator<Row> rowIterator = sheet.rowIterator();

        if (rowIterator.hasNext()) {
            // Skip the first row
            rowIterator.next();

            while (rowIterator.hasNext()) {
                final Row row = rowIterator.next();
                handleRow(row, tagManager);
            }
        } else {
            LOG.error("No tags in the worksheet");
        }

        LOG.trace("end handleSheet(), sheet name: {}", sheet.getSheetName());
    }

    private void executeWorkflow(final WorkItem workItem,
                                 final WorkflowSession workflowSession,
                                 final MetaDataMap args) throws WorkflowException {
        LOG.trace("begin execute()");

        final WorkflowData workflowData = workItem.getWorkflowData();

        final String spreadsheetPath = workflowData.getPayload().toString();
        LOG.debug("Runnung workflow on spreadsheetPath {}", spreadsheetPath);

        final ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
        final AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
        final Asset spreadsheetAsset = assetManager.getAsset(spreadsheetPath);
        final Rendition spreadsheetRendition = spreadsheetAsset.getRendition("original");

        try (final InputStream spreadsheetStream = spreadsheetRendition.getStream()) {
            /*
             * This will be flagged by Eclipse as a "resource leak" until the proper version of POI is added as a
             * dependency. The proper version is com.adobe.granite:com.adobe.granite.poi:2.0.0, which is an AEM wrapped
             * version, but cannot be found in any Adobe repository. In POI 3.0+, there were breaking changes added to
             * the API, all of which we are not using. The correct dependency is added to the pom.xml, but is commented
             * out, until it is added into the ivy repo.
             */
            @SuppressWarnings("resource")
            final Workbook workbook = new XSSFWorkbook(spreadsheetStream);
            final Sheet sheet = workbook.getSheetAt(0);

            handleSheet(sheet, tagManager);
            resourceResolver.commit();
        } catch (PersistenceException e) {
            LOG.error("Could not save tags after adding/removing", e);
        } catch (IOException e) {
            LOG.error("Could not open spreadsheet stream", e);
        }

        LOG.trace("end execute()");
    }

    @Override
    public void execute(final WorkItem workItem,
                        final WorkflowSession workflowSession,
                        final MetaDataMap args) throws WorkflowException {
        try {
            executeWorkflow(workItem, workflowSession, args);
        } catch (Exception e) {
            LOG.error("Workflow threw an exception", e);
            workflowSession.terminateWorkflow(workItem.getWorkflow());
        }

        workflowSession.complete(workItem, workflowSession.getRoutes(workItem, true).get(0));
    }
}
