// ==UserScript==
// @name         Account Request Messages
// @namespace    http://github.com/Kenny2github
// @version      0.2
// @description  Some canned comments for account request responses
// @author       Kenny2github
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/acr.user.js
// @match        https://en.scratch-wiki.info/w/index.php?title=Special:ConfirmAccounts/authors&acrid=*
// ==/UserScript==

var form = document.getElementsByName('accountconfirm')[0];
var fieldset = document.createElement('fieldset');
var legend = document.createElement('legend');
var username = document.querySelector('#mw-content-text > form > fieldset:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > a');
legend.innerHTML = 'Messages';
fieldset.appendChild(legend);
const MSGS = [
    ["Hi there, $name! Your account on the Scratch Wiki has been approved! You may log in with your Scratch username and a password sent to your email at https://en.scratch-wiki.info/wiki/Special:UserLogin Also, please read the following intro pages: https://en.scratch-wiki.info/wiki/S:WELCOME https://en.scratch-wiki.info/wiki/S:GUIDES https://en.scratch-wiki.info/wiki/S:FAQ Have fun! If you're not sure about something, just ask me for help.", "yes"],
    ["Hi, $name. Unfortunately, your account request on the Scratch Wiki couldn't be approved because your request showed that you didn't read https://en.scratch-wiki.info/wiki/S:CONTRIB completely before requesting. If you think you did read it or have other questions, read https://en.scratch-wiki.info/wiki/S:WHYREJECT for some answers. This decision is final. You'll need to request again if you still want an account. You'll be able to request again in around a week.", "yes"],
    ["Hi, $name. Thanks for your Scratch Wiki account request! You did well, pointing out flaws - and you even got the secret word, well done! But you forgot the second part. The S:CONTRIB page says to suggest two things to add to the flawed article, from two different categories. I didn't see those anywhere in the request. So could you comment those suggestions here? Then you should be good to go. Thanks!", "yes"],
    ["Hi there, $name. Thanks for your Scratch Wiki account request, and thank you for pointing out those flaws and suggesting those things to add! However, there's one last thing you missed. The S:CONTRIB page says to add a special something so we know you read the page. Could you tell me what that is? Then you should be good to go. Thanks!", "yes"],
    ["Thanks, that's all I needed. Your account on the Scratch Wiki has been approved! You may log in with your Scratch username and a password sent to your email at https://en.scratch-wiki.info/wiki/Special:UserLogin Also, please read the following intro pages: https://en.scratch-wiki.info/wiki/S:WELCOME https://en.scratch-wiki.info/wiki/S:GUIDES https://en.scratch-wiki.info/wiki/S:FAQ Have fun! If you're not sure about something, just ask me for help.", "no"]
];
function clicker() {
    this.select();
    try {
        const success = document.execCommand('copy');
        if (!success) {
            alert('Failed to copy message.');
        }
    } catch (err) {
        alert('Failed to copy message (error occurred).');
    }
    if (this.dataset.open === "yes") {
        open(username.href);
    }
};
for (let msg of MSGS) {
    let msgarea = document.createElement('textarea');
    msgarea.readOnly = true;
    msgarea.innerText = msg[0].replace('$name', username.innerHTML);
    msgarea.addEventListener('click', clicker);
    msgarea.dataset.open = msg[1];
    fieldset.appendChild(msgarea);
}
form.insertBefore(fieldset, form.children[1]);
