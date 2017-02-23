use(["/apps/medtronic-com/components/common/data-layer-position-id.js"], function(positionId) {
  var SUBTEMPLATE_REGEX = /(subtemplate)(\d+)-(slot)(\d+)\/par-\w+/i;

  var size;

  if (this.name.indexOf("biggie") > -1) {
    size = "biggie-two-by-two";
  } else if (this.name.indexOf("mini") > -1) {
    size = "mini-one-by-one";
  } else if (this.name.indexOf("slender") > -1) {
    size = "slender-one-by-two";
  } else if (this.name.indexOf("squat") > -1) {
    size = "squat-two-by-one";
  } else {
    size = "variable-flex-height";
  }
  var position = "";

  // sequence-1
  position = position + "sequence-" + this.sequence;
  // sequence-1|l1
  position = position + "|" + this.type;

  if (SUBTEMPLATE_REGEX.test(this.name)) {
    // sequence-1|l1-subtemplate-1|slot-1|biggie
    position = position + "-" + this.name.replace(SUBTEMPLATE_REGEX, "$1-$2|$3-$4");
  } else {
    position = position + "-subtemplate-1|slot-1";
  }

  // sequence-1|l1-subtemplate-1|slot-1|biggie-two-by-two
  position = position + "|" + size;

  request.setAttribute(positionId.ATTR_POSITION_ID, position);
  
  return {
    position: position
  };
});