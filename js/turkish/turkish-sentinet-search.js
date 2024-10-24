function displaySentiment(sentiNetObject){
    if (sentiNetObject["pscore"] > sentiNetObject["nscore"]){
        return "Positive with score " + sentiNetObject["pscore"]
    } else {
        if (sentiNetObject["pscore"] < sentiNetObject["nscore"]){
            return "Negative with score " + sentiNetObject["nscore"]
        } else {
            return "Neutral"
        }
    }
}

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    for (let i = 0; i < turkishSentiLiteralNet.length; i++) {
        const sentiNetObject = turkishSentiLiteralNet[i];
        if (sentiNetObject["word"] === word) {
            document.getElementById("result").innerHTML = displaySentiment(sentiNetObject);
            break;
        }
    }
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synsetId = document.getElementById('synset_id').value;
    for (let i = 0; i < turkishSentiNet.length; i++) {
        const sentiNetObject = turkishSentiNet[i];
        if (sentiNetObject["id"] === synsetId) {
            document.getElementById("result").innerHTML = displaySentiment(sentiNetObject);
            break;
        }
    }
})
