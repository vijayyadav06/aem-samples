
package com.medtronic.com.app;

import java.util.List;
import java.util.Map;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.medtronic.com.util.LinkUtil;
import com.adobe.acs.commons.widgets.MultiFieldPanelFunctions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * @author sunny.sima
 * @lastModified 11/20/2015
 * @lastModifiedBy ryan.mccullough
 *
 * Product Detail Class for use with the ProductDetail AEM Component
 * /apps/medtronic-com/components/content/product-detail
 */
public class ProductDetail extends WCMUse {

	private static final Logger log = LoggerFactory.getLogger(ProductDetail.class);
	/*
		Dialog Properties
	 */
	public static final String IMAGE_PROPERTY = "image";
	public static final String IMAGE_PATH_PROPERTY = "path";
	public static final String IMAGE_ALTTEXT_PROPERTY = "altText";
	public static final String ISWURL_PROPERTY = "iswURL";
    public static final String PRODUCT_NAME_PROPERTY = "productName";
    public static final String PRODUCT_SUBTITLE_PROPERTY = "productSubTitle";
    public static final String MODEL_SKU_PROPERTY = "modelSku";
    public static final String NUMBER_PROPERTY = "number";
    public static final String ISW_GRAPHIC_PROPERTY = "iswGraphic";
    public static final String ISW_TEXT_PROPERTY = "iswText";
    public static final String NEWTAB_PROPERTY = "newtab";
    public static final String TITLE_PROPERTY = "title";
    public static final String OVERVIEW_TEXT_PROPERTY = "overviewText";


	/*
        Product Detail Page Constants
	 */
    private static final String AUDIENCE_TYPE_PROPERTY = "pageAudience";

    private List<Map <String,  String>> image = null;

	@Override
	public void activate() throws Exception {
		image = MultiFieldPanelFunctions.getMultiFieldPanelValues(getResource(), IMAGE_PROPERTY);
	}


    /*  Component Getters */
	
	public List<Map <String,  String>>  getImages() {		
		return image;
	}

	public String getIswURL() {
		String url = getProperties().get(ISWURL_PROPERTY, String.class);
		if (StringUtils.isNotEmpty(url)) {
            url = LinkUtil.getPathfieldURL(url);
		}
		return url;
	}

	public String getAudienceType(){
		String audienceLabel = "";
		String audienceTypeKey = getPageProperties().get(AUDIENCE_TYPE_PROPERTY,String.class);

        //The getInheritedProperties() method is broken.  This is a work-around for now.
        InheritanceValueMap inheritanceValueMap = new HierarchyNodeInheritanceValueMap(getCurrentPage().getContentResource());
        if(StringUtils.isNotEmpty(audienceTypeKey)){
            audienceLabel = inheritanceValueMap.getInherited(audienceTypeKey,"");//default to empty string instead of null.
		}
		return audienceLabel;
	}

	public String getProductName(){
		String productName = getProperties().get(PRODUCT_NAME_PROPERTY,String.class);
		return productName;
	}

	public String getProductSubTitle(){
		String productSubTitle = getProperties().get(PRODUCT_SUBTITLE_PROPERTY,String.class);
		return productSubTitle;
	}	   

	public String getModelSku(){
		String modelSku = getProperties().get(MODEL_SKU_PROPERTY,String.class);
		return modelSku;
	}

	public String getNumber(){
		String number = getProperties().get(NUMBER_PROPERTY,String.class);
		return number;
	}

	public String getIswGraphic(){
		String iswGraphic = getProperties().get(ISW_GRAPHIC_PROPERTY,String.class);
		return iswGraphic;
	}

	public String getIswText(){
		String iswText = getProperties().get(ISW_TEXT_PROPERTY,String.class);
		return iswText;
	}

	public String getNewtab(){
		String newtab = getProperties().get(NEWTAB_PROPERTY,String.class);
		return newtab;
	}

	public String getTitle(){
		String title1 = getProperties().get(TITLE_PROPERTY,String.class);
		return title1;
	}

	public String getOverviewText(){
		String overviewText = getProperties().get(OVERVIEW_TEXT_PROPERTY,String.class);
		return overviewText;
	}

}
