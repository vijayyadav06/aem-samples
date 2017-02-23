use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(LinkHelper) {

  return {
    "showLabel": properties.get("showLabel", false),
    "labelHyperlink": LinkHelper.fixLink(properties.get("labelHyperlink")),
    "labelNewTab": properties.get("labelNewTab", false),
    "image": properties.get("image", ""),
    "imageAltText": properties.get("alttext", "")
  };
});