import {TxtDictionary, TxtWord} from "nlptoolkit-dictionary";

let turkishDictionary = new TxtDictionary();

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    let wordName = word
    let wordObject = turkishDictionary.getWord(word)
    if (wordObject !== undefined && wordObject instanceof TxtWord) {
        let display = word + ":";
        if (wordObject.nounSoftenDuringSuffixation()){
            if (wordName.endsWith("ç")){
                display = wordName + "(cı):"
            } else {
                if (wordName.endsWith("k")){
                    display = wordName + "(ğı):"
                } else {
                    if (wordName.endsWith("t")){
                        display = wordName + "(dı):"
                    } else {
                        display = wordName + "(bı):"
                    }
                }
            }
        } else {
            if (wordObject.isPortmanteauEndingWithSI()){
                display = wordName.substring(0, wordName.length - 2) + "(" + wordName.substring(wordName.length - 2) + "):";
            } else {
                if (wordObject.isPortmanteauFacedSoftening()){
                    if (wordName.substring(0, wordName.length - 1).endsWith("ğ")){
                        display = wordName.substring(0, wordName.length - 2) + "k(" + wordName.substring(wordName.length - 2) + "):";
                    } else {
                        if (wordName.substring(0, wordName.length - 1).endsWith("c")){
                            display = wordName.substring(0, wordName.length - 2) + "ç(" + wordName.substring(wordName.length - 2) + "):";
                        } else {
                            if (wordName.substring(0, wordName.length - 1).endsWith("b")){
                                display = wordName.substring(0, wordName.length - 2) + "p(" + wordName.substring(wordName.length - 2) + "):";
                            } else {
                                if (wordName.substring(0, wordName.length - 1).endsWith("d")){
                                    display = wordName.substring(0, wordName.length - 2) + "t(" + wordName.substring(wordName.length - 2) + "):";
                                }
                            }
                        }
                    }
                }
            }
        }
        if (wordObject.duplicatesDuringSuffixation()){
            display = wordName + "(" + wordName.at(wordName.length - 1) + wordName.at(wordName.length - 1) + "ı):"
        }
        if (wordObject.endingKChangesIntoG()){
            display = wordName + "(gi):"
        }
        if (wordObject.vowelAChangesToIDuringYSuffixation()){
            display = wordName.endsWith("a") ? wordName + "(ıyor):" : wordName + "(iyor):";
        }
        let firstTime = true;
        if (wordObject.isProperNoun()) {
            display = display + " Özel İsim"
            firstTime = false
        }
        if (wordObject.isNominal()) {
            if (firstTime){
                display = wordObject.isPlural() ? display + " Çoğul Cins İsim" : display + " Cins İsim";
            } else {
                display = wordObject.isPlural() ? display + ", Çoğul Cins İsim" : display + ", Cins İsim";
            }
            firstTime = false
        }
        if (wordObject.isPortmanteau()) {
            display = firstTime ? display + " Bileşik İsim" : display + ", Bileşik İsim";
            firstTime = false
        }
        if (wordObject.isAbbreviation()) {
            display = firstTime ? display + " Kısaltma" : display + ", Kısaltma";
            firstTime = false
        }
        if (wordObject.isVerb()) {
            display = firstTime ? display + " Fiil" : display + ", Fiil";
            firstTime = false
        }
        if (wordObject.isAdjective() || wordObject.isPureAdjective()) {
            display = firstTime ? display + " Sıfat" : display + ", Sıfat";
            firstTime = false
        }
        if (wordObject.isAdverb()) {
            display = firstTime ? display + " Zarf" : display + ", Zarf";
            firstTime = false
        }
        if (wordObject.isPronoun()) {
            display = firstTime ? display + " Zamir" : display + ", Zamir";
            firstTime = false
        }
        if (wordObject.isPostP()) {
            display = firstTime ? display + " Edat" : display + ", Edat";
            firstTime = false
        }
        if (wordObject.isNumeral()) {
            display = firstTime ? display + " Sayı" : display + ", Sayı";
            firstTime = false
        }
        if (wordObject.isConjunction()) {
            display = firstTime ? display + " Bağlaç" : display + ", Bağlaç";
            firstTime = false
        }
        if (wordObject.notObeysVowelHarmonyDuringAgglutination()) {
            display = display + "<p> Bu kelime ünlü uyumuna uymaz </p>";
            firstTime = false
        }
        document.getElementById("result").innerHTML = display;
    } else {
        document.getElementById("result").innerHTML = "Bu kelime sözlükte yok";
    }
});
