// ==UserScript==
// @name         Siggy Warner
// @namespace    http://github.com/Kenny2github
// @version      0.3
// @description  This userscript reminds users to add signatures.
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/sigwarn.user.js
// @match        https://en.scratch-wiki.info/w/index.php?*
// ==/UserScript==

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var wpSave = document.getElementById('wpSave');
function save() {
    wpSave.click();
}
if (getParameterByName('title').toLowerCase().includes('talk')) {
    wpSave.type = 'button';
    if (document.getElementById('wpTextbox1').parentElement.innerHTML.includes('~~~~') !== true){ //work around CodeMirror taking over the textarea with a separate div
        if (getParameterByName('action') === 'submit') {
            document.getElementById('wikiPreview').innerHTML = '<div><h2>Warning</h2><p style="color:#cc0000;text-indent:40px"><b>You have not put your signature anywhere!</b> Please fix this by adding four tildas (<code>~~~~</code>) to the end of your post. <a href="#editform">→ Go to editing area</a></p><hr></div>' + document.getElementById('wikiPreview').innerHTML;
        }
        wpSave.onclick = function(){
            wpSave.type = 'submit';
            if ((document.getElementById('wpTextbox1').value.includes('~~~~') !== true) && (document.getElementById('wpMinoredit').checked === false)){
                if (prompt("Wait! You haven't added a signature yet! Please use four tildas (~~~~) to sign. Type CONFIRM in all caps to skip adding a signature") === "CONFIRM") {
                    wpSave.onclick = undefined;
                    save();
                } else {
                    wpSave.type = 'button';
                }
            }
        };
    } else {
        wpSave.type = 'submit';
    }
}
