import {FramesetList} from "nlptoolkit-propbank";

let turkishPropBank = new FramesetList()

function createPropBankTable(synsetId){
    let display = "<table> <tr> <th>Arg</th> <th>Function</th> <th>Description</th> </tr>";
    let frameSet = turkishPropBank.getFrameSet(synsetId)
    for (let arg of frameSet.getFramesetArguments()) {
        display = display + "<tr><td>" + arg.getArgumentType() + "</td><td>" + arg.getFunction() + "</td><td>" + arg.getDefinition() + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

function createPropBankTableForMultipleSynsets(synsets){
    let display = "<table> <tr> <th>Id</th> <th>Definition</th> <th>Arg</th> <th>Function</th> <th>Description</th> </tr>";
    for (let synSet of synsets) {
        let frameSet = turkishPropBank.getFrameSet(synSet.getId())
        for (let arg of frameSet.getFramesetArguments()) {
            display = display + "<tr><td>" + synSet.getId() + "</td><td>" + synSet.getDefinition() + "</td><td>" + arg.getArgumentType() + "</td><td>" + arg.getFunction() + "</td><td>" + arg.getDefinition() + "</td></tr>"
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
