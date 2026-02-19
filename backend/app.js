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
