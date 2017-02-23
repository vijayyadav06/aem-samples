/**
 * Custom Validation function for Path Fields to validate eManual URLs (within
 * Granite). This will check to ensure the correct URL for eManuals. See
 * granite-validation.css for corresponding css fixes for the warning sign.
 */
(function($, Granite) {
  "use strict";
  var ERROR_MESSAGES = {
    ERROR_MESSAGE_BUSINESS_UNITS_PARENT_TAG: "You must remove Corporate-Business Units tags that have no sub-tag.",
    ERROR_MESSAGE_PARENT_TAGS: "You must remove any selected tag set names and follow the tag set arrows to the most specific term.",
    ERROR_MESSAGE_THERAPIES: "You must select a Therapies tag.",
    ERROR_MESSAGE_CONDITIONS: "You must select a Conditions tag.",
    ERROR_MESSAGE_PRODUCTS: "You must select a Products tag.",
    ERROR_MESSAGE_AUDIENCE: "You must select a Audience tag.",
    ERROR_MESSAGE_BUSINESS_UNITS: "You must select a Corporate-Business Units tag with no sub-tag."
  };

  var SPECIFIC_ERROR_MESSAGES = {
    ERROR_MESSAGE_CONDITIONS_BUSINESS_UNITS: "You must select Conditions and Corporate-Business Unit tags.",
    ERROR_MESSAGE_PRODUCTS_BUSINESS_UNITS: "You must select Products, Audience and Corporate-Business Unit tags.",
    ERROR_MESSAGE_THERAPIES_BUSINESS_UNITS: "You must select Therapies and Corporate-Business Unit tags.",
    ERROR_MESSAGE_TESTIMONIAL_BUSINESS_UNITS: "You must select Audience and Corporate-Business Unit tags.",
  };

  var TEMPLATE_TAGS = {
    THERAPY_TEMPLATE: "therapy-detail-page",
    CONDITION_DETAIL_TEMPLATE: "condition-detail-page",
    PRODUCT_DETAIL_TEMPLATE: "product-detail-page",
    TESTIMONIAL_TEMPLATE: "testimonial",
    PRESS_RELEASE_TEMPLATE: "press-release",
    BIOGRAPHY_TEMPLATE: "biographies",
    TWO_COLUMN_GENERAL_DETAIL: "two-column-general-detail",
    ONE_COLUMN_GENERAL_DETAIL: "one-column-general-detail",
    THERAPY_TAG_NAME: "medtronic-wide:therapies",
    CONDITIONS_TAG_NAME: "medtronic-wide:conditions",
    PRODUCTS_TAG_NAME: "medtronic-wide:products",
    AUDIENCE_TAG_NAME: "medtronic-wide:audience",
    EMPTY_TAG: null,
    CORPORATE_BUSINESS_UNITS_TAG_NAME: "medtronic-wide:corporate-business"
  };

  var TAGS = {
    TAGS_SELECTOR: "ul[data-fieldname='./cq:tags']",
    HIDDEN_TAGS_FIELD_SELECTOR: "input[name='./tagsHidden']",
    IS_INVALID: "is-invalid",
    ARIA_INVALID: "aria-invalid",
    LI_SELECTOR: "li",
    CLICK: "click",
    SELECTED_TAGS_LIST_CLASS_NAME: ".js-TagsPickerField-tagList",
    CLASS: "class",
    PIPE_OPERATOR: "||",
    DATA_ID: "data-id",
    DATA_VALUE: "data-value",
    HAS_CHILDREN: "hasChildren",
    SLASH_OPERATOR: "/",
    IS_SELECTED: ".is-selected",
    IS_ACTIVE: ".is-active",
    ANCHOR_TAG: "a",
    INPUT_TAG: "input",
    CREATE_TEMPLATE_FIELD: "input[type='hidden'][name='template']",
    EDIT_TEMPLATE_FIELD: "input[type='hidden'][name='cq:template']",
    CREATE_BUTTON_CLASSNAME: "coral-Wizard-nextButton",
    SPAN_SELECTOR: "span",
    DATA_QUICKTIP_ATTRIBUTE: "data-quicktip-type",
    INFO_ATTRIBUTE_VALUE: "info",
    IS_INVALID_CLASSNAME: "is-invalid",
    CUSTOM_ERROR_CLASSNAME: "customErrorInfoText",
    CLASS_ATTRIBUTE: "class",
    DIV_SELECTOR: "div",
    HELPER_TEXT_CLASSNAME: ".coral-Icon--infoCircle",
    TAGS_PICKER_CLASSNAME_SELECTOR: "div[class='coral-ColumnView coral-ColumnView--multiselect']",
    IS_ACTIVE_CLASSNAME: "is-active"
  };

  var errorMessage;
  var tagsMandatory; //set to true if tags are mandatory for template
  var templateErrorMessage;
  var templateErrorMessage1;
  var specificErrorMessage;
  var template_name;
  var template_tag; //1st required tag set at template level
  var template_tag1; //2nd required tag set at template level
  var templateTagIndex; //count of required tag set
  var templateTagIndex1; //count of required tag set
  var childCorporateBusinessUnitIndex;
  var corporateBusinessUnitIndex;
  var deleteTags = false;
  var tagSetNameIndex; //occurrence of any selected tag set names

  $.validator.register({
    selector: "[data-validation~='Medtronic.Granite.Validation.ValidateTags'] span input",
    validate: function(el) {
      initialize();
      var error;
      if (tagsMandatory) {
        corporateBusinessUnitIndex = checkTags(corporateBusinessUnitIndex); //to validate the tags selected in the tag picker
        corporateBusinessUnitIndex = checkSelectedTags(corporateBusinessUnitIndex); //to validate the selected tags and during delete
        error = checkIndexAndReturnErrorMessage();
      }
      var info_span = $(el).closest(TAGS.DIV_SELECTOR).find(TAGS.SPAN_SELECTOR).attr(TAGS.DATA_QUICKTIP_ATTRIBUTE, TAGS.INFO_ATTRIBUTE_VALUE).filter(
      TAGS.HELPER_TEXT_CLASSNAME);
      if (null != error && error.length > 0) {
        $(el).addClass(TAGS.IS_INVALID);
        $(info_span).addClass(TAGS.CUSTOM_ERROR_CLASSNAME);
        return error;
      } else {
        $(el).removeClass(TAGS.IS_INVALID);
        $(info_span).removeClass(TAGS.CUSTOM_ERROR_CLASSNAME);
        $(el).removeAttr(TAGS.ARIA_INVALID);
        return;
      }
    }
  });

  function checkIndexAndReturnErrorMessage() {
    if (deleteTags == true && $(TAGS.TAGS_SELECTOR).find(TAGS.LI_SELECTOR).length < 1) {
      return specificErrorMessage;
    } else if (corporateBusinessUnitIndex > 0) {
      return errorMessage;
    } else if (null != template_tag1 && templateTagIndex1 < 1) {
      return templateErrorMessage1;
    } else if (null != template_tag && templateTagIndex < 1) {
      return templateErrorMessage;
    } else if (childCorporateBusinessUnitIndex < 1) {
      return ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS;
    } else if (tagSetNameIndex > 0) {
      return ERROR_MESSAGES.ERROR_MESSAGE_PARENT_TAGS;
    } else {
      return "";
    }
  }

  $(document).on(TAGS.CLICK, TAGS.SELECTED_TAGS_LIST_CLASS_NAME, function(event, item) {
    var $validate_field = $('span[data-validation="Medtronic.Granite.Validation.ValidateTags"] > span > input');
    initialize();
    deleteTags = true;
    $($validate_field).checkValidity();
    deleteTags = false;
    $($validate_field).updateErrorUI();
  });

  // to iterate through the selected tags list and validate
  function checkSelectedTags(corporateBusinessUnitIndex) {
    if ($(TAGS.TAGS_SELECTOR).find(TAGS.LI_SELECTOR).length > 0) {
      $(TAGS.TAGS_SELECTOR).find(TAGS.LI_SELECTOR).each(function() {
        var selected_tag_id = $(this).find(TAGS.INPUT_TAG).val();
        var tag_class_name = $("a[data-id='" + selected_tag_id + "']").prop(TAGS.CLASS);
        var hiddenTags = $(TAGS.HIDDEN_TAGS_FIELD_SELECTOR).text().split(TAGS.PIPE_OPERATOR);
        if (selected_tag_id.indexOf(TEMPLATE_TAGS.CORPORATE_BUSINESS_UNITS_TAG_NAME) > -1) {
          if ($(TAGS.HIDDEN_TAGS_FIELD_SELECTOR).text().indexOf(selected_tag_id) > -1) {
            corporateBusinessUnitIndex++;
            errorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS_PARENT_TAG;
          } else {
            childCorporateBusinessUnitIndex++;
          }
        } else if (null != template_tag && selected_tag_id.indexOf(template_tag) > -1) {
          templateTagIndex++;
        } else if (null != template_tag1 && selected_tag_id.indexOf(template_tag1) > -1) {
          templateTagIndex1++;
        }
        if (selected_tag_id.lastIndexOf('/') < 2) {
          tagSetNameIndex++;
        }
        removeActiveTags(); // removing the is-active class to avoid conflicts with selected tags
      });
    }
    return corporateBusinessUnitIndex;
  }

  function removeActiveTags() {
    var active_tags_onDelete = $(TAGS.TAGS_PICKER_CLASSNAME_SELECTOR).children().filter(
            TAGS.IS_ACTIVE).find(TAGS.ANCHOR_TAG).filter(TAGS.IS_ACTIVE);
    if (deleteTags && active_tags_onDelete.length > 0) {
      $(active_tags_onDelete).each(function() {
        $(this).removeClass(TAGS.IS_ACTIVE_CLASSNAME);
      });
    }
  }

  function checkTags(corporateBusinessUnitIndex) {
    var active_tags = $(TAGS.TAGS_PICKER_CLASSNAME_SELECTOR).children()
            .filter(TAGS.IS_ACTIVE).find(TAGS.ANCHOR_TAG).filter(TAGS.IS_ACTIVE);
    var selected_tags = $(TAGS.TAGS_PICKER_CLASSNAME_SELECTOR).children().filter(
            TAGS.IS_ACTIVE).find(TAGS.ANCHOR_TAG).filter(TAGS.IS_SELECTED);
    // to iterate through the selected tags in the tags picker that have the class name is-selected and validate
    if (!deleteTags && selected_tags.length > 0) {
      $(selected_tags).each(
              function() {
                var selected_tag_id = $(this);
                var tag_class_name = $(this).prop(TAGS.CLASS);
                var tag_name = $(this).attr(TAGS.DATA_ID);
                if (!deleteTags && tag_name.indexOf(TEMPLATE_TAGS.CORPORATE_BUSINESS_UNITS_TAG_NAME) > -1) {
                  if (tag_class_name.indexOf(TAGS.HAS_CHILDREN) > -1) {
                    corporateBusinessUnitIndex++;
                    errorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS_PARENT_TAG;
                    $(TAGS.HIDDEN_TAGS_FIELD_SELECTOR).append(tag_name + TAGS.PIPE_OPERATOR);
                  } else if (!deleteTags) {
                    childCorporateBusinessUnitIndex++;
                  }
                } else if (!deleteTags) {
                  if (null != template_tag && tag_name.indexOf(template_tag) > -1) {
                    templateTagIndex++;
                  } else if (null != template_tag1 && tag_name.indexOf(template_tag1) > -1) {
                    templateTagIndex1++;
                  }
                }
                if (!deleteTags
                        && (selected_tag_id.attr(TAGS.DATA_VALUE).split(TAGS.SLASH_OPERATOR).length < 5 && $(this)
                                .attr(TAGS.DATA_VALUE).split(TAGS.SLASH_OPERATOR).length > 2)) {
                  tagSetNameIndex++;
                }
              });
    } else if (!deleteTags && active_tags.length > 0) {  // to iterate through the selected tags in the tags picker that have the class name is-active and validate
      $(active_tags).each(
              function() {
                var active_tag_id = $(this);
                var tag_class_name = $(this).prop(TAGS.CLASS);
                var tag_name = $(this).attr(TAGS.DATA_ID);
                if (!deleteTags && tag_name.indexOf(TEMPLATE_TAGS.CORPORATE_BUSINESS_UNITS_TAG_NAME) > -1) {
                  if (tag_class_name.indexOf(TAGS.HAS_CHILDREN) > -1) {
                    corporateBusinessUnitIndex++;
                    errorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS_PARENT_TAG;
                    $(TAGS.HIDDEN_TAGS_FIELD_SELECTOR).append(tag_name + TAGS.PIPE_OPERATOR);
                  } else if (!deleteTags) {
                    childCorporateBusinessUnitIndex++;
                  }
                } else if (!deleteTags) {
                  if (null != template_tag && tag_name.indexOf(template_tag) > -1) {
                    templateTagIndex++;
                  } else if (null != template_tag1 && tag_name.indexOf(template_tag1) > -1) {
                    templateTagIndex1++;
                  }
                }
                if (!deleteTags
                        && (active_tag_id.attr(TAGS.DATA_VALUE).split(TAGS.SLASH_OPERATOR).length < 6 && $(this).attr(
                                TAGS.DATA_VALUE).split(TAGS.SLASH_OPERATOR).length > 2)) {
                  tagSetNameIndex++;
                }
              });
    } else if (!$(TAGS.TAGS_SELECTOR).find(TAGS.LI_SELECTOR).length > 0) {  // to check if there aren't any selected tags
      corporateBusinessUnitIndex = 1;
      errorMessage = specificErrorMessage;
    }
    return corporateBusinessUnitIndex;
  }

  function initialize() {
    template_tag1 = null;
    tagsMandatory = true;
    template_name = readTemplateName();
    template_tag = checkTemplateTag();
    templateTagIndex = 0;
    templateTagIndex1 = 0;
    childCorporateBusinessUnitIndex = 0;
    corporateBusinessUnitIndex = 0;
    tagSetNameIndex = 0;
  }

  function readTemplateName() {
    var template_name;
    var createFlowTemplate = $(TAGS.CREATE_TEMPLATE_FIELD).val().split(TAGS.SLASH_OPERATOR);
    var editFlowTemplate = $(TAGS.EDIT_TEMPLATE_FIELD).val().split(TAGS.SLASH_OPERATOR);
    if (editFlowTemplate.length > 1) {
      template_name = editFlowTemplate[editFlowTemplate.length - 1];
    } else {
      template_name = createFlowTemplate[createFlowTemplate.length - 1];
    }
    return template_name;
  }

  function checkTemplateTag() {
    switch (template_name) {
      case TEMPLATE_TAGS.THERAPY_TEMPLATE:
        template_tag = TEMPLATE_TAGS.THERAPY_TAG_NAME;
        templateErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_THERAPIES;
        specificErrorMessage = SPECIFIC_ERROR_MESSAGES.ERROR_MESSAGE_THERAPIES_BUSINESS_UNITS;
        break;
      case TEMPLATE_TAGS.PRODUCT_DETAIL_TEMPLATE:
        template_tag = TEMPLATE_TAGS.PRODUCTS_TAG_NAME;
        template_tag1 = TEMPLATE_TAGS.AUDIENCE_TAG_NAME;
        templateErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_PRODUCTS;
        templateErrorMessage1 = ERROR_MESSAGES.ERROR_MESSAGE_AUDIENCE;
        specificErrorMessage = SPECIFIC_ERROR_MESSAGES.ERROR_MESSAGE_PRODUCTS_BUSINESS_UNITS
        break;
      case TEMPLATE_TAGS.CONDITION_DETAIL_TEMPLATE:
        template_tag = TEMPLATE_TAGS.CONDITIONS_TAG_NAME;
        templateErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_CONDITIONS;
        specificErrorMessage = SPECIFIC_ERROR_MESSAGES.ERROR_MESSAGE_CONDITIONS_BUSINESS_UNITS
        break;
      case TEMPLATE_TAGS.TESTIMONIAL_TEMPLATE:
        template_tag = TEMPLATE_TAGS.AUDIENCE_TAG_NAME;
        templateErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_AUDIENCE;
        specificErrorMessage = SPECIFIC_ERROR_MESSAGES.ERROR_MESSAGE_TESTIMONIAL_BUSINESS_UNITS
        break;
      case TEMPLATE_TAGS.PRESS_RELEASE_TEMPLATE:
        template_tag = TEMPLATE_TAGS.EMPTY_TAG;
        specificErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS;
        break;
      case TEMPLATE_TAGS.BIOGRAPHY_TEMPLATE:
        template_tag = TEMPLATE_TAGS.EMPTY_TAG;
        specificErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS;
        break;
      case TEMPLATE_TAGS.ONE_COLUMN_GENERAL_DETAIL:
        template_tag = TEMPLATE_TAGS.EMPTY_TAG;
        specificErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS;
        break;
      case TEMPLATE_TAGS.TWO_COLUMN_GENERAL_DETAIL:
        template_tag = TEMPLATE_TAGS.EMPTY_TAG;
        specificErrorMessage = ERROR_MESSAGES.ERROR_MESSAGE_BUSINESS_UNITS;
        break;
      default:
        tagsMandatory = false;
        template_tag = TEMPLATE_TAGS.EMPTY_TAG;
    }
    return template_tag;
  }
})(Granite.$, Granite);