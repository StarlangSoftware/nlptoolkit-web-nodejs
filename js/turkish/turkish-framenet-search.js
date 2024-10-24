function createFrameTable(frameName) {
    let display = "Lexical Units <br> <table> <tr> <th>Id</th> <th>Words</th> <th>Definition</th> </tr>";
    for (let i = 0; i < turkishFrameNet.length; i++) {
        let frame = turkishFrameNet[i];
        if (frame["frame"] === frameName) {
            let lexicalUnits = frame["lexicalUnits"];
            for (let lexicalUnit of lexicalUnits) {
                let synset = getSynsetWithIdBinarySearch(lexicalUnit, turkishWordNet)
                if (synset != null) {
                    display = display + "<tr><td>" + synset["id"] + "</td><td>";
                    display = createSynonym(display, -1, synset["words"]) + "</td><td>" + synset["definition"] + "</td></tr>"
                }
            }
            break;
        }
    }
    display = display + "</table> <br>"
    display = display + "Frame Elements <br> <table> <th>Element</th> </tr>";
    for (let i = 0; i < turkishFrameNet.length; i++) {
        let frame = turkishFrameNet[i];
        if (frame["frame"] === frameName) {
            let frameElements = frame["frameElements"];
            for (let frameElement of frameElements) {
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
        display = display + "<tr><td>" + frame["frame"] + "</td><td><table> <tr> <th>Id</th> <th>Words</th> <th>Definition</th> </tr>";
        let lexicalUnits = frame["lexicalUnits"];
        for (let lexicalUnit of lexicalUnits) {
            let synset = getSynsetWithIdBinarySearch(lexicalUnit, turkishWordNet)
            if (synset != null) {
                display = display + "<tr><td>" + synset["id"] + "</td><td>";
                display = createSynonym(display, -1, synset["words"]) + "</td><td>" + synset["definition"] + "</td></tr>"
            }
        }
        display = display + "</table></td><td>"
        let frameElements = frame["frameElements"];
        for (let frameElement of frameElements) {
            display = display + " " + frameElement;
        }
        display = display + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

function getFramesForSynSet(synset) {
    let result = []
    for (let i = 0; i < turkishFrameNet.length; i++) {
        let frame = turkishFrameNet[i];
        let lexicalUnits = frame["lexicalUnits"];
        for (let lexicalUnit of lexicalUnits) {
            if (lexicalUnit === synset) {
                result.push(frame)
                break;
            }
        }
    }
    return result
}

function frameListContains(frames, frame){
    for (let current of frames) {
        if (current["frame"] === frame["frame"]){
            return true
        }
    }
    return false
}

function getFramesForSynSets(synsets) {
    let result = []
    for (let synset of synsets) {
        let current = getFramesForSynSet(synset["id"]);
        for (let frame of current) {
            if (!frameListContains(result, frame)){
                result.push(frame)
            }
        }
    }
    return result
}

document.getElementById('frameSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const frameName = document.getElementById('frame_name').value;
    document.getElementById("result").innerHTML = createFrameTable(frameName);
})

document.getElementById('verbSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbName = document.getElementById('verb_name').value;
    let synsets = getSynsetsWithWord(verbName, turkishWordNet)
    let frames = getFramesForSynSets(synsets)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    let frames = getFramesForSynSet(verbId)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})
