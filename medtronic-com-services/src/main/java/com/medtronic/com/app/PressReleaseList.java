package com.medtronic.com.app;

import com.adobe.cq.sightly.WCMUse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PressReleaseList extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(PressReleaseList.class);
    private String pressReleaseLocation;
    private Integer displayNumber;
    private List<PressReleaseObject> pressReleaseObjects = new ArrayList<>();

    @Override
    public void activate() throws Exception {
        pressReleaseLocation = getProperties().get("location", new String("Not Configured"));
        displayNumber = getProperties().get("number", new Integer(4));
        populatePressReleaseObjects();
    }

    public Integer getDispayNumber() {
        return displayNumber;
    }

    public String getPressReleaseLocation() {
        return pressReleaseLocation;
    }

    public List<PressReleaseObject> getPressReleaseObjects() {
        return pressReleaseObjects;
    }

    /**
     * This populates the configured number of most recent press releases from the configured content location
     */
    private void populatePressReleaseObjects() {
        String xpathQuery = "/jcr:root" + pressReleaseLocation + "//element(*, cq:PageContent)[@ReleaseID] order by Date descending";
        try {
            Session session = getResourceResolver().adaptTo(Session.class);
            QueryManager queryManager = session.getWorkspace().getQueryManager();
            Query query = queryManager.createQuery(xpathQuery, Query.XPATH);
            query.setLimit(displayNumber);
            QueryResult result = query.execute();
            NodeIterator resultNodes = result.getNodes();
            LOG.info("RELEASES FOUND: " + resultNodes.getSize());

            while (resultNodes.hasNext()) {
                Node node = resultNodes.nextNode();
                String title = node.getProperty("jcr:title").getString();
                Date date = node.getProperty("Date").getDate().getTime();
                String path = node.getParent().getPath() + ".html";

                PressReleaseObject pressRelease = new PressReleaseObject();
                pressRelease.setTitle(title);
                pressRelease.setDate(date);
                pressRelease.setHref(path);
                pressReleaseObjects.add(pressRelease);
            }
        } catch (RepositoryException e) {
            LOG.error("Error searching repository for recent press releases", e);
            LOG.error("Problem occurred with query: " + xpathQuery);
        }
    }
}
