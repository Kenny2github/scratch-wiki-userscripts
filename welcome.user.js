// ==UserScript==
// @name         Wiki Welcome
// @namespace    http://github.com/Kenny2github
// @version      0.4
// @description  Give new users some love!
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/welcome.user.js
// @match        https://en.scratch-wiki.info/w/index.php?title=User_talk:*&action=edit&section=new
// ==/UserScript==

function elem(id) {
    return document.getElementById(id);
}
function mouse(e) {
    e.preventDefault();
    mw.toolbar.insertTags('{{User:' + mw.user.getName() + '/Welcome', '}}~~~~', '');
    setTimeout(function(){
        window.removeEventListener('click', mouse); //remove first or the wpSave click is handled too
        elem('wpSave').click();
    }, 50);
}
elem('wpSummary').onblur = function(e){
    if (elem('wpSummary').value === 'Welcome!') {
        window.addEventListener('click', mouse);
    }
};
