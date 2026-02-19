import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
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
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

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
    origin: ["http://104.247.163.162"]
}));

app.use("/api", rateLimit({
    windowMs: 60 * 1000,
    max: 60
}));

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`NLP backend running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

app.get("/turkish-dictionary-word-search/:word", (req, res) => {
    const word = req.params.word;
    let wordName = word
    let lastChar = word.slice(-1);
    let lastTwo = word.slice(-2);
    let exceptLastTwo = word.slice(0, word.length - 2);
    let secondLast = lastTwo[0];
    let wordObject = turkishDictionary.getWord(word)
    let display;
    if (wordObject !== undefined && wordObject instanceof TxtWord) {
        if (wordObject.nounSoftenDuringSuffixation()) {
            switch (lastChar) {
                case "ç":
                    display = wordName + "(cı):"
                    break;
                case "k":
                    display = wordName + "(ğı):"
                    break;
                case "t":
                    display = wordName + "(dı):"
                    break;
                case "p":
                    display = wordName + "(bı):"
                    break;
            }
        } else {
            if (wordObject.isPortmanteauEndingWithSI()) {
                display = exceptLastTwo + "(" + lastTwo + "):";
            } else {
                if (wordObject.isPortmanteauFacedSoftening()) {
                    switch (secondLast) {
                        case "ğ":
                            display = exceptLastTwo + "k(" + lastTwo + "):";
                            break;
                        case "c":
                            display = exceptLastTwo + "ç(" + lastTwo + "):";
                            break;
                        case "b":
                            display = exceptLastTwo + "p(" + lastTwo + "):";
                            break;
                        case "d":
                            display = exceptLastTwo + "t(" + lastTwo + "):";
                            break;
                    }
                } else {
                    if (wordObject.duplicatesDuringSuffixation()){
                        display = wordName + "(" + lastChar + lastChar + "ı):"
                    } else {
                        if (wordObject.endingKChangesIntoG()){
                            display = wordName + "(gi):"
                        } else {
                            if (wordObject.vowelAChangesToIDuringYSuffixation()){
                                display = wordName.endsWith("a") ? wordName + "(ıyor):" : wordName + "(iyor):";
                            } else {
                                display = word + ":";
                            }
                        }
                    }
                }
            }
        }
        let flags = [];
        if (wordObject.isProperNoun()) {
            flags.push("Özel İsim");
        }
        if (wordObject.isPlural()) {
            flags.push("Çoğul");
        }
        if (wordObject.isNominal()) {
            flags.push("Cins İsim");
        }
        if (wordObject.isPortmanteau()) {
            flags.push("Bileşik İsim");
        }
        if (wordObject.isAbbreviation()) {
            flags.push("Kısaltma");
        }
        if (wordObject.isVerb()) {
            flags.push("Fiil");
        }
        if (wordObject.isAdjective() || wordObject.isPureAdjective()) {
            flags.push("Sıfat");
        }
        if (wordObject.isAdverb()) {
            flags.push("Zarf");
        }
        if (wordObject.isPronoun()) {
            flags.push("Zamir");
        }
        if (wordObject.isPostP()) {
            flags.push("Edat");
        }
        if (wordObject.isNumeral()) {
            flags.push("Sayı");
        }
        if (wordObject.isConjunction()) {
            flags.push("Bağlaç");
        }
        if (flags.length > 0){
            display = display + " " + flags[0];
            for (let i = 1; i < flags.length; i++) {
                display = display + ", " + flags[i];
            }
        }
        if (wordObject.notObeysVowelHarmonyDuringAgglutination()) {
            display = display + "<p> Bu kelime ünlü uyumuna uymaz </p>";
        }
    } else {
        display = "Kelime bulunamadı"
    }
    const result = {word, display};
    res.json(result);
});

app.get("/turkish-morphology-search/:word", (req, res) => {
    const word = req.params.word;
    let txtWord = turkishDictionary.getWord(word)
    let display
    if (txtWord !== undefined && txtWord instanceof TxtWord) {
        display = txtWord.getMorphology();
    } else {
        display = word;
    }
    const result = {word, display};
    res.json(result);
});