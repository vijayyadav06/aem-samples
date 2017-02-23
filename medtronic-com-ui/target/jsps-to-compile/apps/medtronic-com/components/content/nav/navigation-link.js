use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(LinkHelper) {

  return {
    navigationUrl: LinkHelper.fixLink(properties.get("navigationUrl"))
  }
});