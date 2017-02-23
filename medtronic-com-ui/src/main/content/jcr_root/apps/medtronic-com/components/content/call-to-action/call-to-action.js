use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(LinkHelper) {
  
  return {
    url: LinkHelper.fixLink(properties.get("ctaUrl", "")),
    text: properties.get("ctaLabel"),
    newTab: properties.get("newTab", false)
  }
});