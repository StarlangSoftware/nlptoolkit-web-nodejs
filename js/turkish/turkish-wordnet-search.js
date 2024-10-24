function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../js/wordnet-search.js');
let turkishWordNet = new WordNet();

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    let display = "<h1>2020</h1><br>" + createTableForWordSearch(word, turkishWordNet);
    display = display + "<br><h1>1901</h1><br>" + createTableForWordSearch(word, turkishWordNet0);
    display = display + "<br><h1>1944</h1><br>" + createTableForWordSearch(word, turkishWordNet1);
    display = display + "<br><h1>1955</h1><br>" + createTableForWordSearch(word, turkishWordNet2);
    display = display + "<br><h1>1959</h1><br>" + createTableForWordSearch(word, turkishWordNet3);
    display = display + "<br><h1>1966</h1><br>" + createTableForWordSearch(word, turkishWordNet4);
    display = display + "<br><h1>1969</h1><br>" + createTableForWordSearch(word, turkishWordNet5);
    display = display + "<br><h1>1974</h1><br>" + createTableForWordSearch(word, turkishWordNet6);
    display = display + "<br><h1>1983</h1><br>" + createTableForWordSearch(word, turkishWordNet7);
    display = display + "<br><h1>1988</h1><br>" + createTableForWordSearch(word, turkishWordNet8);
    display = display + "<br><h1>1998</h1><br>" + createTableForWordSearch(word, turkishWordNet9);
    document.getElementById("result").innerHTML = display;
})

document.getElementById('synonymSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synonymWord = document.getElementById('synonymWord').value;
    let display = "<h1>2020</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet);
    display = display + "<br><h1>1901</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet0);
    display = display + "<br><h1>1944</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet1);
    display = display + "<br><h1>1955</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet2);
    display = display + "<br><h1>1959</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet3);
    display = display + "<br><h1>1966</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet4);
    display = display + "<br><h1>1969</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet5);
    display = display + "<br><h1>1974</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet6);
    display = display + "<br><h1>1983</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet7);
    display = display + "<br><h1>1988</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet8);
    display = display + "<br><h1>1998</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet9);
    document.getElementById("result").innerHTML = display;
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synsetId = document.getElementById('synset_id').value;
    let display = "<h1>2020</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet);
    display = display + "<br><h1>1901</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet0);
    display = display + "<br><h1>1944</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet1);
    display = display + "<br><h1>1955</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet2);
    display = display + "<br><h1>1959</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet3);
    display = display + "<br><h1>1966</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet4);
    display = display + "<br><h1>1969</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet5);
    display = display + "<br><h1>1974</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet6);
    display = display + "<br><h1>1983</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet7);
    display = display + "<br><h1>1988</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet8);
    display = display + "<br><h1>1998</h1><br>" + createTableForIdSearch(synsetId, turkishWordNet9);
    document.getElementById("result").innerHTML = display;
})
