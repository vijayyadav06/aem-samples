this["Templates"] = this["Templates"] || {};

this["Templates"]["search-results__filter"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.filters : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <div class=\"accordion__item\">\n            <h3 class=\"accordion__label\">\n              <div class=\"checkbox\">\n                <input type=\"checkbox\" class=\"accordion__parent\" id=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\" aria-required=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isChecked : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n                <label for=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\">\n                  <a class=\"accordion__link\">\n                    <i class=\"icon shape-mdt-chevron--right\"></i>\n                    <span>"
    + escapeExpression(((helper = (helper = helpers.filterText || (depth0 != null ? depth0.filterText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterText","hash":{},"data":data}) : helper)))
    + "</span>\n                  </a>\n                </label>\n              </div>\n            </h3>\n            <div class=\"accordion__content\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.secondaryFilters : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n          </div>\n";
},"3":function(depth0,helpers,partials,data) {
  return "checked";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                <div class=\"pad\">\n                  <div class=\"checkbox\">\n                    <input type=\"checkbox\" class=\"accordion__child\" id=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\" aria-required=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isChecked : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n                    <label for=\""
    + escapeExpression(((helper = (helper = helpers.filterValue || (depth0 != null ? depth0.filterValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterValue","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.filterText || (depth0 != null ? depth0.filterText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filterText","hash":{},"data":data}) : helper)))
    + "</label>\n                  </div>\n                </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <div class=\"search-results__filter-container\">\n    <div class=\"top-filter\">\n      <h3 class=\"filter-toggle open\"><a>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.filterTitle : stack1), depth0))
    + "<span class=\"accordion__icon\"></span></a></h3>\n    </div>\n    <div class=\"accordion accordion-filter open\">\n      <div class=\"grouped-controls\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.filters : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"bottom-filter\">\n      <input type=\"hidden\" name=\"filters\" value=\"\">\n      <button type=\"submit\" class=\"btn search-button\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.applyButton : stack1), depth0))
    + "</button>\n      <a href=\"#\" class=\"clear-button\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.clearLink : stack1), depth0))
    + "</a>\n    </div>\n  </div>\n";
},"useData":true});

this["Templates"]["search-results__grid"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "    <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"grid-item ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isFeatured : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n            <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n            <div class=\"grid-item-content\">\n                <h2><small>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</small></h2>\n                <p>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n        </div>\n    </a>\n";
},"2":function(depth0,helpers,partials,data) {
  return "featured-article-grid";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"grid\">\n    <div class=\"grid-sizer\"></div>\n    <div class=\"grid-item featured-bar-grid\"><span>Key Results</span></div>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"useData":true});

this["Templates"]["search-results__list"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "        <div class=\"key-bar-list\"><span>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.keyMatchesText : stack1), depth0))
    + "</span></div>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.keyMatches : stack1), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <div class=\"key-article-list\">\n                <div class=\"list-item-content\">\n                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\"><p class=\"list-item-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</p></a>\n                    <span>"
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"article-list\">\n        <p class=\"g\">  \n            <font size=\"-2\" style=\"display: none;\">\n                <b>["
    + escapeExpression(((helper = (helper = helpers.fileType || (depth0 != null ? depth0.fileType : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileType","hash":{},"data":data}) : helper)))
    + "]</b>\n            </font>\n            <div class=\"list-item-content\">\n                <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\"><p class=\"list-item-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</p></a>\n                <span>"
    + escapeExpression(((helper = (helper = helpers.formattedUrl || (depth0 != null ? depth0.formattedUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formattedUrl","hash":{},"data":data}) : helper)))
    + "</span>\n                <p>\n                  "
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "\n                </p>\n            </div>\n        </p>\n    </div>            \n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "<div class=\"list\">    \n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.keyMatches : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.results : stack1)) != null ? stack1.gsaResult : stack1), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n<script type=\"text/javascript\" id=\"previewData\">\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.previewData : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</script>";
},"useData":true});

this["Templates"]["search-results__no-search-results"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"no-results\">\n  <div class=\"no-search-main\">\n    <h2>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.noSearchResultText1 : stack1), depth0))
    + " <strong>"
    + escapeExpression(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"query","hash":{},"data":data}) : helper)))
    + "</strong> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.noSearchResultText2 : stack1), depth0))
    + "</h2>\n    <form id=\"no-search-results-form\" action=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchResultsUrl : stack1), depth0))
    + "\" method=\"get\">\n      <div class=\"form-group display-table\">\n        <div class=\"search-field-div display-table-cell\">\n          <input type=\"search\" name=\"q\" class=\"search-field\" placeholder=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchPlaceholder : stack1), depth0))
    + "\" autocomplete=\"off\">\n          <input type=\"hidden\" name=\"p\"> <!-- update with current page -->\n          <input type=\"hidden\" name=\"l\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.language : stack1), depth0))
    + "\"> <!-- update with current language -->\n          <input type=\"hidden\" name=\"t\" value=\"list\">\n          <input type=\"hidden\" name=\"c\" value=\"us-en\">\n          <input type=\"hidden\" name=\"s\" value=\"us-en\">\n          <div class=\"search__dropdown hidden\">\n            <div class=\"search__dropdown-content\">\n              <div class=\"predictive\"></div>\n              <div class=\"suggestive\"></div>\n            </div>\n          </div>\n        </div>\n        <div class=\"search-button-div display-table-cell\">\n          <button type=\"submit\" class=\"search-button\">\n            <span class=\"bold\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchButtonText : stack1), depth0))
    + "</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"search__advanced-search pull-left\">\n        <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.advancedSearchLink : stack1), depth0))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.advancedSearchText : stack1), depth0))
    + "</a>\n      </div>\n    </form>\n  </div>\n  <div class=\"disclaimer col-xs-12 col-sm-12 col-lg-12\">\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.disclaimer : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </div>\n</div>";
},"useData":true});

this["Templates"]["search-results__pagination"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.isFirstPage : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.pageLinks : stack1), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.displayElipses : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.isLastPage : stack1), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\"1\" class=\"not-active\"><i class=\"icon shape-mdt-arrow--previous\"></i><i class=\"icon shape-mdt-arrow--previous\"></i></a></li>\n          <li><a data-page-number=\"1\" class=\"not-active\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.prevText : stack1), depth0))
    + "</a></li>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\"1\" class=\"\"><i class=\"icon shape-mdt-arrow--previous\"></i><i class=\"icon shape-mdt-arrow--previous\"></i></a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.prevPage : stack1), depth0))
    + "\" class=\"\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.prevText : stack1), depth0))
    + "</a></li>\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <li><a data-page-number=\""
    + escapeExpression(((helper = (helper = helpers.pageNumber || (depth0 != null ? depth0.pageNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pageNumber","hash":{},"data":data}) : helper)))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isActive : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(((helper = (helper = helpers.pageNumber || (depth0 != null ? depth0.pageNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pageNumber","hash":{},"data":data}) : helper)))
    + "</a></li>      \n";
},"7":function(depth0,helpers,partials,data) {
  return "active-page not-active";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li>...</li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.isLastPage : stack1), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.program(14, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"12":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <li><a class=\"active-page not-active\" data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <li><a class=\"\" data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"not-active\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.nextText : stack1), depth0))
    + "</a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"not-active\"><i class=\"icon shape-mdt-arrow--next\"></i><i class=\"icon shape-mdt-arrow--next\"></i></a></li>\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.nextPage : stack1), depth0))
    + "\" class=\"\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.nextText : stack1), depth0))
    + "</a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"\"><i class=\"icon shape-mdt-arrow--next\"></i><i class=\"icon shape-mdt-arrow--next\"></i></a></li>\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.isFirstPage : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(21, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.pageLinks : stack1), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.displayElipses : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.isLastPage : stack1), {"name":"if","hash":{},"fn":this.program(30, data),"inverse":this.program(32, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\"1\" class=\"\"><i class=\"icon shape-mdt-arrow--previous\"></i><i class=\"icon shape-mdt-arrow--previous\"></i></a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.prevPage : stack1), depth0))
    + "\" class=\"\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.prevText : stack1), depth0))
    + "</a></li>\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li>...</li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.isLastPage : stack1), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.program(28, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"26":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <li><a class=\"active-page not-active\" data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <li><a class=\"\" data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "</a></li>\n";
},"30":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"not-active\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.nextText : stack1), depth0))
    + "</a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"not-active\"><i class=\"icon shape-mdt-arrow--next\"></i><i class=\"icon shape-mdt-arrow--next\"></i></a></li>\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.nextPage : stack1), depth0))
    + "\" class=\"\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.nextText : stack1), depth0))
    + "</a></li>\n          <li><a data-page-number=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.totalPages : stack1), depth0))
    + "\" class=\"\"><i class=\"icon shape-mdt-arrow--next\"></i><i class=\"icon shape-mdt-arrow--next\"></i></a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul class=\"page-numbers desktop\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.desktopPagination : depth0)) != null ? stack1.displayPagination : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</ul>\n<ul class=\"page-numbers mobile\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.mobilePagination : depth0)) != null ? stack1.displayPagination : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});

this["Templates"]["search-results__search"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.showingText : stack1), depth0))
    + "\n      <label>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.query : stack1), depth0))
    + "</label>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "      <label class=\"search-instead\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchText : stack1), depth0))
    + " <a class=\"bold\">";
  stack1 = ((helper = (helper = helpers.firstElement || (depth0 != null ? depth0.firstElement : depth0)) != null ? helper : helperMissing),(options={"name":"firstElement","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.firstElement) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a></label>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.searchInsteadValue : stack1), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"row search-input\">\n  <div class=\"col-xs-12\">\n      <div class=\"form-group display-table vert-space\">\n        <div class=\"search-field-div display-table-cell\">\n          <input type=\"search\" name=\"q\" class=\"search-field\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.query : stack1), depth0))
    + "\" placeholder=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchPlaceholder : stack1), depth0))
    + "\" autocomplete=\"off\">\n          <input type=\"hidden\" name=\"p\"> <!-- update with current page -->\n          <input type=\"hidden\" name=\"l\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.language : stack1), depth0))
    + "\"> <!-- update with current language -->\n          <input type=\"hidden\" name=\"t\" value=\"list\">\n          <input type=\"hidden\" name=\"c\" value=\"us-en\">\n          <input type=\"hidden\" name=\"s\" value=\"us-en\">\n          <div class=\"search__dropdown hidden\">\n            <div class=\"search__dropdown-content\">\n              <div class=\"predictive\"></div>\n              <div class=\"suggestive\"></div>\n            </div>\n          </div>\n        </div>\n        <div class=\"search-button-div display-table-cell\">\n          <button type=\"submit\" class=\"search-button\">\n            <span class=\"bold\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.searchButtonText : stack1), depth0))
    + "</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"search__advanced-search\">\n        <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.advancedSearchLink : stack1), depth0))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.advancedSearchText : stack1), depth0))
    + "</a>\n      </div>\n  </div>\n</div>\n<div class=\"row top-border\">\n  <div class=\"col-xs-12 search-information\">\n    <div class=\"showing-results\">\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.query : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.searchInsteadValue : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n  </div>\n</div>";
},"useData":true});

this["Templates"]["search-results__total"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <small>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.results : stack1)) != null ? stack1.totalResults : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.staticText : depth0)) != null ? stack1.resultsText : stack1), depth0))
    + "</small>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h1 class=\"total-results\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.json : depth0)) != null ? stack1.results : stack1)) != null ? stack1.totalResults : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h1>";
},"useData":true});