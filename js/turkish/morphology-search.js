document.getElementById('morphologySearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    for (let i = 0; i < morphologicalDictionary.length; i++) {
        const wordObject = morphologicalDictionary[i];
        const wordName = wordObject["word"]
        const morphology = wordObject["morphology"]
        if (wordName === word) {
            document.getElementById("result").innerHTML = morphology;
            return;
        }
    }
    document.getElementById("result").innerHTML = word;
});
