// ==UserScript==
// @name         Bot Archiver
// @namespace    http://github.com/Kenny2github
// @version      0.2
// @description  Automatically move bot edits to archive
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/botarchive.user.js
// @match        https://en.scratch-wiki.info/w/index.php?title=User_talk:*&action=edit
// @match        https://en.scratch-wiki.info/wiki/User_talk:*/*
// ==/UserScript==
/* NOTE: THIS USERSCRIPT ASSUMES THAT THE BOT EDITS ARE ON THE BOTTOM OF THE PAGE.
IF THE BOT EDITS ARE NOT ON THE BOTTOM, YOU WILL REMOVE A REAL USER'S MESSAGE THAT
IS AT THE BOTTOM INSTEAD. IF THE BOTTOM EDIT IS NOT A BOT EDIT, INSTEAD OF PUTTING
"MOVING BOT EDITS TO ARCHIVE" YOU CAN INSTEAD PUT "MOVING BOT EDITS". THIS ENSURES
THAT YOUR MANUAL MOVE WILL NOT BE ACCIDENTALLY CARRIED OUT BY THIS SCRIPT. CONFIRM
THAT THE BOT EDIT IS AT THE BOTTOM WHEN THIS SCRIPT ASKS YOU TO IF YOU FORGET THIS
NOTE. PLEASE ALSE CONFIRM THAT THE ARCHIVEPAGE VARIABLE IS SET TO YOUR BOT ARCHIVE
PAGE, AND NOT MINE AS IT IS HERE, OR YOUR BOT EDITS WILL GO TO MY ARCHIVE. WAIT!!!
DON'T GO YET! ONE LAST THING: THIS ASSUMES THAT THE BOT EDITS WILL ALWAYS HAVE ONE
OF THE THREE TITLES YOU CAN SEE IN THE SCRIPT. CHANGE THEM IF THEY'RE CHANGED.  */
var archivePage = 'User_talk:Kenny2scratch/Bot_Archive'; //Replace this with your bot archive page
function elem(id) {
    return document.getElementById(id);
}
if ((window.location.pathname === '/w/index.php') && (window.location.search == '?title=' + archivePage + '&action=edit')){
    elem('wpTextbox1').value = elem('wpTextbox1').value + sessionStorage.getItem('botedit');
    elem('wpSummary').value = 'Moved bot edits to archive';
    elem('wpSave').click();
} else {
    elem('wpSummary').onblur = function(){
        if (elem('wpSummary').value === 'Moving bot edits to archive') {
            if (elem('wpTextbox1').value.includes('== Please categorize new pages ==')) {
                title = '== Please categorize new pages ==';
            } else if (elem('wpTextbox1').value.includes('== Please remember to sign your posts ==')) {
                title = '== Please remember to sign your posts ==';
            } else if (elem('wpTextbox1').value.includes("== Please don't make several edits in a short amount of time ==")) {
                title = "== Please don't make several edits in a short amount of time ==";
            }
            var botedit = title + elem('wpTextbox1').value.split(title)[elem('wpTextbox1').value.split(title).length-1];
            sessionStorage.setItem('botedit', botedit);
            elem('wpTextbox1').value = elem('wpTextbox1').value.split(title).slice(0, -1).join('');
            if (confirm('Are you sure that the last edit on this talk page is a bot edit? You could be removing a real user\'s edit instead.')){
                elem('wpSave').click();
            }
        }
    };
}
