document.getElementById('wordSearch').addEventListener('submit', async function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    const res = await fetch(`/turkish-dictionary-word-search/${encodeURIComponent(word)}`);
    const data = await res.json();
    document.getElementById("result").innerHTML = data.display;
});