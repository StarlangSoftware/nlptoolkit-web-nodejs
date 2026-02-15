import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";
import {TxtDictionary} from "nlptoolkit-dictionary";
import {TxtWord} from "nlptoolkit-dictionary";
import {FramesetList} from "nlptoolkit-propbank";
import {PredicateList} from "nlptoolkit-propbank";
import {SentiLiteralNet, SentiNet} from "nlptoolkit-sentinet";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {SimpleAsciifier} from "nlptoolkit-deasciifier";
import {SimpleDeasciifier} from "nlptoolkit-deasciifier";
import {SimpleSpellChecker} from "nlptoolkit-spellchecker";
import {WordNet} from "nlptoolkit-wordnet";
import {LongestRootFirstDisambiguation} from "nlptoolkit-morphologicaldisambiguation";
import {NaivePosTagger} from "nlptoolkit-postagger";
import {PosTaggedCorpus} from "nlptoolkit-postagger";
import {FrameNet} from "nlptoolkit-framenet";

const app = express();
const PORT = process.env.PORT || 3000;

const turkishDictionary = new TxtDictionary();
const fsm = new FsmMorphologicalAnalyzer()
const asciifier = new SimpleAsciifier(fsm)
const deasciifier = new SimpleDeasciifier(fsm)
const disambiguator = new LongestRootFirstDisambiguation()
const simpleSpellChecker = new SimpleSpellChecker(fsm)
const turkishWordNet = new WordNet();
const frameNet = new FrameNet();
const turkishPropBank = new FramesetList()
const sentiNet = new SentiNet();
const sentiLiteralNet = new SentiLiteralNet();
let years = ["1901", "1944", "1955", "1959", "1966", "1969", "1974", "1983", "1988", "1998"]
const posTagger = new NaivePosTagger()
const posTaggedCorpus = new PosTaggedCorpus("brown.txt")
posTagger.train(posTaggedCorpus)
const englishPropBank = new PredicateList();
const englishWordNet = new WordNet("english_wordnet_version_31.xml");
const turkishWordNets = [];
for (let i = 0; i < 10; i++) {
    turkishWordNets.push(new WordNet("turkish" + years[i] + "_wordnet.xml", "tr"));
}

app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: ["http://104.247.163.162/nlptoolkit2"]
}));

app.use("/api", rateLimit({
    windowMs: 60 * 1000,
    max: 60
}));

app.listen(PORT, () => {
    console.log(`NLP backend running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

app.get("/api/turkish-dictionary-word-search/:word", (req, res) => {
    const word = req.params.word;
    let wordName = word
    let wordObject = turkishDictionary.getWord(word)
    let display;
    if (wordObject !== undefined && wordObject instanceof TxtWord) {
        display = word + ":";
        if (wordObject.nounSoftenDuringSuffixation()) {
            if (wordName.endsWith("ç")) {
                display = wordName + "(cı):"
            } else {
                if (wordName.endsWith("k")) {
                    display = wordName + "(ğı):"
                } else {
                    if (wordName.endsWith("t")) {
                        display = wordName + "(dı):"
                    } else {
                        display = wordName + "(bı):"
                    }
                }
            }
        } else {
            if (wordObject.isPortmanteauEndingWithSI()) {
                display = wordName.substring(0, wordName.length - 2) + "(" + wordName.substring(wordName.length - 2) + "):";
            } else {
                if (wordObject.isPortmanteauFacedSoftening()) {
                    if (wordName.substring(0, wordName.length - 1).endsWith("ğ")) {
                        display = wordName.substring(0, wordName.length - 2) + "k(" + wordName.substring(wordName.length - 2) + "):";
                    } else {
                        if (wordName.substring(0, wordName.length - 1).endsWith("c")) {
                            display = wordName.substring(0, wordName.length - 2) + "ç(" + wordName.substring(wordName.length - 2) + "):";
                        } else {
                            if (wordName.substring(0, wordName.length - 1).endsWith("b")) {
                                display = wordName.substring(0, wordName.length - 2) + "p(" + wordName.substring(wordName.length - 2) + "):";
                            } else {
                                if (wordName.substring(0, wordName.length - 1).endsWith("d")) {
                                    display = wordName.substring(0, wordName.length - 2) + "t(" + wordName.substring(wordName.length - 2) + "):";
                                }
                            }
                        }
                    }
                }
            }
        }
        if (wordObject.duplicatesDuringSuffixation()) {
            display = wordName + "(" + wordName.at(wordName.length - 1) + wordName.at(wordName.length - 1) + "ı):"
        }
        if (wordObject.endingKChangesIntoG()) {
            display = wordName + "(gi):"
        }
        if (wordObject.vowelAChangesToIDuringYSuffixation()) {
            display = wordName.endsWith("a") ? wordName + "(ıyor):" : wordName + "(iyor):";
        }
        let firstTime = true;
        if (wordObject.isProperNoun()) {
            display = display + " Özel İsim"
            firstTime = false
        }
        if (wordObject.isNominal()) {
            if (firstTime) {
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
        }
        if (wordObject.notObeysVowelHarmonyDuringAgglutination()) {
            display = display + "<p> Bu kelime ünlü uyumuna uymaz </p>";
        }
    }
    const result = {word, display};
    res.json(result);
});
