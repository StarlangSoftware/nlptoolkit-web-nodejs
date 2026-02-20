import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import {Pos, TxtDictionary} from "nlptoolkit-dictionary";
import {TxtWord} from "nlptoolkit-dictionary";
import {FramesetList} from "nlptoolkit-propbank";
import {PredicateList} from "nlptoolkit-propbank";
import {PolarityType, SentiLiteralNet, SentiNet} from "nlptoolkit-sentinet";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis";
import {SimpleAsciifier} from "nlptoolkit-deasciifier";
import {SimpleDeasciifier} from "nlptoolkit-deasciifier";
import {SimpleSpellChecker} from "nlptoolkit-spellchecker";
import {WordNet} from "nlptoolkit-wordnet";
import {LongestRootFirstDisambiguation} from "nlptoolkit-morphologicaldisambiguation";
import {NaivePosTagger, PosTaggedWord} from "nlptoolkit-postagger";
import {PosTaggedCorpus} from "nlptoolkit-postagger";
import {FrameNet} from "nlptoolkit-framenet";
import path from "path";
import { fileURLToPath } from "url";
import {Sentence} from "nlptoolkit-corpus";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const turkishDictionary = new TxtDictionary();
const fsm = new FsmMorphologicalAnalyzer()
const asciifier = new SimpleAsciifier()
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
                display = display + "<tr><td>" + synSet.getId() + "</td><td>" + Pos[synSet.getPos()] + "</td><td>" + synSet.getDefinition() + "</td><td>"
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
        if (frameSet !== undefined && frameSet !== null) {
            for (let arg of frameSet.getFramesetArguments()) {
                display = display + "<tr><td>" + synSet.getId() + "</td><td>" + synSet.getDefinition() + "</td><td>" + arg.getArgumentType() + "</td><td>" + arg.getFunction() + "</td><td>" + arg.getDefinition() + "</td></tr>"
            }
        }
    }
    display = display + "</table>"
    return display
}

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
            if (roleSet.getId() === roleSetName){
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

function createPosTableForSentence(sentence){
    let display = "<table> <tr> <th>Word</th> <th>Tag(s)</th> </tr>";
    let s = new Sentence(sentence.toLowerCase())
    let annotatedSentence = posTagger.posTag(s)
    for (let i = 0; i < annotatedSentence.wordCount(); i++) {
        let posTaggedWord = annotatedSentence.getWord(i)
        if (posTaggedWord instanceof PosTaggedWord){
            display = display + "<tr><td>" + posTaggedWord.getName() + "</td><td>" + posTaggedWord.getTag() + "</td></tr>"
        } else {
            display = display + "<tr><td>" + posTaggedWord.getName() + "</td><td>UNK</td></tr>"
        }
    }
    display = display + "</table>"
    return display
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

app.get("/turkish-frame-search/:input", (req, res) => {
    const frameName = req.params.input;
    let display = createFrameTable(frameName);
    const result = {frameName, display};
    res.json(result);
});

app.get("/turkish-framenet-verb-search/:input", (req, res) => {
    const verbName = req.params.input;
    let synsets = turkishWordNet.getSynSetsWithLiteral(verbName)
    let frames = getFramesForSynSets(synsets)
    let display = createTableOfFrames(frames)
    const result = {verbName, display};
    res.json(result);
});

app.get("/turkish-framenet-verb-id-search/:input", (req, res) => {
    const verbId = req.params.input;
    let frames = frameNet.getFrames(verbId)
    let display = createTableOfFrames(frames)
    const result = {verbId, display};
    res.json(result);
});

app.get("/turkish-propbank-verb-search/:input", (req, res) => {
    const verbName = req.params.input;
    let synsets = turkishWordNet.getSynSetsWithLiteral(verbName)
    let display = createPropBankTableForMultipleSynsets(synsets);
    const result = {verbName, display};
    res.json(result);
});

app.get("/turkish-propbank-verb-id-search/:input", (req, res) => {
    const verbId = req.params.input;
    let display = createPropBankTable(verbId);
    const result = {verbId, display};
    res.json(result);
});

app.get("/sentinet-word-search/:input", (req, res) => {
    const word = req.params.input;
    let sentiLiteral = sentiLiteralNet.getSentiLiteral(word)
    let display = PolarityType[sentiLiteral.getPolarity()];
    const result = {word, display};
    res.json(result);
});

app.get("/sentinet-id-search/:input", (req, res) => {
    const synSetId = req.params.input;
    let sentiSynSet = sentiNet.getSentiSynSet(synSetId)
    let display = PolarityType[sentiSynSet.getPolarity()];
    const result = {synSetId, display};
    res.json(result);
});

app.get("/turkish-wordnet-word-search/:input", (req, res) => {
    const word = req.params.input;
    let display = "<h1>2020</h1><br>" + createTableForWordSearch(word, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForWordSearch(word, turkishWordNets[i]);
    }
    const result = {word, display};
    res.json(result);
});

app.get("/turkish-wordnet-synonym-search/:input", (req, res) => {
    const synonymWord = req.params.input;
    let display = "<h1>2020</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForSynonymSearch(synonymWord, turkishWordNets[i]);
    }
    const result = {synonymWord, display};
    res.json(result);
});

app.get("/turkish-wordnet-id-search/:input", (req, res) => {
    const synSetId = req.params.input;
    let display = "<h1>2020</h1><br>" + createTableForIdSearch(synSetId, turkishWordNet);
    for (let i = 0; i < years.length; i++) {
        display = display + "<br><h1>" + years[i] + "</h1><br>" + createTableForIdSearch(synSetId, turkishWordNets[i]);
    }
    const result = {synSetId, display};
    res.json(result);
});

app.get("/english-wordnet-word-search/:input", (req, res) => {
    const word = req.params.input;
    let display = createTableForWordSearch(word, englishWordNet);
    const result = {word, display};
    res.json(result);
});

app.get("/english-wordnet-synonym-search/:input", (req, res) => {
    const synonymWord = req.params.input;
    let display = createTableForSynonymSearch(synonymWord, englishWordNet);
    const result = {synonymWord, display};
    res.json(result);
});

app.get("/english-wordnet-id-search/:input", (req, res) => {
    const synSetId = req.params.input;
    let display = createTableForIdSearch(synSetId, englishWordNet);
    const result = {synSetId, display};
    res.json(result);
});

app.get("/english-propbank-predicate-search/:input", (req, res) => {
    const predicateName = req.params.input;
    let display = createPredicateTable(predicateName);
    const result = {predicateName, display};
    res.json(result);
});

app.get("/english-propbank-roleset-search/:input", (req, res) => {
    const roleSetId = req.params.input;
    let display = createRoleSetTable(roleSetId);
    const result = {roleSetId, display};
    res.json(result);
});

app.get("/pos-tag/:input", (req, res) => {
    const sentence = req.params.input;
    let display = createPosTableForSentence(sentence);
    const result = {sentence, display};
    res.json(result);
});
