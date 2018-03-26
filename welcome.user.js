// ==UserScript==
// @name         Wiki Welcome
// @namespace    http://github.com/Kenny2github
// @version      0.3
// @description  Give new users some love!
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/welcome.user.js
// @match        https://en.scratch-wiki.info/w/index.php?title=User_talk:*&action=edit&section=new
// ==/UserScript==

var welcomeMessage = '{{User:' + document.querySelector('span.profile-name').innerHTML + '/Welcome}}';
function elem(id) {
    return document.getElementById(id);
}
elem('wpSummary').onblur = function(){
    if (elem('wpSummary').value === 'Welcome!') {
        elem('wpTextbox1').value = welcomeMessage + '~~~~';
        elem('wpSave').click();
    }
};
