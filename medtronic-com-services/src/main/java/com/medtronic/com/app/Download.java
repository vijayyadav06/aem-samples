
package com.medtronic.com.app;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;

/**
 * WCMUse class for download attachment component
 * 
 * @author saraswathy.kalyani, Perficient
 */
public class Download extends WCMUse {

    private static final Logger LOGGER = LoggerFactory.getLogger(Download.class);

    /**
     * Enum types for allowed file categories to identify file icons
     */
    public enum FileTypes {
        DOCUMENT(Arrays.asList("pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx")), IMAGE(Arrays.asList("jpg", "jpeg",
                "png", "gif", "bmp")), MEDIA(Arrays.asList("mp3", "mp4", "ogg", "webm")), ARCHIVE(Arrays.asList("zip"));

        private final List<String> types;

        private FileTypes(List<String> types) {
            this.types = types;
        }

        public List<String> getTypes() {
            return types;
        }
    }

    private static final String PROPERTY_DOWNLOADS = "downloads";
    private static final String PROPERTY_TITLE = "title";
    private static final String PROPERTY_URL = "url";
    private static final String PROPERTY_NEW_TAB = "_DNT_newTab";
    private static final String PROPERTY_DESC = "description";
    private static final String PROPERTY_DATE = "_DNT_publicationDate";
    private static final String PROPERTY_DISPLAY_DATE = "_DNT_displayDate";

    private static final String TRUE_STRING = "true";
    private static final String REGEX_EXTN = "\\.";

    private static final String DECIMAL_FORMAT_KB = "0";
    private static final String DECIMAL_FORMAT = "0.0";
    private static final String SIZE_MB = "MB";
    private static final String SIZE_GB = "GB";
    private static final String SIZE_KB = "KB";
    private static final String SIZE_B = "B";

    private static final String DATE_FORMAT_INPUT = "MM/dd/yy";
    private static final String DATE_SEPERATOR_DEFAULT = "/";
    private static final String DATE_SEPERATOR = "-";
    private static final String DATE_SEPERATOR_DOT = ".";

    private static final double KB_VALUE = 1024D;
    private static final double MB_VALUE = 1048576D;
    private static final double GB_VALUE = 1073741824D;
    public static final String DATE_YEAR_REGEX = "y+";
    public static final String DATE_DAY_REGEX = "d+";
    public static final String DATE_MON_REGEX = "M+";
    public static final String DATE_YEAR_FORMAT = "yyyy";
    public static final String DATE_DAY_FORMAT = "dd";
    public static final String DATE_MON_FORMAT = "MM";

    private List<DownloadAttachment> attachments;

    @Override
    public void activate() throws Exception {
        LOGGER.debug("Activating Download Component Use class");
        attachments = new ArrayList<>();
        String[] downloads = getProperties().get(PROPERTY_DOWNLOADS, String[].class);
        if (downloads != null && downloads.length > 0) {
            for (String download : downloads) {
                DownloadAttachment attachment = getAttachment(download);
                attachments.add(attachment);
            }
        }
    }

    /**
     * Parses the authored download attachment information (as a string) into a DownloadAttachment.
     * 
     * @param download the authored string for the download
     * @return the parsed out DownloadAttachment 
     */
    private DownloadAttachment getAttachment(String download) {
        DownloadAttachment attachment = new DownloadAttachment();
        try {
            JSONObject downloadJSON = new JSONObject(download);
            String title = downloadJSON.getString(PROPERTY_TITLE);
            String url = downloadJSON.getString(PROPERTY_URL);
            String extension = "";
            String fileSize = "";
            String[] nameArray = url.split(REGEX_EXTN);
            if (nameArray.length > 1) {
                extension = nameArray[nameArray.length - 1];
            }
            if (FileTypes.ARCHIVE.getTypes().contains(extension)) {
                attachment.setFileType(FileTypes.ARCHIVE.name());
            } else if (FileTypes.IMAGE.getTypes().contains(extension)) {
                attachment.setFileType(FileTypes.IMAGE.name());
            } else if (FileTypes.MEDIA.getTypes().contains(extension)) {
                attachment.setFileType(FileTypes.MEDIA.name());
            } else if (FileTypes.DOCUMENT.getTypes().contains(extension)) {
                attachment.setFileType(FileTypes.DOCUMENT.name());
            }
            Resource attachmentResource = getResourceResolver().getResource(url);
            if (attachmentResource != null) {
                Asset asset = attachmentResource.adaptTo(Asset.class);
                Rendition original = asset.getOriginal();
                fileSize = getFileSize(original.getSize());
            }
            boolean newTab = false;
            if (downloadJSON.has(PROPERTY_NEW_TAB) && downloadJSON.getString(PROPERTY_NEW_TAB).contains(TRUE_STRING)) {
                newTab = true;
            }

            String description = downloadJSON.getString(PROPERTY_DESC);
            String dateString = formatDatewithLocale(downloadJSON.getString(PROPERTY_DATE));

            boolean displayDate = false;
            if (downloadJSON.has(PROPERTY_DISPLAY_DATE)
                    && downloadJSON.getString(PROPERTY_DISPLAY_DATE).contains(TRUE_STRING)) {
                displayDate = true;
            }

            attachment.setDate(dateString);
            attachment.setDescription(description);
            attachment.setDisplayDate(displayDate);
            attachment.setNewTab(newTab);
            attachment.setTitle(title);
            attachment.setUrl(url);
            attachment.setExtension(extension);
            attachment.setSize(fileSize);

        } catch (JSONException | ParseException e) {
            LOGGER.error("Could not parse download attachment json", e);
        }

        return attachment;
    }

    /**
     * Takes a given date string and reformats it into a locale specific format for the currentPage's configured language.
     * 
     * @param dateString the authored date
     * @return the date formatted in the currentPage's locale
     */
    private String formatDatewithLocale(String dateString) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT_INPUT);
        Date localeDate = dateFormat.parse(dateString);
        DateFormat newDateFormat = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.UK);
        String newDateString;
        if (newDateFormat instanceof SimpleDateFormat) {
            SimpleDateFormat newSimpleDateFormat = (SimpleDateFormat) newDateFormat;
            // To show Locale specific short date expression with full year
            String pattern = newSimpleDateFormat.toPattern();
            pattern = pattern.replaceAll(DATE_YEAR_REGEX, DATE_YEAR_FORMAT).replaceAll(DATE_DAY_REGEX, DATE_DAY_FORMAT)
                    .replaceAll(DATE_MON_REGEX, DATE_MON_FORMAT);
            newSimpleDateFormat.applyPattern(pattern);
            newDateString = newSimpleDateFormat.format(localeDate);
        } else {
            newDateString = newDateFormat.format(localeDate);
        }
        if (newDateString.contains(DATE_SEPERATOR_DOT)) {
            return newDateString.replace(DATE_SEPERATOR_DOT, DATE_SEPERATOR);
        } else {
            return newDateString.replace(DATE_SEPERATOR_DEFAULT, DATE_SEPERATOR);
        }
    }

    /**
     * Formats a given size (in bytes) into a user-friendly size string.
     * 
     * @param size the size, in bytes
     * @return a string represenstation of the size
     */
    private String getFileSize(long size) {
        String fileSize;
        double kb = size / KB_VALUE;
        double mb = size / MB_VALUE;
        double gb = size / GB_VALUE;
        DecimalFormat kbdec = new DecimalFormat(DECIMAL_FORMAT_KB);
        DecimalFormat dec = new DecimalFormat(DECIMAL_FORMAT);
        if (gb > 1) {
            fileSize = dec.format(gb).concat(SIZE_GB);
        } else if (mb > 1) {
            fileSize = dec.format(mb).concat(SIZE_MB);
        } else if (kb > 1) {
            fileSize = kbdec.format(kb).concat(SIZE_KB);
        } else {
            fileSize = dec.format(size).concat(SIZE_B);
        }
        return fileSize;
    }

    /**
     * This fetches the attachments list from the json as DownloadAttachmnet objects
     * 
     * @return the attachments
     */
    @SuppressWarnings("unused")
    public List<DownloadAttachment> getAttachments() {
        return attachments;
    }

}
