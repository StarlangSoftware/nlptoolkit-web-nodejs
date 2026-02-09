import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {SimpleDeasciifier} from "nlptoolkit-deasciifier/source/SimpleDeasciifier";

let fsm = new FsmMorphologicalAnalyzer()
let deasciifier = new SimpleDeasciifier(fsm)

document.getElementById('deasciifier').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = deasciifier.deasciify(sentence).toWords()
})