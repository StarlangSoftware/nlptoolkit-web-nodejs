import {WordNet} from "nlptoolkit-wordnet";
import {FrameNet} from "nlptoolkit-framenet";

function displayLexicalUnits(display, frame){
    for (let j = 0;  j < frame.lexicalUnitSize(); j++) {
        let lexicalUnit = frame.getLexicalUnit(j)
        let synset = turkishWordNet.getSynSetWithId(lexicalUnit)
        if (synset != null) {
            display = display + "<tr><td>" + synset.getId() + "</td><td>";
            display = createSynonym(display, -1, synset) + "</td><td>" + synset.getDefinition() + "</td></tr>"
        }
    }
    return display
}

function createFrameTable(frameName) {
    let display = "Lexical Units <br> <table> <tr> <th>Id</th> <th>Words</th> <th>Definition</th> </tr>";
    for (let i = 0; i < frameNet.size(); i++) {
        let frame = frameNet.getFrame(i)
        if (frame.getName() === frameName) {
            display = displayLexicalUnits(display, frame)
            break;
        }
    }
    display = display + "</table> <br>"
    display = display + "Frame Elements <br> <table> <th>Element</th> </tr>";
    for (let i = 0; i < frameNet.size(); i++) {
        let frame = frameNet.getFrame(i)
        if (frame.getName() === frameName) {
            for (let j = 0; j < frame.frameElementSize(); j++) {
                let frameElement = frame.getFrameElement(j)
                display = display + "<tr><td>" + frameElement + "</td></tr>"
            }
            break;
        }
    }
    display = display + "</table>"
    return display
}

function createTableOfFrames(frames) {
    let display = "<table> <tr> <th>Frame</th> <th>Lexical Units</th> <th>Frame Elements</th> </tr>";
    for (let frame of frames) {
        display = display + "<tr><td>" + frame.getName() + "</td><td><table> <tr> <th>Id</th> <th>Words</th> <th>Definition</th> </tr>";
        display = displayLexicalUnits(display, frame) + "</table></td><td>"
        for (let j = 0; j < frame.frameElementSize(); j++) {
            let frameElement = frame.getFrameElement(j)
            display = display + " " + frameElement;
        }
        display = display + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

function frameListContains(frames, frame){
    for (let current of frames) {
        if (current.getName() === frame.getName()){
            return true
        }
    }
    return false
}

function getFramesForSynSets(synsets) {
    let result = []
    for (let synset of synsets) {
        let current = frameNet.getFrames(synset.getId());
        for (let frame of current) {
            if (!frameListContains(result, frame)){
                result.push(frame)
            }
        }
    }
    return result
}

let turkishWordNet = new WordNet();
let frameNet = new FrameNet()

document.getElementById('frameSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const frameName = document.getElementById('frame_name').value;
    document.getElementById("result").innerHTML = createFrameTable(frameName);
})

document.getElementById('verbSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbName = document.getElementById('verb_name').value;
    let synsets = turkishWordNet.getSynSetsWithLiteral(verbName)
    let frames = getFramesForSynSets(synsets)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    let frames = frameNet.getFrames(verbId)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})
