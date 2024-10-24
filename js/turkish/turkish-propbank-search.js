function createPropBankTable(synsetId){
    let display = "<table> <tr> <th>Arg</th> <th>Function</th> <th>Description</th> </tr>";
    for (let i = 0; i < turkishPropBank.length; i++) {
        let frameSet = turkishPropBank[i];
        if (frameSet["id"] === synsetId) {
            let args = frameSet["args"]
            for (let arg of args) {
                display = display + "<tr><td>" + arg["arg"] + "</td><td>" + arg["function"] + "</td><td>" + arg["description"] + "</td></tr>"
            }
        }
    }
    display = display + "</table>"
    return display
}

function createPropBankTableForMultipleSynsets(synsets){
    let display = "<table> <tr> <th>Id</th> <th>Definition</th> <th>Arg</th> <th>Function</th> <th>Description</th> </tr>";
    for (let synset of synsets) {
        for (let i = 0; i < turkishPropBank.length; i++) {
            let frameSet = turkishPropBank[i];
            if (frameSet["id"] === synset["id"]) {
                let args = frameSet["args"]
                for (let arg of args) {
                    display = display + "<tr><td>" + synset["id"] + "</td><td>" + synset["definition"] + "</td><td>" + arg["arg"] + "</td><td>" + arg["function"] + "</td><td>" + arg["description"] + "</td></tr>"
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

document.getElementById('verbSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbName = document.getElementById('verb_name').value;
    let synsets = getSynsetsWithWord(verbName, turkishWordNet)
    document.getElementById("result").innerHTML = createPropBankTableForMultipleSynsets(synsets);
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    document.getElementById("result").innerHTML = createPropBankTable(verbId);
})
