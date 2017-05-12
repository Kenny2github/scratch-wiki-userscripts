// ==UserScript==
// @name         Wiki Welcome
// @namespace    http://github.com/Kenny2github
// @version      0.1
// @description  Give new users some love!
// @author       You
// @match        https://wiki.scratch.mit.edu/w/index.php?title=User_talk:*&action=edit&section=new
// ==/UserScript==

var welcomeMessage = '{{User:'+document.getElementById('pt-userpage').getElementsByTagName('a')[0].innerHTML+'/Welcome}}';
function elem(id) {
    return document.getElementById(id);
}
elem('wpSummary').onblur = function(){
    if (elem('wpSummary').value === 'Welcome!') {
        elem('wpTextbox1').value = welcomeMessage + '~~~~';
        elem('wpSave').click();
    }
};
