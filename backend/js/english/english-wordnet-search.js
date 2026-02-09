function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('js/wordnet-search.js');
let englishWordNet = new WordNet("english_wordnet_version_31.xml");

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    document.getElementById("result").innerHTML = createTableForWordSearch(word, englishWordNet);
})

document.getElementById('synonymSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synonymWord = document.getElementById('synonymWord').value;
    document.getElementById("result").innerHTML = createTableForSynonymSearch(synonymWord, englishWordNet);
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synsetId = document.getElementById('synset_id').value;
    document.getElementById("result").innerHTML = createTableForIdSearch(synsetId, englishWordNet);
})
