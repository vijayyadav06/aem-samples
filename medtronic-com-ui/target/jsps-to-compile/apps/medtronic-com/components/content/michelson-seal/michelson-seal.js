use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(LinkHelper) {

  return {
    "michelsonURL": LinkHelper.fixLink(inheritedPageProperties.get("michelsonURL"))
  };
});