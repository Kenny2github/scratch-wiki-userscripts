// ==UserScript==
// @name         Cite This Post
// @namespace    https://github.com/Kenny2github
// @version      0.5
// @description  Get a forum archive reference in the correct format copied in just a couple clicks!
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/citepost.user.js
// @match        https://scratcharchive.asun.co/forums/viewtopic.php*
// @grant        none
// ==/UserScript==

if (window.location.hostname == 'scratcharchive.asun.co') {
    document.querySelectorAll('div.blockpost').forEach(function(i){
        var cite = document.createElement('a');
        cite.href = '#';
        cite.innerHTML = 'Cite this post&nbsp;';
        cite.style.float = 'right';
        cite.onclick = function(){
            var id = i.id; //id of div
            var username = document.querySelector(`#${id} > div > div > div.postleft > dl > dt > strong > a`).innerHTML; //username of poster
            var datem = this.previous().innerHTML.match(/(\d+)-(\d+)-(\d+)/); //match date
            var date = datem[3].replace(/^0*/,'') + '/' + datem[2].replace(/^0*/,'') + '/' + datem[1].replace(/^0*/, ''); //piece date together from match
            var sel = window.getSelection() + ''; //cast selection to string
            var defquote;
            if (i.classList.contains('firstpost')) {
                defquote = document.querySelector(`#${id} > div > div > div.postright > h3`).textContent + '[title]';
            } else {
                defquote = document.querySelector(`#${id} > div > div > div.postright > div.postmsg`).children[0].innerText.split('\n')[0];
            }
            var quote = sel ? sel : defquote; //selection or title
            var tid = window.location.href.split('?', 2)[1].match(/id=(\d+)/)[1];
            var post = i.classList.contains('firstpost') ? `[[ar-topic:${tid}]]` : `[[ar-post:${id.substr(1)}]]`;
            var ref = `{{cite post|${username}|${date}|${quote}|${post}}}`; //piece reference together
            //copy reference to clipboard
            var temp = document.createElement('textarea');
            temp.textContent = ref;
            document.body.appendChild(temp);
            temp.select();
            var ret;
            try {
                document.execCommand('copy');
                ret = 'Copied.';
            } catch (err) {
                ret = 'Failed to copy.';
            }
            alert(ret);
            document.body.removeChild(temp);
            return false; //return false to avoid weird scrolling
        };
        i.children[0].children[0].appendChild(cite);
    });
}
