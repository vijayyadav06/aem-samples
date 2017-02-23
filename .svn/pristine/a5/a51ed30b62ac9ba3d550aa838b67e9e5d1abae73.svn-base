
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * This is contacts component Java.
 * 
 * @author laura.lao
 */
public class Contacts extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(Contacts.class);
    private static final String PROP_NAME = "name";
    private static final String PROP_TITLE = "title";
    private static final String PROP_PHONE = "phone";
    private static final String PROP_EMAIL = "email";
    private String[] contacts = null;

    @Override
    public void activate() throws Exception {
        contacts = getProperties().get("contact", new String[] {});
    }

    /**
     * This function get contactsList.
     * 
     * @return contactsList
     */
    public List<ContactsObject> getContacts() {
        List<ContactsObject> contactsList = new ArrayList<ContactsObject>();
        for (int i = 0; i < contacts.length; i++) {
            ContactsObject contactsObject = getContactList(contacts[i]);
            contactsList.add(contactsObject);
        }
        return contactsList;
    }

    /**
     * Get a JOSNObject.
     * 
     * @param contact(String)
     * @return contactsObject(JOSNObject)
     */
    private ContactsObject getContactList(String contact) {
        ContactsObject contactsObject = null;
        try {
            JSONObject jsonObject = new JSONObject(contact);
            String name = jsonObject.getString(PROP_NAME);
            String title = jsonObject.getString(PROP_TITLE);
            String phone = jsonObject.getString(PROP_PHONE);
            String email = jsonObject.getString(PROP_EMAIL);
            contactsObject = new ContactsObject(name, title, phone, email);
        } catch (JSONException e) {
            LOG.error("Problem with Contacts", e);
        }
        return contactsObject;
    }
}
