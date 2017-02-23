use([], function() {
  /*
   * We store a sequence number in a request attribute, to keep a running total
   * for the loading page.
   */
  var ATTR_SUBTEMPLATE_SEQUENCE = "medtronic-com.subtemplate-sequence";

  // Get the sequence from the defined request attribute.
  var sequence = request.getAttribute(ATTR_SUBTEMPLATE_SEQUENCE);

  if (!sequence) {
    // If it doesn't exist, set it to zero to prepare for incrementing.
    sequence = 0;
  }

  sequence++;

  // Store it back to the request attriubte for the next call.
  request.setAttribute(ATTR_SUBTEMPLATE_SEQUENCE, sequence);

  return sequence;
});