// ==UserScript==
// @name         Canned Edit Summaries
// @version      0.3
// @description  Insert pre-made edit summaries at the click of a button!
// @author       Kenny2scratch
// @updateURL    https://github.com/Kenny2github/scratch-wiki-userscripts/raw/master/cannedsummaries.user.js
// @match        https://en.scratch-wiki.info/wiki/*
// @match        https://en.scratch-wiki.info/w/*
// ==/UserScript==

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function done(settings) {
    var summs = settings.split(';;');
    var lab = document.getElementById('wpSummaryLabel');
    lab.innerHTML = '';

    var label = document.createElement('label');
    label.innerHTML = 'Summary:';
    label.for = 'wpSummary';
    label.addEventListener('click',function(e){askForSummary("Add an edit summary below.");});
    lab.appendChild(label);

    summs.filter(function(i){
        return i.trim() !== '';
    }).forEach(function(i){
        var summ = document.createElement('code');
        summ.style.margin = '0.5em';
        summ.style.borderRadius = '2px';
        summ.style.border = '1px solid #d9dbe0';
        summ.style.backgroundColor = 'f8f9fa';
        summ.style.padding = '1px 4px';
        summ.title = 'Insert canned edit summary';
        summ.onclick = function(){
            document.getElementById('wpSummary').value = this.innerHTML + ') ([[User:Kenny2scratch/Project Guides/Canned Edit Summaries|canned edit summary]]';
            document.getElementById('wpSave').click();
        };
        summ.innerHTML = i;
        lab.appendChild(summ);
    });
}
function askForSummary(message) {
    var dim = document.createElement('div');
    dim.style.width = '100%'; dim.style.height = '100%';
    dim.style.position = 'fixed';
    dim.style.left = '0'; dim.style.top = '0';
    dim.style.backgroundColor = 'rgba(0,0,0,0.5)';
    dim.style.zIndex = '800';

    var box = document.createElement('div');
    box.style.borderRadius = '5px';
    box.style.backgroundColor = '#efefef';
    box.style.border = '1px solid #dedede';
    box.style.width = '20em'; box.style.height = '10em';
    box.style.position = 'fixed';
    box.style.left = '45%'; box.style.top = '45%';
    box.style.zIndex = '801';

    var content = document.createElement('p');
    content.innerHTML = message + ' ';
    var dismiss = document.createElement('a');
    dismiss.href = '#';
    dismiss.onclick = function(){
        dim.style.display = 'none';
        box.style.display = 'none';
        done(summaries);
        return false;
    };
    dismiss.innerHTML = '(dismiss)';
    content.appendChild(dismiss);

    var input = document.createElement('input');
    input.type = 'text';
    input.style.width = '19em';
    input.style.margin = '1em';
    input.placeholder = 'Enter an edit summary to can';
    input.onkeypress = function(e){
        if (!e) e = window.event;
        if (e.key == 'Enter') {
            summaries += this.value + ';;';
            window.localStorage.setItem('cannedSummaries', summaries);
            dismiss.click();
        }
    };

    var del = document.createElement('a');
    del.href = '#';
    del.style.color = 'red';
    del.innerHTML = 'Delete all of your canned edit summaries';
    del.onclick = function(){
        summaries = '';
        window.localStorage.removeItem('cannedSummaries');
        dismiss.click();
        return false;
    };

    box.appendChild(content);
    box.appendChild(input);
    box.appendChild(del);

    document.body.appendChild(dim);
    document.body.appendChild(box);
}
if (['edit', 'submit'].includes(getQueryVariable('action')) && getQueryVariable('section') != 'new') {
    summaries = window.localStorage.getItem('cannedSummaries');
    if (summaries === null) {
        summaries = '';
        askForSummary("You don't have any canned edit summaries! Type one in the box below and press Enter to add one.");
    } else {
        done(summaries);
    }
    window.addEventListener('keypress', function(e){
        if (!e) e = window.event;
        key = e.keyCode || e.which;
        if (e.ctrlKey && e.shiftKey && key == 19) {
            askForSummary("Add an edit summary below.");
        }
    });
}
