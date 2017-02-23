package com.medtronic.com.app;

import com.adobe.cq.sightly.WCMUse;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import java.util.*;

public class PressReleaseArchive extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(PressReleaseArchive.class);
    private String pressReleaseLocation;
    private Integer numberYears;
    private List<String> archiveYears = new ArrayList<>();
    private String selectedYear;
    private List<PressReleaseObject> pressReleaseObjects = new ArrayList<>();
    private List<String> allReleaseCategories = new ArrayList<>();

    @Override
    public void activate() throws Exception {
        pressReleaseLocation = getProperties().get("location", new String("Not Configured"));
        numberYears = getProperties().get("numberYears", new Integer(4));
        populateArchiveYears();
        populateSelectedYear();
        populatePressReleaseObjects();
    }

    public Integer getNumberYears() {
        return numberYears;
    }

    public String getPressReleaseLocation() {
        return pressReleaseLocation;
    }

    public String getSelectedYear() {
        return selectedYear;
    }

    public List<PressReleaseObject> getPressReleaseObjects() {
        return pressReleaseObjects;
    }

    public List<String> getAllReleaseCategories() {
        return allReleaseCategories;
    }

    public List<String> getArchiveYears() {
        return archiveYears;
    }

    /**
     * This populates the archive years to be used
     */
    private void populateArchiveYears() {
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        String xpathQuery = "/jcr:root" + pressReleaseLocation + "/Y" + currentYear + "//element(*, cq:PageContent)[@ReleaseID]";
        try {
            Session session = getResourceResolver().adaptTo(Session.class);
            QueryManager queryManager = session.getWorkspace().getQueryManager();
            Query query = queryManager.createQuery(xpathQuery, Query.XPATH);
            QueryResult result = query.execute();
            NodeIterator resultNodes = result.getNodes();
            LOG.info("Press Releases found in current year " + currentYear + ": " + resultNodes.getSize());

            int yearIterator;
            if (resultNodes.getSize() > 0) {
                // set latest archive year to current year since current year has press releases
                yearIterator = currentYear;
            } else {
                // set latest archive year to last year since current year has no press releases yet
                yearIterator = currentYear - 1;
            }
            archiveYears.add(String.valueOf(yearIterator));
            for (int i = 1; i < numberYears; i++) {
                archiveYears.add(String.valueOf(yearIterator - 1));
                yearIterator--;
            }
        } catch (RepositoryException e) {
            LOG.error("Error searching repository for archived press releases in year: " + currentYear, e);
            LOG.error("Problem occurred with query: " + xpathQuery);
        }
    }

    /**
     * This populates the selected year based on user input...defaults to latest one in archive years
     */
    private void populateSelectedYear() {
        String year = getRequest().getParameter("year");
        if (year != null && archiveYears.contains(year)) {
            // use the year passed in
            selectedYear = year;
        } else if (archiveYears.size() > 0) {
            // use the first archive year
            selectedYear = archiveYears.get(0);
        } else {
            // default use current year (should never happen since archiveYears should be populated first)
            selectedYear = String.valueOf(Calendar.getInstance().get(Calendar.YEAR));
        }
    }

    /**
     * This populates press release objects and categories from the configured content location
     */
    private void populatePressReleaseObjects() {
        String xpathQuery = "/jcr:root" + pressReleaseLocation + "/Y" + selectedYear + "//element(*, cq:PageContent)[@ReleaseID] order by Date descending";
        try {
            Session session = getResourceResolver().adaptTo(Session.class);
            QueryManager queryManager = session.getWorkspace().getQueryManager();
            Query query = queryManager.createQuery(xpathQuery, Query.XPATH);
            QueryResult result = query.execute();
            NodeIterator resultNodes = result.getNodes();
            LOG.info("RELEASES FOUND: " + resultNodes.getSize());

            while (resultNodes.hasNext()) {
                Node node = resultNodes.nextNode();
                String title = node.getProperty("jcr:title").getString();
                Date date = node.getProperty("Date").getDate().getTime();
                String path = node.getParent().getPath() + ".html";
                List<String> categories = new ArrayList<>();
                Value[] releaseCategories = node.getProperty("Categories").getValues();
                for (Value category : releaseCategories) {
                    if (!allReleaseCategories.contains(category.getString())) {
                        allReleaseCategories.add(category.getString());
                    }
                    categories.add(category.getString());
                }

                PressReleaseObject pressRelease = new PressReleaseObject();
                pressRelease.setTitle(title);
                pressRelease.setDate(date);
                pressRelease.setHref(path);
                pressRelease.setCategories(StringUtils.join(categories, '|'));
                pressReleaseObjects.add(pressRelease);
            }

            Collections.sort(allReleaseCategories);
        } catch (RepositoryException e) {
            LOG.error("Error searching repository for archived press releases", e);
            LOG.error("Problem occurred with query: " + xpathQuery);
        }
    }
}
