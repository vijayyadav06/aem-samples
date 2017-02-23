/**
 * 
 */

package com.medtronic.com.app;

/**
 * This is a HeadlineObject Entity Java file that should be used for HeadlineWithISI.
 * 
 * @author sunny.sima
 */
public class HeadlineObject {

    private String headingText;
    private String fontColor;
    private String fontWeight;

    /**
     * Initialize the fields.
     * 
     * @param headingText - heading text
     * @param fontColor - font color
     * @param fontWeight - font weight
     */
    public HeadlineObject(final String headingText, final String fontColor, final String fontWeight) {
        super();
        this.headingText = headingText;
        this.fontColor = fontColor;
        this.fontWeight = fontWeight;
    }

    /**
     * Returns the heading text.
     * 
     * @return the headingText
     */
    public String getHeadingText() {
        return headingText;
    }

    /**
     * Sets the heading text.
     * 
     * @param headingText
     *            the headingText to set
     */
    public void setHeadingText(final String headingText) {
        this.headingText = headingText;
    }

    /**
     * Returns the font color.
     * 
     * @return the fontColor
     */
    public String getFontColor() {
        return fontColor;
    }

    /**
     * Sets the font color.
     * 
     * @param fontColor
     *            the fontColor to set
     */
    public void setFontColor(final String fontColor) {
        this.fontColor = fontColor;
    }

    /**
     * Returns the font weight.
     * 
     * @return the fontWeight
     */
    public String getFontWeight() {
        return fontWeight;
    }

    /**
     * Sets the font weight.
     * 
     * @param fontWeight
     *            the fontWeight to set
     */
    public void setFontWeight(final String fontWeight) {
        this.fontWeight = fontWeight;
    }

}
