package com.medtronic.com.app;

import com.medtronic.com.constants.SocialMediaConstants;

import org.codehaus.jackson.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by ryanmccullough on 2016-01-11.
 *
 * Generic Social Media Post Object
 *
 * Some fields may not be applicable to all social media feeds.  They are commented below.
 */
public class SocialMediaPost {

    private static final Logger LOG = LoggerFactory.getLogger(SocialMediaPost.class);
    private static final String FB_INPUT_DATE_FORMAT = "yyyy-MM-dd'T'hh:mm:ssZ";
    private static final String OUTPUT_DATE_FORMAT = "dd MMM yy";
    // URL Regex taken from: https://mathiasbynens.be/demo/url-regex (@imme_emosol)
    // based on the result matrix shown,it was the best fit for our needs
    private static final String URL_REGEX = "(https?|ftp)://(-\\.)?([^\\s/?\\.#-]+\\.?)+(/[^\\s]*)?";
    private static final int MAX_MESSAGE_LENGTH = 140;
    private static final String ANCHOR_FORMAT = "<a href='%s' target='%s'>%s</a>";
    private static final String MESSAGE_EXCEEDED_SUFFIX = "...";
    private enum ACCOUNT {
        FACEBOOK,
        LINKEDIN,
        TWITTER
    }

    private String id;
    private JsonNode comments;//if applicable
    private String message;
    private int numShares; //shares for FB, retweets for twitter
    private int numLikes; // likes for FB, favorites for twitter
    private String poster;
    private String postTime;
    private String postURL;
    private ACCOUNT account;
    private String newTab;



    //Facebook/LinkedIn Media Share (Thumbnail - Picture, Description, Title - of referenced link/share)
    private String sharePictureURL;
    private String shareDescription;
    private String shareTitle;

    private SimpleDateFormat fbDateFormat;
    private SimpleDateFormat outDateFormat;

    private Pattern urlPattern;

    public SocialMediaPost(){
        fbDateFormat = new SimpleDateFormat(FB_INPUT_DATE_FORMAT);
        outDateFormat = new SimpleDateFormat(OUTPUT_DATE_FORMAT);
        urlPattern = Pattern.compile(URL_REGEX);
    }

    public JsonNode getComments() {
        return comments;
    }

    public void setAccount(ACCOUNT account) {
        this.account = account;
    }

    public ACCOUNT getAccount(){
        return account;
    }

    public void setComments(JsonNode comments) {
        this.comments = comments;
    }

    public String getID() {
        return id;
    }

    public void setID(String id) {
        this.id = id;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        if( message.length() > MAX_MESSAGE_LENGTH ){
            message = message.substring(0,MAX_MESSAGE_LENGTH) + MESSAGE_EXCEEDED_SUFFIX;
        }
        message = addAnchorsToURLs(message);
        this.message = message;
    }

    public void setNewTab(String newTab){
        this.newTab = newTab == null ? "_self":"_blank";
    }

    public String getNewTab(){
        return newTab;
    }
    public int getNumLikes() {
        return numLikes;
    }

    public void setNumLikes(int likes) {
        this.numLikes = likes;
    }

    public int getNumShares() {
        return numShares;
    }

    public void setNumShares(int numShares) {
        this.numShares = numShares;
    }

    public void setPoster(String poster){
        this.poster = poster;
    }

    public String getPoster(){
        return poster;
    }

    public String getPostTime(){
        return postTime;
    }

    public void setPostTime(String postTime){
        Date inDate = null;
        try{
            switch (getAccount()){
                case FACEBOOK:
                    inDate = fbDateFormat.parse(postTime);
                    break;
                case LINKEDIN:
                    inDate = new Date(Long.parseLong(postTime));
                    break;
                case TWITTER:
                default:
                    inDate = new Date(postTime);
            }
        }catch(Exception e){
            LOG.info("Could not parse date [{}] for post.",postTime);
        }
        if( inDate != null){
            postTime = outDateFormat.format(inDate);
        }
        this.postTime = postTime;
    }

    public String getPostURL(){
        return postURL;
    }

    public void setPostURL(String url){
        this.postURL = url;
    }

    public String getShareDescription() {
        return shareDescription;
    }

    public void setShareDescription(String description) {
        this.shareDescription = description;
    }


    public String getShareTitle() {
        return shareTitle;
    }

    public void setShareTitle(String title) {
        this.shareTitle = title;
    }

    public String getSharePictureURL() {
        return sharePictureURL;
    }

    public void setSharePictureURL(String pictureURL) {
        this.sharePictureURL = pictureURL;
    }

    private String addAnchorsToURLs(String message){
        StringBuffer sb = new StringBuffer();
        Matcher m = urlPattern.matcher(message);

        while(m.find()){
            String href = m.group(0);
            String replacement = String.format(ANCHOR_FORMAT,href, newTab,href);
            m.appendReplacement(sb, replacement);
        }
        m.appendTail(sb);
        return sb.toString();
    }

    public static SocialMediaPost createPostFromJSON(JsonNode postJson, String accountType){
        return createPostFromJSON(postJson,accountType,null);
    }

    public static SocialMediaPost createPostFromJSON(JsonNode postJson, String accountType, String newTab){
        SocialMediaPost post = null;
        if( accountType.equals(SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK) ) {
            post = createPostFromFacebookJSON(postJson);
        }else if (accountType.equals(SocialMediaConstants.ACCOUNT_TYPE_TWITTER) ){
            post = createPostFromTwitterJSON(postJson);
        }else if ( accountType.equals(SocialMediaConstants.ACCOUNT_TYPE_LINKEDIN) ){
            post = createPostFromLinkedInJSON(postJson);
        }else{
            LOG.warn("Incompatible account type [{}] sent in for Social Media Feed.  Ignoring.", accountType);
        }
        post.setNewTab(newTab);
        return post;
    }

    public static SocialMediaPost createPostFromFacebookJSON(JsonNode fbPostJson){
        return createPostFromFacebookJSON(fbPostJson,null);
    }

    public static SocialMediaPost createPostFromFacebookJSON(JsonNode fbPostJson, String newTab){
        SocialMediaPost fbPost = new SocialMediaPost();
        fbPost.setAccount(ACCOUNT.FACEBOOK);
        fbPost.setMessage(fbPostJson.path(SocialMediaConstants.FB_MESSAGE).getTextValue());
        //in FB feed, username is under the from node
        fbPost.setPoster(fbPostJson.path(SocialMediaConstants.FB_POSTER_FROM_BASE)
                .path(SocialMediaConstants.FB_POSTER_FROM_NAME).getTextValue());
        fbPost.setPostTime(fbPostJson.path(SocialMediaConstants.FB_CREATED_TIME).getTextValue());
        fbPost.setComments(fbPostJson.path(SocialMediaConstants.FB_COMMENTS));
        //in FB feed, the number of likes is under the "likes" base node.
        //It's a list of each person, so we count the list with size()
        fbPost.setNumLikes(fbPostJson.path(SocialMediaConstants.FB_LIKES_BASE)
                .path(SocialMediaConstants.FB_LIKES_DATA).size());
        //In FB feed, number of shares is under the "share" base node
        fbPost.setNumShares(fbPostJson.path(SocialMediaConstants.FB_SHARES_BASE)
                .path(SocialMediaConstants.FB_SHARES_COUNT).getIntValue());
        // In FB feed, id's format is xxxx_xxxx, the last parameter is useful
        String id = fbPostJson.path(SocialMediaConstants.FB_ID).getTextValue();
        String[] temp = id.split("_");
        fbPost.setID(temp[temp.length-1]);
        fbPost.setPostURL(fbPostJson.path(SocialMediaConstants.FB_POST_URL).getTextValue());
        /*
            FB Share Info - Picture/Title/Description of shared link.
        */
        fbPost.setSharePictureURL(fbPostJson.path(SocialMediaConstants.FB_SHARE_PICTURE).getTextValue());
        fbPost.setShareDescription(fbPostJson.path(SocialMediaConstants.FB_SHARE_DESCRIPTION).getTextValue());
        fbPost.setShareTitle(fbPostJson.path(SocialMediaConstants.FB_SHARE_NAME).getTextValue());
        fbPost.setNewTab(newTab);
        LOG.debug("Created FB Post:{}",fbPost.toString());
        return fbPost;
    }

    public static SocialMediaPost createPostFromLinkedInJSON(JsonNode liPostJson){
        return createPostFromLinkedInJSON(liPostJson,null);
    }

    public static SocialMediaPost createPostFromLinkedInJSON(JsonNode liPostJson, String newTab){
        SocialMediaPost liPost = new SocialMediaPost();
        liPost.setAccount(ACCOUNT.LINKEDIN);
        // In LinkedIn feed, the id is such as "UPDATE-XXX-XXXX", only need the last parameter
        String id = liPostJson.path(SocialMediaConstants.LI_ID).getTextValue();
        String[] temp = id.split("-");
        liPost.setID(temp[temp.length-1]);
        liPost.setPostTime(String.valueOf(liPostJson.path(SocialMediaConstants.LI_CREATED).getLongValue()));

        liPost.setComments(liPostJson.path(SocialMediaConstants.LI_COMMENTS));
        liPost.setNumLikes(liPostJson.path(SocialMediaConstants.LI_NUM_LIKES).getIntValue());
        //LI Nests most of its useful information underneath a content node.
        JsonNode contentBase = liPostJson.path(SocialMediaConstants.LI_CONTENT_BASE);
        //Under the content node, the company name is found under the company node.
        liPost.setPoster(contentBase.path(SocialMediaConstants.LI_CONTENT_COMPANY_BASE)
                .path(SocialMediaConstants.LI_CONTENT_COMPANY_NAME).getTextValue());
        //Almost all of the items in the LI JSON Post feed are under Post --> updateContent --> share
        JsonNode shareBase = contentBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_BASE).path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_BASE);
        //The content of the status update is stored directly under the share node
        liPost.setMessage(shareBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_MESSAGE).getTextValue());
        /*
            LinkedIn Share info - Picture/Title/Description of shared link
            If the update included a shared link, the info is stored under the media base
         */
        JsonNode shareMediaBase = shareBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_MEDIA_BASE);
        liPost.setShareDescription(shareMediaBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_MEDIA_DESCRIPTION).getTextValue());
        liPost.setShareTitle(shareMediaBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_MEDIA_TITLE).getTextValue());
        liPost.setSharePictureURL(shareMediaBase.path(SocialMediaConstants.LI_CONTENT_UPDATE_SHARE_MEDIA_THUMBNAIL).getTextValue());
        LOG.debug("Created LI Post:{}",liPost.toString());
        liPost.setNewTab(newTab);
        return liPost;

    }

    public static SocialMediaPost createPostFromTwitterJSON(JsonNode twPostJson) {
        return createPostFromTwitterJSON(twPostJson,null);
    }

    public static SocialMediaPost createPostFromTwitterJSON(JsonNode twPostJson, String newTab) {
        SocialMediaPost twPost = new SocialMediaPost();
        twPost.setAccount(ACCOUNT.TWITTER);
        twPost.setMessage(twPostJson.path(SocialMediaConstants.TWITTER_MESSAGE).getTextValue());
        twPost.setID(twPostJson.path(SocialMediaConstants.TWITTER_POST_ID).getTextValue());
        twPost.setNumLikes(twPostJson.path(SocialMediaConstants.TWITTER_FAVORITES).getIntValue());
        twPost.setNumShares(twPostJson.path(SocialMediaConstants.TWITTER_RETWEETS).getIntValue());
        //For Twitter, username is a child node of "name"
        twPost.setPoster(twPostJson.path(SocialMediaConstants.TWITTER_USER_BASE).path(SocialMediaConstants
                .TWITTER_USER_NAME).getTextValue());
        twPost.setPostTime(twPostJson.path(SocialMediaConstants.TWITTER_CREATED).getTextValue());
        twPost.setNewTab(newTab);
        LOG.debug("Created TW Post:{}", twPost.toString());
        return twPost;
    }


    public String toString(){
        return "Username:" + this.getPoster() + "\n" +
                "Message:" + this.getMessage() + "\n" +
                "Created:" + this.getPostTime() + "\n" +
                "URL:" + this.getPostURL() + "\n" +
                "ID: " + this.getID() + "\n" +
                "Shares: " + this.getNumShares() + "\n" +
                "Likes: " + this.getNumLikes() + "\n";
    }

}
