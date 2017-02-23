use(["/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/LinkHelper.js"], function(JavaHelper, LinkHelper) {
  "use strict";
  var CONST = {
    HERO_FULL: "hero--full",
    FULL_IMAGE_SIZE: "col-sm-12 two-by-one",
    FULL_TEXT_SIZE: "col-xs-12",
    HALF_SIZE: "col-sm-6 one-by-one",
    REVERSE: "grid--reverse",
    
    BRAND_FRAME: "brand-frame",
    BRAND_PLUS: "brand-plus"
  };

  function getText(size) {
    var headings = properties.get("headings", JavaHelper.getEmptyArray(java.lang.String)).map(function(headline) {
      return JSON.parse(headline);
    });

    return {
      "type": "text",
      "size": size,
      "backgroundColor": properties.get("textBackgroundColor"),
      "headings": headings,
      "description": properties.get("textDescription"),
      "cta": {
        "showCta": properties.get("showCta"),
        "text": properties.get("ctaText"),
        "url": LinkHelper.fixLink(properties.get("ctaUrl")),
        "openInNewTab": properties.get("ctaOpenInNewTab")
      }
    };
  }

  function getImageOne(size, isReverse) {
    return {
      "type": "image",
      "size": size,
      "reverse": isReverse ? CONST.REVERSE : "",
      "imageUrl": properties.get("imageOneUrl"),
      "altText": properties.get("imageOneAltText")
    };
  }

  function getImageTwo(size) {
    return {
      "type": "image",
      "size": size,
      "imageUrl": properties.get("imageTwoUrl"),
      "altText": properties.get("imageTwoAltText")
    };
  }

  var heroType = properties.get("heroType");
  var frameType = properties.get("frameType");
  var frameColor = properties.get("frameColor");

  var heroCssClass;
  var items = [];
  var isPlaceholder;

  if (heroType == "single-image") {
    heroCssClass = CONST.HERO_FULL;
    var image = getImageOne(CONST.FULL_IMAGE_SIZE);

    items.push(image);
  } else if (heroType == "two-images") {
    var image1 = getImageOne(CONST.HALF_SIZE);
    var image2 = getImageTwo(CONST.HALF_SIZE);

    items.push(image1);
    items.push(image2);
  } else if (heroType == "text-only") {
    heroCssClass = CONST.HERO_FULL;
    var text = getText(CONST.FULL_TEXT_SIZE);

    items.push(text);
  } else if (heroType == "image-with-text") {
    var isReverse = (properties.get("textLocation") == "left" || frameType == CONST.BRAND_PLUS) && heroType != "two-images";
    var image = getImageOne(CONST.HALF_SIZE, isReverse);
    var text = getText(CONST.HALF_SIZE);

    items.push(image);
    items.push(text);
  } else {
    isPlaceholder = true;
    heroCssClass = CONST.HERO_FULL;
    var text = {
      "type": "text",
      "size": CONST.FULL_TEXT_SIZE,
      "backgroundColor": "bg-white",
      "headings": [{
        "text": "Sample",
        "textColor": "medtronic-blue",
        "textWeight": "normal-weight"
      }, {
        "text": "Hero",
        "textColor": "medtronic-blue",
        "textWeight": "normal-weight"
      }, {
        "text": "Heading",
        "textColor": "navy-blue",
        "textWeight": "bold"
      }],
      "description": "Sample description",
      "cta": {
        "showCta": false,
        "text": "",
        "url": "",
        "openInNewTab": false
      }
    };

    items.push(text);
  }

  return {
    "cssClass": heroCssClass, // hero--full or null

    "frame": {
      "type": frameType,
      "color": frameColor
    },

    "items": items,
    "isPlaceholder": isPlaceholder
  };
});