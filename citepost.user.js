// ==UserScript==
// @name         Cite This Post
// @namespace    https://github.com/Kenny2github
// @version      0.3
// @description  get a reference in the correct format copied in just a couple clicks!
// @author       Kenny2github
// @match        https://scratcharchive.asun.co/forums/viewtopic.php*
// @grant        none
// ==/UserScript==

if (window.location.hostname == 'scratcharchive.asun.co') {
    document.querySelectorAll('div.blockpost').forEach(function(i){
        cite = document.createElement('a');
        cite.href = '#';
        cite.innerHTML = 'Cite this post&nbsp;';
        cite.style.float = 'right';
        cite.onclick = function(){
            id = i.id; //id of div
            username = document.querySelector('#' + id + ' > div > div > div.postleft > dl > dt > strong > a').innerHTML; //username of poster
            datem = this.previous().innerHTML.match(/(\d+)-(\d+)-(\d+)/); //match date
            date = '(' + datem[3].replace(/^0*/,'') + '/' + datem[2].replace(/^0*/,'') + '/' + datem[1].replace(/^0*/, '') + ')'; //piece date together from match
            sel = window.getSelection() + ''; //cast selection to string
            if (i.classList.contains('firstpost')) {
                defquote = document.querySelector('#' + id + ' > div > div > div.postright > h3').textContent + '[title]';
            } else {
                defquote = document.querySelector('#' + id + ' > div > div > div.postright > div.postmsg').children[0].innerText.split('\n')[0];
            }
            quote = sel ? sel : defquote; //selection or title
            ref = username + '. ' + date + '. "' + quote + '" '; //piece reference together
            //copy reference to clipboard
            temp = document.createElement('textarea');
            temp.textContent = ref;
            document.body.appendChild(temp);
            temp.select();
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
