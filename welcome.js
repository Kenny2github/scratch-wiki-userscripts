// ==UserScript==
// @name         Wiki Welcome
// @namespace    http://Kenny2github.github.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://wiki.scratch.mit.edu/w/index.php?title=User_talk:*&action=edit&section=new
// @grant        none
// ==/UserScript==

var welcomeMessage = '{{User:'+document.getElementsByTagName('a')[61].innerHTML+'/Welcome}}'; //Replace this with your welcome message
function elem(id) {
    return document.getElementById(id);
}
elem('wpSummary').onblur = function(){
    if (elem('wpSummary').value === 'Welcome!') {
        elem('wpTextbox1').value = welcomeMessage + '~~~~';
        elem('wpSave').click();
    }
};
