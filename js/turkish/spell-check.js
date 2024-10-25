import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {SimpleSpellChecker} from "nlptoolkit-spellchecker";
import {Sentence} from "nlptoolkit-corpus";

function createSpellCheckTable(sentence){
    let s = new Sentence(sentence);
    let spellCheckedSentence = simpleSpellChecker.spellCheck(s);
    let display = "<table> <tr> <th>Word</th> <th>Correct</th> </tr>";
    for (let i = 0; i < spellCheckedSentence.wordCount(); i++) {
        display = display + "<tr><td>" + s.getWord(i).getName() + "</td>"
        if (s.getWord(i).getName() !== spellCheckedSentence.getWord(i).getName()) {
            display = display + "<td style=\"color:Red;\">" + spellCheckedSentence.getWord(i).getName() + "</td>"
        } else {
            display = display + "<td>" + word + "</td>"
        }
        display = display + "</tr>"
    }
    display = display + "</table>"
    return display
}

let fsm = new FsmMorphologicalAnalyzer()
let simpleSpellChecker = new SimpleSpellChecker(fsm)

document.getElementById('spellCheck').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createSpellCheckTable(sentence);
})