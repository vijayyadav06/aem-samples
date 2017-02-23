/**
 * References/Footnotes component backing js
 */

use(["../../common/JavaHelper.js"], function(JavaHelper) {
  "use strict";
  var footnotes = ["*", "&dagger;", "&Dagger;", "&#xa7;", "||", "&#xb6;", "#"];

  var addPTagAtLast = function(content) {
    var subString = content.substring(content.length() - 5, content.length());
    if (subString.indexOf("\<\/p\>") == -1) {
      content = content + "\<p\>" + "\<\/p\>";
    }
    return content;
  };

  var getReferences = function(data) {

    return data.map(function(referenceText, index) {
      var jsonContent = JSON.parse(referenceText);   
      var reference = {
        sup: index + 1,
        content: addPTagAtLast(java.lang.String.valueOf(jsonContent.content))
      };
      return reference;
    });
  };

  var getFootnotes = function(data) {

    return data.map(function(footnoteText, index) {
      var jsonContent = JSON.parse(footnoteText);  
      var footnoteType = footnotes[index % footnotes.length];
      var footnoteCount = Math.floor(index / footnotes.length);
      var footnote = {
        sup: footnoteType,
        content: addPTagAtLast(java.lang.String.valueOf(jsonContent.content))
      };
      for (var i = 0; i < footnoteCount; i++) {
        footnote.sup = footnote.sup + footnoteType;
      }
      return footnote;
    });
  };

  var displayType = properties.get("displayType", "references");
  var data = properties.get("data", JavaHelper.getEmptyArray(java.lang.String));
  if ("references" == displayType) {
    return getReferences(data);
  } else if ("footnotes" == displayType) { return getFootnotes(data); }
});
