let morphologySearchButton = document.getElementById('morphologySearch');
if (morphologySearchButton) {
    morphologySearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const word = document.getElementById('morphologySearchWord').value;
        const res = await fetch(`/turkish-morphology-search/${encodeURIComponent(word)}`);
        const data = await res.json();
        document.getElementById("morphologySearchResult").innerHTML = data.display;
    });
}
let wordSearchButton = document.getElementById('wordSearch');
if (wordSearchButton) {
    wordSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const word = document.getElementById('dictionarySearchWord').value;
        const res = await fetch(`/turkish-dictionary-word-search/${encodeURIComponent(word)}`);
        const data = await res.json();
        document.getElementById("wordSearchResult").innerHTML = data.display;
    });
}
let frameSearchButton = document.getElementById('frameSearch');
if (frameSearchButton) {
    frameSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('frameName').value;
        const res = await fetch(`/turkish-frame-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("frameNetResult").innerHTML = data.display;
    });
}
let frameNetVerbSearchButton = document.getElementById('frameNetVerbSearch');
if (frameNetVerbSearchButton) {
    frameNetVerbSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('verbName').value;
        const res = await fetch(`/turkish-framenet-verb-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("frameNetResult").innerHTML = data.display;
    });
}
let frameNetIdSearchButton = document.getElementById('frameNetIdSearch');
if (frameNetIdSearchButton) {
    frameNetIdSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('verbId').value;
        const res = await fetch(`/turkish-framenet-verb-id-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("frameNetResult").innerHTML = data.display;
    });
}
let propBankVerbSearchButton = document.getElementById('propBankVerbSearch');
if (propBankVerbSearchButton) {
    propBankVerbSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('verbName').value;
        const res = await fetch(`/turkish-propbank-verb-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("propBankResult").innerHTML = data.display;
    });
}
let propBankIdSearchButton = document.getElementById('propBankIdSearch');
if (propBankIdSearchButton) {
    propBankIdSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('verbId').value;
        const res = await fetch(`/turkish-propbank-verb-id-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("propBankResult").innerHTML = data.display;
    });
}
