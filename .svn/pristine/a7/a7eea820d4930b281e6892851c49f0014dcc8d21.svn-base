/*package com.medtronic.com.app;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.medtronic.com.constants.SocialMediaConstants;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SocialMediaPost.class })
public class SocialMediaPostTest {

  
    @Test
    public void createPostFromFbJSONTest() throws JsonProcessingException, IOException {
        
        //input
        ObjectMapper mapper = new ObjectMapper();
        File jsonFile = new File("src/test/java/com/medtronic/com/app/fbpost.json");
        InputStream is = new FileInputStream(jsonFile);
        JsonNode fbPostNode = mapper.readTree(is);
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK;
       
        //stimulus
        SocialMediaPost fbPost = SocialMediaPost.createPostFromJSON(fbPostNode, accountType);
        
        //assert
        Assert.assertNotNull(fbPost);
        Assert.assertEquals("Y999", fbPost.getID());
        Assert.assertEquals("Looking forward to 2016!", fbPost.getMessage());
        Assert.assertEquals(2, fbPost.getNumLikes());
        Assert.assertEquals(10, fbPost.getNumShares());
        
    }
    
    @Test
    public void createPostFromLInJSONTest() throws JsonProcessingException, IOException {
        
        //input
        ObjectMapper mapper = new ObjectMapper();
        File jsonFile = new File("src/test/java/com/medtronic/com/app/linpost.json");
        InputStream is = new FileInputStream(jsonFile);
        JsonNode linPostNode = mapper.readTree(is);
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_LINKEDIN;
        
        //stimulus
        SocialMediaPost linPost = SocialMediaPost.createPostFromJSON(linPostNode, accountType);
        
        //assert
        Assert.assertNotNull(linPost);
        Assert.assertEquals("4CD7", linPost.getID());
        Assert.assertEquals("linked in comment message", linPost.getMessage());
        Assert.assertEquals(10, linPost.getNumLikes());
        Assert.assertEquals("linked in share description", linPost.getShareDescription());
        
    }
    
    @Test
    public void createPostFromTweetJSONTest() throws JsonProcessingException, IOException {
        
        //input
        ObjectMapper mapper = new ObjectMapper();
        File jsonFile = new File("src/test/java/com/medtronic/com/app/tweetpost.json");
        InputStream is = new FileInputStream(jsonFile);
       JsonNode tweetPostNode = mapper.readTree(is);
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_TWITTER;
        
        //stimulus
        SocialMediaPost tweetPost = SocialMediaPost.createPostFromJSON(tweetPostNode, accountType);
        
        //assert
        Assert.assertNotNull(tweetPost);
        Assert.assertEquals("Tweet ID 1234", tweetPost.getID());
        Assert.assertEquals("Twitter comment message", tweetPost.getMessage());
        Assert.assertEquals(10, tweetPost.getNumLikes());
        Assert.assertEquals(2, tweetPost.getNumShares());
        
    }
    
    

}
*/