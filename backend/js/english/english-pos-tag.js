import {NaivePosTagger, PosTaggedCorpus, PosTaggedWord} from "nlptoolkit-postagger";
import {Sentence} from "nlptoolkit-corpus";

let posTagger = new NaivePosTagger()
let posTaggedCorpus = new PosTaggedCorpus("brown.txt")
posTagger.train(posTaggedCorpus)

function createPosTableForSentence(sentence){
    let display = "<table> <tr> <th>Word</th> <th>Tag(s)</th> </tr>";
    let s = Sentence(sentence.toLowerCase())
    let annotatedSentence = posTagger.posTag(s)
    for (let i = 0; i < annotatedSentence.wordCount(); i++) {
        let posTaggedWord = annotatedSentence.getWord(i)
        if (posTaggedWord instanceof PosTaggedWord){
            display = display + "<tr><td>" + posTaggedWord.getName() + "</td><td>" + posTaggedWord.getTag() + "</td></tr>"
        } else {
            display = display + "<tr><td>" + posTaggedWord.getName() + "</td><td>UNK</td></tr>"
        }
    }
    display = display + "</table>"
    return display
}

document.getElementById('posTag').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createPosTableForSentence(sentence);
})