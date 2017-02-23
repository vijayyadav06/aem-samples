Medtronic.Authoring.VideoSlenderSquat = (function() {
    "use strict";
    return {
        multifield: {
            itemCount: 1,
            added: function(panel, index) {
                this.itemCount = this.itemCount + 1;
                var label = panel.findByType('label')[0];
                label.text = 'Video ' + this.itemCount;
            },
            removedItem: function(field) {
                if (this.itemCount == 1) { return false; }
                this.itemCount = this.itemCount - 1;
                var multiItems = field.items.items;
                multiItems.forEach(function(item, index) {
                    var label = item.findByType('label') ? item.findByType('label')[0] : null;
                    if (label != null) {
                        var labelId = label.id;
                        var labelHtml = $('#' + labelId);
                        labelHtml.text('Video ' + (index + 2));
                    }
                });
            }
        },
        youtubeIcon: {
            selectionChanged: function(field, value, isChecked) {
                var panel = field.findParentByType("panel");
                var duration = panel.find("name", "./duration")[0];
                var transcript = panel.find("name", "./showTranscript")[0];
                var text = panel.find("name", "./transcriptText")[0];
                var url = panel.find("name", "./transcriptURL")[0];
                var newTab = panel.find("name", "./transcriptNewTab")[0];
                if (isChecked) {
                    duration.disable();
                    transcript.disable();
                    text.disable();
                    url.disable();
                    newTab.disable();
                } else {
                    duration.enable();
                    transcript.enable();
                    var transcriptCheck = transcript.getValue()[0];
                    if (!(transcriptCheck == '' || transcriptCheck == undefined)) {
                        text.enable();
                        url.enable();
                        newTab.enable();
                    }
                }
            }
        },
        checkBox: {
            selectionChanged: function(field, value, isChecked, cboxName) {
                var panel = field.findParentByType("panel");
                var text = panel.find("key", cboxName + "Text")[0];
                var url = panel.find("key", cboxName + "URL")[0];
                var newTab = panel.find("key", cboxName + "NewTab")[0];
                if (isChecked) {
                    text.enable();
                    url.enable();
                    newTab.enable();
                } else {
                    text.disable();
                    url.disable();
                    newTab.disable();
                }
            },
            loadContent: function(field, cboxName) {
                var panel = field.findParentByType("panel").findParentByType("panel");
                var text = panel.find("name", "./" + cboxName + "Text")[0];
                var url = panel.find("name", "./" + cboxName + "URL")[0];
                var newTab = panel.find("name", "./" + cboxName + "NewTab")[0];
                var checked = field.getValue()[0];
                var youtubeIcon = panel.find("name", "./showYoutubeIcon")[0];
                if (checked == '' || checked == undefined || (field.name == './showTranscript' && youtubeIcon.getValue()[0] == 'true')) {
                    text.disable();
                    url.disable();
                    newTab.disable();
                }
            },
            afterRender: function(field) {
                var panel = field.findParentByType("panel");
                var text = panel.find("key", "transcriptText")[0];
                var url = panel.find("key", "transcriptURL")[0];
                var newTab = panel.find("key", "transcriptNewTab")[0];
                var checked = field.getValue()[0];
                var $parentDiv = $("#"+field.id).parent().parent();
                $parentDiv.prepend("<hr>");
            	if (checked == '' || checked == undefined) {
                    text.disable();
                    url.disable();
                    newTab.disable();
                }
            }
        }
    };
})();