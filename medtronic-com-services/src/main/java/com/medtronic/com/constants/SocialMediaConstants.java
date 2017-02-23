package com.medtronic.com.constants;


/**
 * Created by ryanmccullough on 2016-01-12.
 */
public class SocialMediaConstants {

    //Account Types
    public static final String ACCOUNT_TYPE_FACEBOOK = "facebook";
    public static final String ACCOUNT_TYPE_TWITTER = "twitter";
    public static final String ACCOUNT_TYPE_LINKEDIN = "linkedin";

    //Account Base URLs
    public static final String BASE_URL_FACEBOOK = "https://www.facebook.com/";
    public static final String BASE_URL_LINKEDIN = "https://www.linkedin.com/company/";
    public static final String BASE_URL_TWITTER = "https://twitter.com/";

    /*
           In the below constants, when you see the suffix _BASE, it implies that we
           are fetching data from children of that node.  The children in which we are fetching
           data will share the same prefix of the _BASE node.

           For example:

           FB_SHARES_COUNT is the name of a child node of the FB_SHARES_BASE node
           in regards to the response JSON.

     */

    //Facebook JSON constants
    public static final String FB_ROOT_NODE = "data";
    public static final String FB_MESSAGE = "message";
    public static final String FB_SHARE_PICTURE = "picture";
    public static final String FB_SHARE_DESCRIPTION = "description";
    public static final String FB_SHARE_NAME = "name";
    public static final String FB_CREATED_TIME = "created_time";
    public static final String FB_POSTER_FROM_BASE = "from";
    public static final String FB_POSTER_FROM_NAME = "name";
    public static final String FB_COMMENTS = "comments";
    public static final String FB_SHARES_BASE="shares";
    public static final String FB_SHARES_COUNT = "count";
    public static final String FB_LIKES_BASE = "likes";
    public static final String FB_LIKES_DATA = "data";
    public static final String FB_ID = "id";
    public static final String FB_POST_URL = "link";


    //Twitter JSON Constants
    public static final String TWITTER_ERROR_NODE = "error";
    public static final String TWITTER_MESSAGE = "text";
    public static final String TWITTER_FAVORITES = "favorite_count";
    public static final String TWITTER_USER_BASE = "user";
    public static final String TWITTER_USER_NAME = "name";
    public static final String TWITTER_RETWEETS = "retweet_count";
    public static final String TWITTER_POST_ID = "id_str";
    public static final String TWITTER_CREATED = "created_at";

    //LinkedIn JSON Constants

    public static final String LI_BASE_NODE = "values";
    public static final String LI_CONTENT_BASE = "updateContent";
    public static final String LI_CONTENT_COMPANY_BASE = "company";
    public static final String LI_CONTENT_COMPANY_NAME = "name";
    public static final String LI_CONTENT_UPDATE_BASE = "companyStatusUpdate";
    public static final String LI_CONTENT_UPDATE_SHARE_BASE = "share";
    public static final String LI_CONTENT_UPDATE_SHARE_MESSAGE = "comment";
    public static final String LI_CONTENT_UPDATE_SHARE_MEDIA_BASE = "content";
    public static final String LI_CONTENT_UPDATE_SHARE_MEDIA_DESCRIPTION = "description";
    public static final String LI_CONTENT_UPDATE_SHARE_MEDIA_THUMBNAIL = "thumbnailURL";
    public static final String LI_CONTENT_UPDATE_SHARE_MEDIA_TITLE = "title";
    public static final String LI_ID = "updateKey";
    public static final String LI_CREATED = "timestamp";
    public static final String LI_NUM_LIKES = "numLikes";
    public static final String LI_COMMENTS = "updateComments";

}
