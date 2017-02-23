/*package com.medtronic.com.app;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.adobe.cq.sightly.WCMUse;
import com.medtronic.com.constants.SocialMediaConstants;
import com.medtronic.com.services.SocialMediaService;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SocialMedia.class, SocialMediaService.class, WCMUse.class, SocialMediaPost.class})
public class SocialMediaTest {

    private SocialMedia socialMedia;
    
    private static final String ACCOUNT_NAME_PARAM = "accountName";

    private static final String ACCOUNT_TYPE_PARAM = "accountType";

    @Before
    public void setUp() throws Exception {       
        
        socialMedia = Mockito.spy(new SocialMedia());
        Mockito.doReturn("testAccountName").when((WCMUse)socialMedia).get(ACCOUNT_NAME_PARAM,String.class);
        Mockito.doReturn(SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK).when((WCMUse)socialMedia).get(ACCOUNT_TYPE_PARAM,String.class);
        socialMedia.activate();
        
        PowerMockito.mockStatic(SocialMediaService.class);
        PowerMockito.mockStatic(SocialMediaPost.class);
    }
    
    @Test
    public void getFacebookPostsTest() throws JsonProcessingException, IOException {
        
        String sampleJsonResponseFB = "{" + "\"data\":" + "{" +  "\"name\" : \"fname\""  + "}}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode sampleJsonNodeFB = objectMapper.readTree(sampleJsonResponseFB);
        
        SocialMediaPost fbPost = new SocialMediaPost();
        fbPost.setMessage("Fb message test");
        
        //behavior
        Mockito.when(SocialMediaService.getPostsJson(Mockito.eq("testAccountName"), Mockito.eq(SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK))).thenReturn(sampleJsonNodeFB);
        Mockito.when(SocialMediaPost.createPostFromJSON(Mockito.any(JsonNode.class),Mockito.any(String.class))).thenReturn(fbPost);
        
        //stimulus
        List<SocialMediaPost> fbPosts = socialMedia.getFacebookPosts();
        
        //assert
        Assert.assertEquals(1,fbPosts.size());
        Assert.assertEquals("Fb message test",fbPosts.get(0).getMessage());
    }
    
    @Test
    public void getLinkedInPostsTest() throws JsonProcessingException, IOException {
        
        String sampleJsonResponseLIn = "{" + "\"values\":" + "{" +  "\"name\" : \"fname\""  + "}}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode sampleJsonNodeLIn = objectMapper.readTree(sampleJsonResponseLIn);
        
        SocialMediaPost lInPost = new SocialMediaPost();
        lInPost.setMessage("LIn message test");
        
        //behavior
        Mockito.when(SocialMediaService.getPostsJson(Mockito.eq("testAccountName"), Mockito.eq(SocialMediaConstants.ACCOUNT_TYPE_LINKEDIN))).thenReturn(sampleJsonNodeLIn);
        Mockito.when(SocialMediaPost.createPostFromJSON(Mockito.any(JsonNode.class),Mockito.any(String.class))).thenReturn(lInPost);
        
        //stimulus
        List<SocialMediaPost> lInPosts = socialMedia.getLinkedInPosts();
        
        //assert
        Assert.assertEquals(1,lInPosts.size());
        Assert.assertEquals("LIn message test",lInPosts.get(0).getMessage());
    }
    
    @Test
    public void getTwitterPostsTest() throws JsonProcessingException, IOException {
        
        String sampleJsonResponseLIn = "{" + "\"values\": \"twitter\""  + "}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode sampleJsonNodeTweet = objectMapper.readTree(sampleJsonResponseLIn);
        
        SocialMediaPost tweetPost = new SocialMediaPost();
        tweetPost.setMessage("Tweet message test");
        
        //behavior
        Mockito.when(SocialMediaService.getPostsJson(Mockito.eq("testAccountName"), Mockito.eq(SocialMediaConstants.ACCOUNT_TYPE_TWITTER))).thenReturn(sampleJsonNodeTweet);
        Mockito.when(SocialMediaPost.createPostFromJSON(Mockito.any(JsonNode.class),Mockito.any(String.class))).thenReturn(tweetPost);
        
        //stimulus
        List<SocialMediaPost> tweetPosts = socialMedia.getTwitterPosts();
        
        //assert
        Assert.assertEquals(1,tweetPosts.size());
        Assert.assertEquals("Tweet message test",tweetPosts.get(0).getMessage());
    }
    
}
*/