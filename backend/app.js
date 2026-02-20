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
let sentiNetWordSearchButton = document.getElementById('sentiNetWordSearch');
if (sentiNetWordSearchButton) {
    sentiNetWordSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('sentiNetWord').value;
        const res = await fetch(`/sentinet-word-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("sentiNetResult").innerHTML = data.display;
    });
}
let sentiNetIdSearchButton = document.getElementById('sentiNetIdSearch');
if (sentiNetIdSearchButton) {
    sentiNetIdSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('sentiNetSynSetId').value;
        const res = await fetch(`/sentinet-id-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("sentiNetResult").innerHTML = data.display;
    });
}
let turkishWordNetWordSearchButton = document.getElementById('turkishWordNetWordSearch');
if (turkishWordNetWordSearchButton) {
    turkishWordNetWordSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('turkishWordNetWord').value;
        const res = await fetch(`/turkish-wordnet-word-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("turkishWordNetResult").innerHTML = data.display;
    });
}
let turkishWordNetSynonymSearchButton = document.getElementById('turkishWordNetSynonymSearch');
if (turkishWordNetSynonymSearchButton) {
    turkishWordNetSynonymSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('turkishWordNetSynonym').value;
        const res = await fetch(`/turkish-wordnet-synonym-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("turkishWordNetResult").innerHTML = data.display;
    });
}
let turkishWordNetIdSearchButton = document.getElementById('turkishWordNetIdSearch');
if (turkishWordNetIdSearchButton) {
    turkishWordNetIdSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('turkishWordNetSynSetId').value;
        const res = await fetch(`/turkish-wordnet-id-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("turkishWordNetResult").innerHTML = data.display;
    });
}
let englishWordNetWordSearchButton = document.getElementById('englishWordNetWordSearch');
if (englishWordNetWordSearchButton) {
    englishWordNetWordSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('englishWordNetWord').value;
        const res = await fetch(`/english-wordnet-word-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("englishWordNetResult").innerHTML = data.display;
    });
}
let englishWordNetSynonymSearchButton = document.getElementById('englishWordNetSynonymSearch');
if (englishWordNetSynonymSearchButton) {
    englishWordNetSynonymSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('englishWordNetSynonym').value;
        const res = await fetch(`/english-wordnet-synonym-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("englishWordNetResult").innerHTML = data.display;
    });
}
let englishWordNetIdSearchButton = document.getElementById('englishWordNetIdSearch');
if (englishWordNetIdSearchButton) {
    englishWordNetIdSearchButton.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.getElementById('englishWordNetSynSetId').value;
        const res = await fetch(`/english-wordnet-id-search/${encodeURIComponent(input)}`);
        const data = await res.json();
        document.getElementById("englishWordNetResult").innerHTML = data.display;
    });
}

