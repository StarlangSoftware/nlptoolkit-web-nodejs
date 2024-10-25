import {SentiLiteralNet, SentiNet} from "nlptoolkit-sentinet";

let sentiNet = new SentiNet();
let sentiLiteralNet = new SentiLiteralNet();

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    let sentiLiteral = sentiLiteralNet.getSentiLiteral(word)
    document.getElementById("result").innerHTML = sentiLiteral.getPolarity();
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synSetId = document.getElementById('synset_id').value;
    let sentiSynSet = sentiNet.getSentiSynSet(synSetId)
    document.getElementById("result").innerHTML = sentiSynSet.getPolarity();
})
