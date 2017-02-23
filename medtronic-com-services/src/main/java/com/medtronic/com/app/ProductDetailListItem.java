
package com.medtronic.com.app;

/**
 * @author sunny.sima
 */
public class ProductDetailListItem {

    private String item;
    private String link;
    private String newTab;

    public ProductDetailListItem(String item) {
        this.item = item;
    }

    public ProductDetailListItem(String item, String link, String newTab) {
        this.item = item;
        this.link = link;
        this.newTab = newTab;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getNewTab() {
        return newTab;
    }

    public void setNewTab(String newTab) {
        this.newTab = newTab;
    }

}
