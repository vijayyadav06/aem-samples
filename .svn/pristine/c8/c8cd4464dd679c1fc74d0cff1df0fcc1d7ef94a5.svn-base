use([], function() {
  /**
   * This returns the resource from the "shallowest" end of the live
   * relationship. In the best case, it will return the resource path under
   * restrictive/ or permissive/. Once it follows a live relationship back as
   * far as it can, it returns that resource path.
   */
  function getShallowestResource(source, liveRelationshipManager, resolver) {
    var liveRelationship = liveRelationshipManager.getLiveRelationship(source, false);
    var sourcePath = source.getPath();

    if (!liveRelationship || sourcePath.indexOf("/permissive/") > -1 || sourcePath.indexOf("/restrictive/") > -1) {
      return source;
    } else {
      var nextSource = resolver.getResource(liveRelationship.getSourcePath());

      if (nextSource) {
        return getShallowestResource(nextSource, liveRelationshipManager, resolver);
      } else {
        return source;
      }
    }
  }

  return {
    getShallowestResource: getShallowestResource
  };
});