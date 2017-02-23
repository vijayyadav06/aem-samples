package com.medtronic.com.models.search;


/**
 * The Class GsaPredictiveResults.
 */
public class GsaPredictiveAndSuggestiveResults {
    
    /** The gsa results. */
    private GsaSearchResults gsaSearchResults;
    
    /** The gsa predictive. */
    private GsaPredictive gsaPredictive;

    /**
     * Gets the gsa results.
     *
     * @return the gsa results
     */
    public GsaSearchResults getGsaResults() {
        return gsaSearchResults;
    }

    /**
     * Sets the gsa results.
     *
     * @param gsaSearchResults the new gsa results
     */
    public void setGsaResults(final GsaSearchResults gsaSearchResults) {
        this.gsaSearchResults = gsaSearchResults;
    }

    /**
     * Gets the gsa predictive.
     *
     * @return the gsa predictive
     */
    public GsaPredictive getGsaPredictive() {
        return gsaPredictive;
    }

    /**
     * Sets the gsa predictive.
     *
     * @param gsaPredictive the new gsa predictive
     */
    public void setGsaPredictive(final GsaPredictive gsaPredictive) {
        this.gsaPredictive = gsaPredictive;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "GSASearchResults: " + gsaSearchResults + " GSAPredictive: " + gsaPredictive;
    }
}
