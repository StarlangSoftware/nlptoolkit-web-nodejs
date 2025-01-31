import {WordNet} from "nlptoolkit-wordnet";

function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('js/wordnet-search.js');
let turkishWordNet = new WordNet();
let years = ["1901", "1944", "1955", "1959", "1966", "1969", "1974", "1983", "1988", "1998"]
let turkishWordNets = new WordNet[years.length]
for (let i = 0; i < years.length; i++) {
    turkishWordNets[i] = new WordNet("turkish" + years[i] + "_wordnet.xml", "tr");
}

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    let display = "<h1>2020</h1><br>" + createTableForWordSearch(word, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForWordSearch(word, turkishWordNets[i]);
    }
    document.getElementById("result").innerHTML = display;
})

document.getElementById('synonymSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synonymWord = document.getElementById('synonymWord').value;
    let display = "<h1>2020</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNets[i]);
    }
    document.getElementById("result").innerHTML = display;
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synsetId = document.getElementById('synset_id').value;
    let display = "<h1>2020</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForIdSearch(synsetId, turkishWordNets[i]);
    }
    document.getElementById("result").innerHTML = display;
})
