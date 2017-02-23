use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(LinkHelper) {

  return {
    "logoUrl": LinkHelper.fixLink(inheritedPageProperties.get("globalHeader_logoUrl"))
  };
});