// Injects SVG details at the top of the document
var SVG = function () {

	// this will be a public method
	var init = function (url) {
    var icon1 = document.querySelectorAll('.shape-mdt-arrow--next');
    var icon2 = document.querySelectorAll('.shape-mdt-arrow--previous');
    var icon3 = document.querySelectorAll('.shape-mdt-chevron--down');
    var icon4 = document.querySelectorAll('.shape-mdt-chevron--left');
    var icon5 = document.querySelectorAll('.shape-mdt-chevron--right');
    var icon6 = document.querySelectorAll('.shape-mdt-chevron--up');
    var icon7 = document.querySelectorAll('.shape-mdt-close');
    var icon8 = document.querySelectorAll('.shape-mdt-download--archive');
    var icon9 = document.querySelectorAll('.shape-mdt-download--document');
    var icon10 = document.querySelectorAll('.shape-mdt-download--image');
    var icon11 = document.querySelectorAll('.shape-mdt-download--media');
    var icon12 = document.querySelectorAll('.shape-mdt-edit');
    var icon13 = document.querySelectorAll('.shape-mdt-email');
    var icon14 = document.querySelectorAll('.shape-mdt-facebook');
    var icon15 = document.querySelectorAll('.shape-mdt-grid');
    var icon16 = document.querySelectorAll('.shape-mdt-linkedin');
    var icon17 = document.querySelectorAll('.shape-mdt-list');
    var icon18 = document.querySelectorAll('.shape-mdt-print');
    var icon19 = document.querySelectorAll('.shape-mdt-search');
    var icon20 = document.querySelectorAll('.shape-mdt-twitter');
    var icon21 = document.querySelectorAll('.shape-mdt-youtube');
    var icon22 = document.querySelectorAll('.shape-mdt-warning');
    var icon23 = document.querySelectorAll('.shape-mdt-back');
    var icon24 = document.querySelectorAll('.shape-mdt-retweet');
    var icon25 = document.querySelectorAll('.shape-mdt-favorite');
    var icon26 = document.querySelectorAll('.shape-mdt-like');
    var icon27 = document.querySelectorAll('.shape-mdt-comment');
    var icon28 = document.querySelectorAll('.shape-mdt-reply');
    var icon29 = document.querySelectorAll('.shape-mdt-external');
    var icon30 = document.querySelectorAll('.shape-mdt-pinterest');
    var icon31 = document.querySelectorAll('.shape-mdt-instagram');
    var icon32 = document.querySelectorAll('.shape-mdt-weibo');
    var icon33 = document.querySelectorAll('.shape-mdt-wechat');
    var icon34 = document.querySelectorAll('.shape-mdt-youku');
    var icon35 = document.querySelectorAll('.shape-mdt-medblog');
    var icon36 = document.querySelectorAll('.shape-mdt-qqlive');

    // Arrow next
    for (i = 0; i < icon1.length; ++i) {
      icon1[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.4 26.9"><path fill="#004B87" d="M16.4 13.5L.1 26.9V0l16.3 13.5z"/></svg>';
    }

    // Arrow previous
    for (i = 0; i < icon2.length; ++i) {
      icon2[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.4 26.7"><path fill="#004B87" d="M.1 13.2l16.3 13.5V-.2L.1 13.2z"/></svg>';
    }

    // Chevron down
    for (i = 0; i < icon3.length; ++i) {
      icon3[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7.5"><path fill="#004B87" d="M11.9 1.5L10.5 0 5.9 4.5 1.5 0 .1 1.5l5.9 6 5.9-6z"/></svg>';
    }

    // Chevron left
    for (i = 0; i < icon4.length; ++i) {
      icon4[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.5 11.9"><path fill="#004B87" d="M6 11.9l1.5-1.5L3 5.9l4.5-4.4L6 0 0 5.9l6 6z"/></svg>';
    }

    // Chevron right
    for (i = 0; i < icon5.length; ++i) {
      icon5[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.6 11.9"><path fill="#004B87" d="M1.5 0L.1 1.5 4.6 6 .1 10.4l1.5 1.5 6-5.9-6.1-6z"/></svg>';
    }

    // Chevron up
    for (i = 0; i < icon6.length; ++i) {
      icon6[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7.5"><path fill="#004B87" d="M11.9 6l-1.5 1.5-4.5-4.6-4.4 4.6L.1 6 6 0l5.9 6z"/></svg>';
    }

    // Close
    for (i = 0; i < icon7.length; ++i) {
      icon7[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="#004B87" d="M9.5 22.3l5.8-5.8 5.8 5.8 1-1-5.8-5.8 5.8-5.8-1-1-5.8 5.8-5.8-6-1 1 5.8 5.8-5.8 5.8 1 1.2zM0 0v30h30V0H0zm27.9 27.9H2.1V2.1h25.8v25.8z"/></svg>';
    }

    // Download archive
    for (i = 0; i < icon8.length; ++i) {
      icon8[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.2 27"><g fill-rule="evenodd" clip-rule="evenodd" fill="#004B87"><path d="M14.2 0v7h6"/><path d="M14.7 8h-1.5V0H.2v27h20V8h-5.5zm-4 14.5l-7.1-3.8 2-1.1 5.1 2.7 5-2.7 2 1.1-7 3.8zm0-3.2l-7.1-3.8 2-1.1 5.1 2.7 5-2.7 2 1.1-7 3.8zm0-3.3l-7.1-3.8 7.1-3.8 7 3.8-7 3.8z"/></g></svg>';
    }

    // Download document
    for (i = 0; i < icon9.length; ++i) {
      icon9[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.2 27"><g fill="#004B87"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2 0v7h5.9"/><path d="M14.7 8h-1.5V0H.2v27h20V8h-5.5zM3.2 6h7v2h-7V6zm14 17h-14v-2h14v2zm0-5h-14v-2h14v2zm0-5h-14v-2h14v2z"/></g></svg>';
    }

    // Download image
    for (i = 0; i < icon10.length; ++i) {
      icon10[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.2 27"><g fill-rule="evenodd" clip-rule="evenodd" fill="#004B87"><path d="M14.2 0v7h6"/><path d="M14.7 8h-1.5V0H.2v27h20V8h-5.5zM8 6.2c1.6 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.4-3 3-3zM17.2 23h-14v-5.5l2.7-2.4 3.7 2.3 3.6-4.9 4 4.6V23z"/></g></svg>';
    }

    // Download media
    for (i = 0; i < icon11.length; ++i) {
      icon11[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.1 27"><g fill-rule="evenodd" clip-rule="evenodd" fill="#004B87"><path d="M14.1 0v7h6m-6.2 8.7l-1.7-1c-.4-.2-1-.6-1.3-.8l-1.9-1c-.4-.2-.8 0-.8.4v5.6c0 .4.5.6.8.4l1.7-1c.4-.2 1.1-.6 1.5-.8l1.7-1c.4-.2.4-.6 0-.8z"/><path d="M14.6 8h-1.5V0H.1v27h20V8h-5.5zm-3.9 14.9c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.2 7-7 7z"/></g></svg>';
    }

    // Edit
    for (i = 0; i < icon12.length; ++i) {
      icon12[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.4 19.4"><path fill="#004B87" d="M17.9 5.7l-4.3-4.3L15.1 0l4.3 4.3-1.5 1.4zM7.3 16.4L3 12.1l10-10 4.3 4.3-10 10zM.2 19.2l2.1-6.4 4.3 4.3-6.4 2.1z"/></svg>';
    }

    // Email
    for (i = 0; i < icon13.length; ++i) {
      icon13[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.4 14.1"><path fill="#004B87" d="M.2 14.1V1.9l10 8.1 10.1-8.1v12.2H.2zM.3 0h19.8l-9.9 8.1L.3 0z"/></svg>';
    }

    // Facebook
    for (i = 0; i < icon14.length; ++i) {
      icon14[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.4 17.2"><path fill="#004B87" d="M6.4 3.2h2V0H5.7C1.8 0 1.9 3 1.9 3.4v2.5H.1v3h1.8v8.3h3.7V9H8s.2-1.4.3-3H5.6V3.9c0-.3.4-.7.8-.7z"/></svg>';
    }

    // Grid View
    for (i = 0; i < icon15.length; ++i) {
      icon15[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.8"><path fill="#004B87" d="M15.9 19.8v-4h4v4h-4zm0-11.9h4v4h-4v-4zm0-7.9h4v4h-4V0zM8 15.9h4v4H8v-4zm0-8h4v4H8v-4zM8 0h4v4H8V0zM.1 15.9h4v4h-4v-4zm0-8h4v4h-4v-4zM.1 0h4v4h-4V0z"/></svg>';
    }

    // LinkedIn
    for (i = 0; i < icon16.length; ++i) {
      icon16[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.3 13"><path fill="#004B87" d="M.5 13.1h2.8v-9H.5v9zM1.8 0C.8 0 .1.7.1 1.5S.7 3 1.7 3s1.7-.7 1.7-1.5C3.5.6 2.8 0 1.8 0zm9 4.1c-1.6 0-2.5.8-2.8 1.5V4.1H4.9c.1.7 0 8.9 0 8.9H8V8.2c0-.3 0-.5.1-.7.2-.5.7-1.1 1.5-1.1 1.1 0 1.6.8 1.6 2V13h3.1V8.1c0-2.8-1.5-4-3.5-4z"/></svg>';
    }

    // List View
    for (i = 0; i < icon17.length; ++i) {
      icon17[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#004B87" d="M6.1 20v-4h14v4h-14zm0-12h14v4h-14V8zm0-8h14v4h-14V0zm-6 16h4v4h-4v-4zm0-8h4v4h-4V8zm0-8h4v4h-4V0z"/></svg>';
    }

    // Print
    for (i = 0; i < icon18.length; ++i) {
      icon18[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.2 19.6"><path fill="#004B87" d="M16.2 14.7v4.9H4.1v-4.9h-4V9.8c0-2.7 2.2-4.9 5-4.9h10.1c2.8 0 5 2.2 5 4.9v4.9h-4zm-2-2h-8v4.9h8v-4.9zm2.4-5.8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5c0-.9-.7-1.5-1.5-1.5zM4.1 0h12.1v3.9H4.1V0z"/></svg>';
    }

    // Search
    for (i = 0; i < icon19.length; ++i) {
      icon19[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27.5"><path fill="#004B87" d="M27.1 23.5l-5-5c1.3-1.9 2-4.1 2-6.6C24.2 5.4 18.8 0 12.3 0 5.7 0 .4 5.4.4 11.9s5.4 11.9 11.9 11.9c2.1 0 4.1-.5 5.9-1.5l5.1 5.1 3.8-3.9zM4.3 11.9c0-4.4 3.6-8.1 8.1-8.1s8.1 3.6 8.1 8.1-3.6 8.1-8.1 8.1-8.1-3.6-8.1-8.1z"/></svg>';
    }

    // Twitter
    for (i = 0; i < icon20.length; ++i) {
      icon20[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 15.2"><path fill="#004B87" d="M18.1 1.8c-.6.3-1.4.5-2.1.6.8-.5 1.4-1.2 1.6-2.1-.6.4-1.4.7-2.3.9C14.7.5 13.7 0 12.7 0 10.7 0 9 1.7 9 3.8c0 .3 0 .6.1.9C5.9 4.5 3.3 3 1.4.7c-.3.5-.5 1.2-.5 1.9 0 1.3.6 2.5 1.6 3.2-.5-.1-1.1-.3-1.6-.6v.1C.9 7.2 2.2 8.7 3.8 9c-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.8 2.6 3.4 2.7-1.3 1-2.9 1.6-4.6 1.6-.3 0-.6 0-.9-.1 1.6 1.1 3.6 1.7 5.7 1.7 6.7 0 10.5-5.8 10.5-10.8v-.4c.8-.5 1.4-1.2 1.9-1.9z"/></svg>';
    }

    // YouTube
    for (i = 0; i < icon21.length; ++i) {
      icon21[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 12.14"><path d="M12.93 0H4.57C0 0 0 1.3 0 4.51v3.13c0 3 .65 4.51 4.57 4.51h8.36c3.55 0 4.57-.85 4.57-4.51V4.51c0-3.38-.17-4.51-4.57-4.51zM7 8.45V3.54L11.68 6z" fill="#004b87"/></svg>';
    }

    // Alert
    for (i = 0; i < icon22.length; ++i) {
      icon22[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.1 19"><path fill="#F5A71C" d="M11.6.5L0 19h23.1L11.6.5zm.6 16.8h-1.8v-1.8h1.8v1.8zM10.3 14V6h2v8h-2z"/><path d="M10.3 6h2v8h-2zm.1 9.5h1.8v1.8h-1.8z" fill="#53565A"/></svg>';
    }

    // Back
    for (i = 0; i < icon23.length; ++i) {
      icon23[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.2 12.1"><path fill="#004B87" d="M16.2 10V7c0-2.6-2.7-2.8-2.7-2.8H8.1V.9c0-.5-.4-.9-.9-.9-.1 0-.3 0-.4.1L.6 4.8c-.3.1-.5.4-.5.8 0 .3.2.6.4.8L6.8 11c.1.1.3.1.4.1.5 0 .9-.4.9-.9V7.1c.9 0 2.5.1 3.8 0 1.7-.1 1.6 1.5 1.6 1.5v1.3s-.2 2.3 1.4 2.3c1.3-.1 1.3-2.2 1.3-2.2z"/></svg>';
    }

    // Reload
    for (i = 0; i < icon24.length; ++i) {
      icon24[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.5 12.2"><path d="M5.9 9.7V6h2.5c.4 0 .8-.3.8-.7 0-.1 0-.2-.1-.3L5.3.3C5.1.1 4.9 0 4.6 0c-.2 0-.5.1-.6.3L.2 5c-.1.1-.1.2-.1.3 0 .4.3.7.8.7h2.5v4.4c0 .8.3 1.8 1.5 1.8h6V9.7h-5zm8.7-7.2v3.7h-2.5c-.4 0-.8.3-.8.7 0 .1 0 .2.1.3l3.8 4.7c.1.2.4.3.6.3.3 0 .5-.1.6-.3l3.8-4.7c.1-.1.1-.2.1-.3 0-.4-.3-.7-.8-.7H17V1.8C17 1 16.7 0 15.5 0h-6v2.5h5.1z" fill="#004B87"/></svg>';
    }

    // Favorite
    for (i = 0; i < icon25.length; ++i) {
      icon25[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 85 85"><path id="svg_1" d="m58.7,0c-7.5,0 -14.2,3.7 -18.2,9.5c-4,-5.7 -10.7,-9.5 -18.2,-9.5c-12.3,0 -22.3,10 -22.3,22.3c0,30.4 31.6,58.7 40.5,58.7s40.5,-28.4 40.5,-58.7c0,-12.3 -10,-22.3 -22.3,-22.3z" fill="#004B87"/></svg>';
    }

    // Like
    for (i = 0; i < icon26.length; ++i) {
      icon26[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.8 15.3"><path d="M16.2 8.9c.2.2.3.5.3.9 0 .6-.3 1.1-.8 1.4-.2.1-.3.3-.3.7v.4c0 .6-.4 1.1-.9 1.3-.1 0-.4.2-.4.5-.1.7-.6 1.2-1.3 1.2H7.9c-1 0-2.4-.9-2.4-.9H4.3V7.9h1.2s1.4-1.8 3.7-4.8c.9-1.2 1.1-2.5 1.5-2.9.9-.9 2.2 1.2 1.4 3.3-.3.8-.9 2-.9 2h4.2c.8 0 1.4.5 1.4 1.3 0 .4-.1.8-.4 1.3-.2.2-.4.5-.2.8zM2.7 14.4h-2c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v5.8c0 .3-.2.5-.5.5z" fill="#004B87"/></svg>';
    }

    // Comment
    for (i = 0; i < icon27.length; ++i) {
      icon27[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 17"><path fill="#004B87" d="M14.8 0H1.1C.6 0 .1.5.1 1v9.9c0 .5.5 1 1 1h1.7l.9 5.2L7 11.9h7.7c.5 0 1-.5 1-1V1c.1-.5-.4-1-.9-1z"/></svg>';
    }

    // Share
    for (i = 0; i < icon28.length; ++i) {
      icon28[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.3 15"><path fill="#004B87" d="M12 4V0l7.3 7-7.3 7V9.7c-1.8 0-9.4-.2-11.8 5.2C.2 4 12 4 12 4z"/></svg>';
    }

    // External
    for (i = 0; i < icon29.length; ++i) {
      icon29[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.2 26"><g fill="#004B87"><path d="M19.2 24h-17V5h12L16 3H.2v23h21V8.5l-2 1.8"/><path d="M16.2 0v2h4.7l-8.4 8.3 1.4 1.4 8.3-8.4V8h2V0"/></g></svg>';
    }

    // Pinterest
    for (i = 0; i < icon30.length; ++i) {
      icon30[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.4 16"><path fill="#004B87" d="M6.6 0C2.3 0 .1 3.1.1 5.7c0 1.6.6 3 1.9 3.5.2.1.4 0 .5-.2 0-.2.1-.6.2-.7.1-.2 0-.3-.1-.5-.4-.4-.6-1-.6-1.8 0-2.3 1.7-4.4 4.5-4.4 2.4 0 3.8 1.5 3.8 3.5 0 2.6-1.2 4.8-2.9 4.8-1 0-1.7-.8-1.4-1.8.1-1.1.6-2.4.6-3.2 0-.7-.4-1.4-1.2-1.4-1 0-1.8 1-1.8 2.4 0 .9.3 1.4.3 1.4s-1 4.2-1.2 5c-.3 1.5-.1 3.3 0 3.5 0 .1.2.1.2.1.1-.1 1.2-1.5 1.6-3 .1-.4.6-2.5.6-2.5.3.6 1.2 1.1 2.2 1.1 2.9 0 4.9-2.7 4.9-6.2.2-2.8-2.1-5.3-5.6-5.3z"/></svg>';
    }

    // Instagram
    for (i = 0; i < icon31.length; ++i) {
      icon31[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.1 16"><path fill="#004B87" d="M14.2 0H2C1 0 .1.8.1 1.9v12.2C.1 15.1 1 16 2 16h12.2c1 0 1.9-.8 1.9-1.9V1.9c0-1.1-.8-1.9-1.9-1.9zm-3 2.3c0-.2.2-.4.4-.4h2.2c.2 0 .4.2.4.4v2.2c0 .2-.2.4-.4.4h-2.2c-.2 0-.4-.2-.4-.4V2.3zM8.1 4.9c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1C6.4 11.1 5 9.7 5 8c.1-1.7 1.5-3.1 3.1-3.1zm6.2 8.8c0 .2-.2.4-.4.4H2.4c-.2 0-.4-.2-.4-.4v-7h1.5c-.2.4-.2.9-.2 1.3 0 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9c0-.4-.1-.9-.2-1.3h1.5v7z"/></svg>';
    }

    // Weibo
    for (i = 0; i < icon32.length; ++i) {
      icon32[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 15.6"><path fill="#004B87" d="M13.3 7.8c-.2-.1-.4-.1-.3-.5.3-.7.3-1.3 0-1.8-.6-.8-2.1-.8-3.9 0 0 0-.6.2-.4-.2.3-.9.2-1.6-.2-2.1-1-1-3.5 0-5.8 2.3C1 7.2.1 9 .1 10.5c0 3 3.7 4.9 7.4 4.9 4.8 0 8-3 8-5.2-.1-1.3-1.2-2.1-2.2-2.4zm-5.8 6.3c-2.9.3-5.4-1-5.6-3-.2-1.9 2-3.7 4.9-4 2.9-.3 5.4 1 5.6 3 .2 2-2 3.7-4.9 4zm10.6-8.7c0-3-2.4-5.4-5.4-5.4-.4 0-.7.2-.7.6s.3.6.6.6c2.3 0 4.1 1.9 4.1 4.1 0 .3.3.6.6.6.5.1.8-.2.8-.5zm-2.5-.1c-.3-1.4-1.4-2.5-2.8-2.8-.4-.1-.7.1-.8.5-.1.3.1.7.5.7.9.2 1.6.9 1.8 1.8.1.3.4.6.7.5.4-.1.6-.4.6-.7zM6 9.1c-1.2.2-2 1.2-1.8 2.2.2 1 1.3 1.6 2.5 1.3 1.2-.2 2-1.2 1.8-2.2-.2-1-1.3-1.6-2.5-1.3zm0 0"/></svg>';
    }

    // Wechat
    for (i = 0; i < icon33.length; ++i) {
      icon33[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.5 14.8"><g fill="#004B87"><path d="M12.9 4.9c-3 0-5.4 2.1-5.4 4.6 0 2.5 2.4 4.6 5.4 4.6.6 0 1.3-.2 1.9-.3l1.7 1-.5-1.6c1.3-1 2.2-2.2 2.2-3.7.1-2.5-2.4-4.6-5.3-4.6zm-1.7 3.9c-.3 0-.6-.3-.6-.6s.3-.6.6-.6c.5 0 .8.3.8.6 0 .2-.4.6-.8.6zm3.4 0c-.3 0-.6-.3-.6-.6s.3-.6.6-.6c.5 0 .8.3.8.6 0 .2-.3.6-.8.6z"/><path d="M12.5 4.6h.6C12.6 2 9.8.1 6.7.1 3.2.1.4 2.5.4 5.5c0 1.7 1 3.2 2.5 4.3l-.6 1.9 2.2-1.1c.8.2 1.4.4 2.2.4h.6c-.1-.4-.2-.9-.2-1.3 0-2.8 2.4-5.1 5.4-5.1zM9.1 2.9c.5 0 .8.3.8.8s-.3.8-.8.8-1-.3-1-.8.5-.8 1-.8zM4.7 4.5c-.5 0-1-.3-1-.8s.5-.8 1-.8.8.3.8.8c-.1.4-.4.8-.8.8z"/></g></svg>';
    }

    // Youku
    for (i = 0; i < icon34.length; ++i) {
      icon34[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.9 12.9"><path fill="#004B87" d="M8 0c-.2 0-.5.1-.7.2-.6.4-.8 1.5-1.2 2.3-.4.8-.7 1.7-1.1 2.4C4 3.7 3.3 1.2 2.1.2 1.7-.1.8-.1.5.2c-1 .8 0 2.2.4 2.9.9 1.6 2 3.3 2.7 4.8-.5 1.4-3.1 5.2.4 5 .8-.5 1.2-1.7 1.6-2.7.9-2.1 1.7-3.9 2.7-6C8.7 3.3 9.6 2 9.4 1 9.3.4 8.7 0 8 0zm8.4.8c-.5 0-1 .2-1.2.7-.4.4-.7.8-1.2 1.2-.2.2-.4.5-.7.7-.3.2-.5.6-.9.8V1.8c0-1.3-2.4-1.3-2.4 0v6.7c.1.5.3.8.9.9h.7c.5-.1.8-.4.9-.9V7.1c0-.5-.1-1.4.2-.9.5.5 1.2 1 1.8 1.6.6.6 1.2 1.4 1.8 1.6 1.3.3 1.9-1 1.4-1.9-.5-1-2-1.6-2.6-2.4.4-1 2.7-1.6 2.6-3.3-.1-.7-.7-1-1.3-1z"/></svg>';
    }

    // Medblog
    for (i = 0; i < icon35.length; ++i) {
      icon35[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 15.2"><path fill="#004B87" d="M14.1 5.9c0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3c.7 0 1.3.6 1.3 1.3m-3.7 0c0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3c.7 0 1.3.6 1.3 1.3m-3.7 0c0 .7-.6 1.3-1.3 1.3s-1.2-.6-1.2-1.3.6-1.3 1.3-1.3 1.2.6 1.2 1.3M18.1 11V.7s0-.7-.7-.7H.8S.1 0 .1.7V11s0 .7.7.7h5L4.3 15l6.4-3.3h6.7c-.1 0 .7 0 .7-.7"/></svg>';
    }

    // QQ Live
    for (i = 0; i < icon36.length; ++i) {
      icon36[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.2 15"><path fill="#004B87" d="M2.5 7.5c0-.1 0-2.6.1-3.5 0-.6.1-1.5.3-2.3-.4-.1-.8-.1-1-.1-.7 0-1 .3-1.2.7s-.4 2-.5 2.6v2.6c0 .2 0 1.5.1 2.6.1.6.3 2.2.5 2.6.2.4.5.7 1.2.7.2 0 .5 0 .9-.1-.2-.8-.3-1.7-.3-2.3-.2-1-.1-3.4-.1-3.5z"/><path fill="#004B87" d="M16.1 7.5c0-.6-.5-1-1-1.6-.3-.3-1.9-1.8-3.9-3.2C9.7 1.7 8.5 1 6.7.4 5-.2 4.1-.1 3.5.4c-.3.2-.5.7-.7 1.3.8.1 1.9.4 2.9.9 1.7.6 3.2 1.4 4.3 2s2.1 1.3 2.5 1.7c.3.4.5.5.5 1.2 0 .6-.2.8-.6 1.2-.4.4-1.4 1.1-2.4 1.7-1 .6-2.6 1.4-4.2 2.1-1.1.5-2.2.7-2.9.9.1.6.3 1 .6 1.3.6.5 1.5.6 3.2 0 1.7-.6 3-1.3 4.5-2.3 2-1.3 3.6-2.9 3.9-3.2.6-.7 1-1.1 1-1.7z"/><path fill="#004B87" d="M9.5 7.5c0-.2-.2-.4-.4-.6L5.2 4.3c-.2-.1-.5 0-.5.1-.1.2-.1.5-.1.5v5.2s0 .3.1.5c.1.1.3.2.6.1.2-.2 3.8-2.7 3.8-2.7.2-.1.4-.3.4-.5z"/></svg>';
    }
	}

	return {
		// declare which properties and methods are supposed to be public
		init: init
	}
}();

document.addEventListener('DOMContentLoaded', function() {

  SVG.init()

});
