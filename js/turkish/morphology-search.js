import {TxtDictionary, TxtWord} from "nlptoolkit-dictionary";

let turkishDictionary = new TxtDictionary();

document.getElementById('morphologySearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    let txtWord = turkishDictionary.getWord(word)
    if (txtWord !== undefined) {
        document.getElementById("result").innerHTML = txtWord.getMorphology();
    } else {
        document.getElementById("result").innerHTML = word;
    }
});
