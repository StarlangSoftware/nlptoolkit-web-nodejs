import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {Sentence} from "nlptoolkit-corpus";

function createMorphologicalAnalysisTable(sentence){
    let s = new Sentence(sentence);
    let analyzedSentence = fsm.morphologicalAnalysisFromSentence(s);
    let display = "<table> <tr> <th>Word</th> <th>Morphological Analyses</th> </tr>";
    for (let i = 0; i < s.wordCount(); i++) {
        display = display + "<tr><td>" + s.getWord(i).getName() + "</td><td>"
        let fsmParseList = analyzedSentence[i]
        for (let j = 0; j < fsmParseList.size(); j++) {
            if (j !== 0){
                display = display + " "
            }
            display = display + fsmParseList.getFsmParse(j).getFsmParseTransitionList()
        }
        display = display + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

let fsm = new FsmMorphologicalAnalyzer()

document.getElementById('morphologicalAnalysis').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createMorphologicalAnalysisTable(sentence);
})