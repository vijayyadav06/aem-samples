Medtronic.Authoring.VideoMini = (function() {
    return {
        youtubeIcon: {
            selectionChanged: function(field, value, isChecked) {
                var panel = field.findParentByType("panel");
                var duration = panel.find("name", "./duration")[0];
                var transcript = panel.find("name", "./transcriptCbox")[0];
                var link = panel.find("name", "./transcriptLink")[0];
                var url = panel.find("name", "./transcriptURL")[0];
                var newTab = panel.find("name", "./transcriptNewTab")[0];
                if (isChecked) {
                    duration.disable();
                    transcript.disable();
                    link.disable();
                    url.disable();
                    newTab.disable();
                } else {
                    duration.enable();
                    transcript.enable();
                    var transcriptCheck = transcript.getValue()[0];
                    if (!(transcriptCheck == '' || transcriptCheck == undefined)) {
                      link.enable();
                      url.enable();
                      newTab.enable();
                    }
                }
            }
        },
        videoURL: {
            ERROR_MESSAGE: 'Please select a supported video format (.m3u8, .webm, .mp4, .ogg, .flv)',
            validateVideoURL: function(field) {
                var eManualURL = Medtronic.Authoring.validateEManualUrl(field);
                if (eManualURL == true) {
                    var fieldValue = field.getValue() || "";
                    if (fieldValue != "") {
                        var videoURLRegex = ".*?(?:www.youtube.com/watch.*?v=|youtu.be/|www.youtube.com/embed/)";
                        // a regex for verifying if the type of video is valid
                        var typeRegex = "(\\.m3u8|\\.webm|\\.mp4|\\.ogg|\\.flv)$";
                        var result = fieldValue.match(videoURLRegex);
                        var typeResult;
                        var isFlowplayer = (result == null);
                        if (isFlowplayer) {
                            typeResult = (fieldValue.toLowerCase()).match(typeRegex) ? (fieldValue.toLowerCase()).match(typeRegex)[0] : null;
                            if (typeResult == null) { return this.ERROR_MESSAGE; }
                        }else {
                            var videoId;
                            if(fieldValue.indexOf('v=') == -1){
                                videoId = fieldValue.split("\/").pop().split('?')[0];   
                            }else{
                                videoId = fieldValue.split("?").pop().split("&").shift();
                            }

                            if(videoId.indexOf("\.") != -1){
                                typeResult = (videoId.toLowerCase()).match(typeRegex) ? (videoId.toLowerCase()).match(typeRegex)[0] : null;
                                if (typeResult == null) { return this.ERROR_MESSAGE; }
                            }
                        }
                    }
                    return true;
                } else {
                    return eManualURL;
                }
            }
        },
        checkBox: {
            selectionChanged: function(field, value, isChecked, cboxName) {
                var panel = field.findParentByType("panel");
                var link = panel.find("name", "./" + cboxName + "Link")[0];
                var url = panel.find("name", "./" + cboxName + "URL")[0];
                var newTab = panel.find("name", "./" + cboxName + "NewTab")[0];
                if (isChecked) {
                    link.enable();
                    url.enable();
                    newTab.enable();
                } else {
                    link.disable();
                    url.disable();
                    newTab.disable();
                }
            },
            loadContent: function(field, cboxName) {
                var panel = field.findParentByType("panel").findParentByType("panel");
                var link = panel.find("name", "./" + cboxName + "Link")[0];
                var url = panel.find("name", "./" + cboxName + "URL")[0];
                var newTab = panel.find("name", "./" + cboxName + "NewTab")[0];
                var checked = field.getValue()[0];
                var youtubeIcon = panel.find("name", "./youtubeIcon")[0];
                if (checked == '' || checked == undefined || (field.name == './transcriptCbox' && youtubeIcon.getValue()[0] == 'true')) {
                    link.disable();
                    url.disable();
                    newTab.disable();
                }
            }
        }
    };
})();