function createSynonym(display, j, synset) {
    let t = 0
    for (let k = 0; k < synset.getSynonym().literalSize(); k++) {
        if (k !== j) {
            if (t === 0) {
                display = display + synset.getSynonym().getLiteral(k).getName();
            } else {
                display = display + "; " + synset.getSynonym().getLiteral(k).getName();
            }
            t++;
        }
    }
    return display
}

function createTableForWordSearch(word, wordNet) {
    let display = "<table> <tr> <th>Id</th> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    let synSetList = wordNet.getSynSetsWithLiteral(word)
    for (let synSet of synSetList) {
        for (let j = 0; j < synSet.getSynonym().literalSize(); j++) {
            if (synSet.getSynonym().getLiteral(j).getName() === word) {
                display = display + "<tr><td>" + synSet.getId() + "</td><td>" + synSet.getPos() + "</td><td>" + synSet.getDefinition() + "</td><td>"
                display = createSynonym(display, j, synSet) + "</td></tr>"
                break;
            }
        }
    }
    display = display + "</table>"
    return display
}

function createTableForSynonymSearch(synonymWord, wordNet) {
    let display = "<table> <tr> <th>Synonym Words</th></tr>";
    let synSetList = wordNet.getSynSetsWithLiteral(synonymWord)
    for (let synSet of synSetList) {
        if (synSet.getSynonym().literalSize() !== 1) {
            for (let j = 0; j < synSet.getSynonym().literalSize(); j++) {
                if (synSet.getSynonym().getLiteral(j).getName() === synonymWord) {
                    display = display + "<tr><td>";
                    display = createSynonym(display, j, synSet) + "</td></tr>"
                    break;
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

function createTableForIdSearch(synsetId, wordNet) {
    let display = "<table> <tr> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    let synSet = wordNet.getSynSetWithId(synsetId);
    if (synSet !== undefined){
        display = display + "<tr><td>" + synSet.getPos() + "</td><td>" + synSet.getDefinition() + "</td><td>";
        display = createSynonym(display, -1, synSet) + "</td></tr>"
        display = display + "</table>"
    }
    return display
}