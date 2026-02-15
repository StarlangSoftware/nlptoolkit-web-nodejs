document.getElementById('wordSearch').addEventListener('submit', async function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    const res = await fetch(`/api/turkish-dictionary-word-search/${word}`);
    const data = await res.json();

    document.getElementById("result").innerHTML =
        JSON.stringify(data, null, 2);
});