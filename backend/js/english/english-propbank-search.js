import {PredicateList} from "nlptoolkit-propbank";

let englishPropBank = new PredicateList()

function createPredicateTable(predicateName){
    let display = "<table> <tr> <th>Id</th> <th>Name</th> <th>Descr</th> <th>f</th> <th>n</th> </tr>";
    let predicate = englishPropBank.getPredicate(predicateName)
    if (predicate !== undefined) {
        for (let i = 0; i < predicate.size(); i++) {
            let roleSet = predicate.getRoleSet(i)
            for (let j = 0; j < roleSet.size(); j++) {
                display = display + "<tr><td>" + roleSet.getId() + "</td><td>" + roleSet.getName() + "</td>"
                let role = roleSet.getRole(j)
                display = display + "<td>" + role.getDescription() + "</td><td>" + role.getF() + "</td><td>" + role.getN() + "</td></tr>"
            }
        }
    }
    display = display + "</table>"
    return display
}

function createRoleSetTable(roleSetName){
    let display = "<table> <tr> <th>Descr</th> <th>f</th> <th>n</th> </tr>";
    for (let lemma of englishPropBank.getLemmaList()) {
        let predicate = englishPropBank.getPredicate(lemma)
        for (let i = 0; i < predicate.size(); i++) {
            let roleSet = predicate.getRoleSet(i)
            if (roleSet.getName() === roleSetName){
                display = roleSet.getName() + "<br>" + display;
                for (let j = 0; j < roleSet.size(); j++) {
                    let role = roleSet.getRole(j)
                    display = display + "<tr><td>" + role.getDescription() + "</td><td>" + role.getF() + "</td><td>" + role.getN() + "</td></tr>"
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

document.getElementById('predicateSeaarch').addEventListener('submit', function (event) {
    event.preventDefault();
    const predicateName = document.getElementById('predicate_name').value;
    document.getElementById("result").innerHTML = createPredicateTable(predicateName);
})

document.getElementById('roleSetSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const roleSetName = document.getElementById('roleset_id').value;
    document.getElementById("result").innerHTML = createRoleSetTable(roleSetName);
})