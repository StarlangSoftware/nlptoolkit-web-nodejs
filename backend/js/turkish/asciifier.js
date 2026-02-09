import {SimpleAsciifier} from "nlptoolkit-deasciifier";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";

let fsm = new FsmMorphologicalAnalyzer()
let asciifier = new SimpleAsciifier(fsm)

document.getElementById('asciifier').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = asciifier.asciify(sentence).toWords()
})