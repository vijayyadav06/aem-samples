var Medtronic = Medtronic || {};
Medtronic.Workflow = (function() {
    "use strict";

    var URLS = {
        GET_PROPERTIES: "/bin/medtronic/translationproperties",
        ADD_JOB: "/content/ctctranslation/queue/addnewjob.html",
        ADD_PAGE: "/content/ctctranslation/queue/addsidekickpage.html",
        NOTIFY_EMAILS: "/content/ctctranslation/ctcconfig/notifyemails.html"
    };

    var ELEMENTS = {
        WELL_CLASS: '.well-wrapper',
        FORM_NAME: 'formId',
        FORM_VALUE: 'translateProperties',
        TRANSLATE_TEXT: 'Translate content',
        DO_NOT_TRANSLATE_TEXT: 'Do not translate content',
        ROUTE: 'route',
        TRANSLATION_PROPERTIES: 'external-dialog-injection'
    };

    var PROPERTIES = {
        WORKITEM_PATH: 'workitem_path',
        JOB_NAME: 'jobName',
        JOB_DESCRIPTION: 'jobDescription',
        PAGE_TITLE: 'pageTitle',
        PAGE_PATH: 'pagePath',
        SOURCE_LANGUAGE: 'sourceLanguage',
        TARGET_LANGUAGE: 'targetLanguage'
    };

    var FIELD_IDENTIFIERS = {
        JOB_NAME: 'jobname',
        JOB_DESCRIPTION: 'jobdescription',
        SOURCE: 'source',
        SOURCE_LANGUAGE: 'sourceLanguage',
        TARGET: 'getTargets',
        JOB_ID: 'jobid',
        PAGE_PATH: 'page',
        NOTIFY_EMAILS: 'notifyemails',
        CONTENT_TYPE: 'contentType',
        LSP: 'lsp',
        IN_TARGET: 'intarget',
        ONLY_LOCKED: 'onlylocked',
        UNLOCK_DONE: 'unlockdone',
        DO_NOT_SYNC: 'donotsync',
        LOCAL_TM: 'localtm',
        WORK_ITEM_PATH: 'workItemPath'
    };

    $(document).on('foundation-contentloaded', ELEMENTS.WELL_CLASS, function () {
        var form = $(this).closest('form');
        if ($('[name="' + ELEMENTS.FORM_NAME + '"][value="' + ELEMENTS.FORM_VALUE + '"]').length == 1) {
            Medtronic.Workflow.populateForm();
        }
    });

    $(document).on('submit', '#updateworkitemform', function(e) {
        if ($('[name="' + ELEMENTS.FORM_NAME + '"][value="' + ELEMENTS.FORM_VALUE + '"]').length == 1) {
            Medtronic.Workflow.formSubmitHandler(e);
        }
    });
    $(document).on('selected', 'select[name="route"]', function(e){
        if ($('[name="' + ELEMENTS.FORM_NAME + '"][value="' + ELEMENTS.FORM_VALUE + '"]').length == 1) {
            Medtronic.Workflow.routeChangeHandler();
        }
    })

    return {
        populateForm: function() {
            var workitemPath = $('[name="' + FIELD_IDENTIFIERS.WORK_ITEM_PATH + '"]').val();

            $.getJSON(URLS.GET_PROPERTIES + '?' + PROPERTIES.WORKITEM_PATH + '=' + workitemPath, function (data) {
                $('input[name="' + FIELD_IDENTIFIERS.JOB_NAME + '"]').val(data[PROPERTIES.JOB_NAME]);
                $('input[name="' + FIELD_IDENTIFIERS.JOB_DESCRIPTION + '"]').val(data[PROPERTIES.JOB_DESCRIPTION]);
                $('input[name="' + FIELD_IDENTIFIERS.PAGE_PATH + '"]').val(data[PROPERTIES.PAGE_PATH]);
                $('input[name="' + FIELD_IDENTIFIERS.SOURCE + '"]').val(data[PROPERTIES.SOURCE_LANGUAGE]);
                $('input[name="' + FIELD_IDENTIFIERS.TARGET + '"]').val(data[PROPERTIES.TARGET_LANGUAGE]);
                if (data[PROPERTIES.SOURCE_LANGUAGE]) {
                    $('[name="' + FIELD_IDENTIFIERS.SOURCE_LANGUAGE + '"]').parent().parent().hide();
                }
            });

            $.get(URLS.NOTIFY_EMAILS, function (data) {
                $('input[name="' + FIELD_IDENTIFIERS.NOTIFY_EMAILS + '"]').val(data);
            })
        },
        formSubmitHandler: function(event) {
            if ($('[name="route"] option:selected').html() === ELEMENTS.TRANSLATE_TEXT) {
                // Check if source is set, if not get source from source language
                if (!$('input[name="' + FIELD_IDENTIFIERS.SOURCE + '"]').val()) {
                    $('input[name="' + FIELD_IDENTIFIERS.SOURCE + '"]').val($('[name="' + FIELD_IDENTIFIERS.SOURCE_LANGUAGE + '"]').val());
                }
                Medtronic.Workflow.createJob();
                Medtronic.Workflow.addPage();
            }
            $('div.external-dialog-injection').find('input,select,textarea').attr('disabled', true);
        },
        createJob: function() {
            var data = {};
            data[FIELD_IDENTIFIERS.JOB_NAME] = $('input[name="' + FIELD_IDENTIFIERS.JOB_NAME + '"]').val();
            data[FIELD_IDENTIFIERS.JOB_DESCRIPTION] = $('input[name="' + FIELD_IDENTIFIERS.JOB_DESCRIPTION + '"]').val();
            data[FIELD_IDENTIFIERS.CONTENT_TYPE] = $('select[name="' + FIELD_IDENTIFIERS.CONTENT_TYPE + '"]').val();
            data[FIELD_IDENTIFIERS.NOTIFY_EMAILS] = $('input[name="' + FIELD_IDENTIFIERS.NOTIFY_EMAILS + '"]').val();
            data[FIELD_IDENTIFIERS.LSP] = $('select[name="' + FIELD_IDENTIFIERS.LSP + '"]').val();
            data[FIELD_IDENTIFIERS.IN_TARGET] = $('input[name="' + FIELD_IDENTIFIERS.IN_TARGET + '"]').val();
            data[FIELD_IDENTIFIERS.ONLY_LOCKED] = $('input[name="' + FIELD_IDENTIFIERS.ONLY_LOCKED + '"]').val();
            data[FIELD_IDENTIFIERS.UNLOCK_DONE] = $('input[name="' + FIELD_IDENTIFIERS.UNLOCK_DONE + '"]').val();
            data[FIELD_IDENTIFIERS.DO_NOT_SYNC] = $('input[name="' + FIELD_IDENTIFIERS.DO_NOT_SYNC + '"]').val();
            data[FIELD_IDENTIFIERS.LOCAL_TM] = $('input[name="' + FIELD_IDENTIFIERS.LOCAL_TM + '"]').val();

            $.ajax({
                async: false,
                url: URLS.ADD_JOB,
                data: data
            }).done(function(data) {
                $('[name="' + FIELD_IDENTIFIERS.JOB_ID + '"]').val(data.replace(/\{jobs:\[\s*\{jobid:\s?'/, '').replace(/'\}\s*\]\s*}\s*/, ''));
            });
        },
        addPage: function() {
            var data = {},
                ok = false;
            data[FIELD_IDENTIFIERS.JOB_ID] = $('input[name="' + FIELD_IDENTIFIERS.JOB_ID + '"]').val();
            data[FIELD_IDENTIFIERS.PAGE_PATH] = $('input[name="' + FIELD_IDENTIFIERS.PAGE_PATH + '"]').val();
            data[FIELD_IDENTIFIERS.SOURCE] = $('input[name="' + FIELD_IDENTIFIERS.SOURCE + '"]').val();
            data[FIELD_IDENTIFIERS.TARGET] = $('input[name="' + FIELD_IDENTIFIERS.TARGET + '"]').val();
            data[FIELD_IDENTIFIERS.IN_TARGET] = $('input[name="' + FIELD_IDENTIFIERS.IN_TARGET + '"]').val();
            data[FIELD_IDENTIFIERS.ONLY_LOCKED] = $('input[name="' + FIELD_IDENTIFIERS.ONLY_LOCKED + '"]').val();
            data[FIELD_IDENTIFIERS.UNLOCK_DONE] = $('input[name="' + FIELD_IDENTIFIERS.UNLOCK_DONE + '"]').val();
            data[FIELD_IDENTIFIERS.DO_NOT_SYNC] = $('input[name="' + FIELD_IDENTIFIERS.DO_NOT_SYNC + '"]').val();
            data[FIELD_IDENTIFIERS.LOCAL_TM] = $('input[name="' + FIELD_IDENTIFIERS.LOCAL_TM + '"]').val();

            if (data[FIELD_IDENTIFIERS.PAGE_PATH]) {
                $.ajax({
                    async: false,
                    url: URLS.ADD_PAGE,
                    data: data
                }).done(function (data) {
                    ok = data.replace(/\{results:\[\s*\{text:\s?'/, '').replace(/'\}\s*\]\s*}\s*/, '') === 'OK';
                });
            }

            return ok;
        },
        routeChangeHandler: function() {
            var routeName = $('[name="' + ELEMENTS.ROUTE + '"] option:selected').html(),
                translateProperties = $('.' + ELEMENTS.TRANSLATION_PROPERTIES);
            if (routeName === ELEMENTS.DO_NOT_TRANSLATE_TEXT) {
                translateProperties.hide();
            } else {
                translateProperties.show();
            }
        }
    };
})();