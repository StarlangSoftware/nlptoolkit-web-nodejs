import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {Sentence} from "nlptoolkit-corpus";
import {LongestRootFirstDisambiguation} from "nlptoolkit-morphologicaldisambiguation";

function createMorphologicalDisambiguationTable(sentence){
    let s = new Sentence(sentence);
    let analyzedSentence = fsm.robustMorphologicalAnalysisFromSentence(s);
    let disambiguatedSentence = disambiguator.disambiguate(analyzedSentence)
    let display = "<table> <tr> <th>Word</th> <th>Morphological Analysis</th> </tr>";
    for (let i = 0; i < disambiguatedSentence.length; i++) {
        display = display + "<tr><td>" + s.getWord(i).getName() + "</td>"
        display = display + "<td>" + disambiguatedSentence[i].getFsmParseTransitionList() + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

let fsm = new FsmMorphologicalAnalyzer()
let disambiguator = new LongestRootFirstDisambiguation()

document.getElementById('morphologicalDisambiguation').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createMorphologicalDisambiguationTable(sentence);
})