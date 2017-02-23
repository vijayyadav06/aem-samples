
package com.medtronic.com.app;

/**
 * @author laura.lao
 */
public class ContactsObject {

    private String name;
    private String title;
    private String phone;
    private String email;

    public ContactsObject() {

    }

    public ContactsObject(String name, String title, String phone, String email) {
        this.name = name;
        this.title = title;
        this.phone = phone;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
