use([], function() {
  "use strict";
  
  var slingSettingsService = sling.getService(Packages.org.apache.sling.settings.SlingSettingsService);
  var runModes = slingSettingsService.getRunModes();
  
  var modes = {};
  
  runModes.toArray().forEach(function(mode) {
    modes[mode] = true;
  });
  
  return modes;
});