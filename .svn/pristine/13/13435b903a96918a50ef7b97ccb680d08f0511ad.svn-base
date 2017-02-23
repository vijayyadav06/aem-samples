package com.medtronic.com.app;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by strelr1 on 3/2/2016.
 */
public class PressReleaseObject {

    private Date date;
    private String title;
    private String href;
    private String categories;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getDisplayDate() {
        SimpleDateFormat format = new SimpleDateFormat("MMMM dd, yyyy");
        if (date != null) {
            return format.format(date);
        } else {
            return null;
        }
    }
}
