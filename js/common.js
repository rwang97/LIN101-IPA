let prevVoicingChoice = null;
let prevMannerChoice = null;
let prevPlaceChoice = null;
let prevRoundingChoice = null;
let prevHeightChoice = null;
let prevBacknessChoice = null;
let clickedOK = false;
const result_p = document.querySelector(".result > p");
const actionMessage_p = document.getElementById("action-message");
const actions_class = document.querySelector(".actions");
const childDivs_v = document.getElementById('v').getElementsByTagName('div');
const childDivs_m = document.getElementById('m').getElementsByTagName('div');
const childDivs_p = document.getElementById('p').getElementsByTagName('div');
const childDivs_r = document.getElementById('r').getElementsByTagName('div');
const childDivs_h = document.getElementById('h').getElementsByTagName('div');
const childDivs_b = document.getElementById('b').getElementsByTagName('div');
const okay_div = document.getElementById("okay");
const IPASymbol_span = document.getElementById("IPA-symbol");
const IPASymbols = {
    // high vowels
    'i': ['unrounded', 'high', 'front'],
    'y': ['rounded', 'high', 'front'],
    'ɨ': ['unrounded', 'high', 'central'],
    'ɯ': ['unrounded', 'high', 'back'],
    'u': ['rounded', 'high', 'back'],
    'ɪ': ['unrounded', 'high', 'front'],
    'ʊ': ['rounded', 'high', 'back'],
    // mid vowels
    'e': ['unrounded', 'mid', 'front'],
    'ə': ['unrounded', 'mid', 'central'],
    'o': ['rounded', 'mid', 'back'],
    'ɛ': ['unrounded', 'mid', 'front'],
    'ʌ': ['unrounded', 'mid', 'back'],
    'ɔ': ['rounded', 'mid', 'back'],
    // low
    'æ': ['unrounded', 'low', 'front'],
    'a': ['unrounded', 'low', 'central'],
    'ɑ': ['unrounded', 'low', 'back'],
    // stop
    'p': ["voiceless", "bilabial", "stop"], 
    'b': ["voiced", "bilabial", "stop"], 
    't': ["voiceless", "alveolar", "stop"], 
    'd': ["voiced", "alveolar", "stop"], 
    'ʈ': ["voiceless", "retroflex", "stop"], 
    'ɖ': ["voiced", "retroflex", "stop"], 
    'c': ["voiceless", "palatal", "stop"], 
    'ɟ': ["voiced", "palatal", "stop"], 
    'k': ["voiceless", "velar", "stop"],
    'g': ["voiced", "velar", "stop"],
    'q': ["voiceless", "uvular", "stop"],
    'ʔ': ["voiceless", "glottal", "stop"],
    // fricative
    'ɸ': ["voiceless", "bilabial", "fricative"],
    'β': ["voiced", "bilabial", "fricative"],
    'f': ["voiceless", "labiodental", "fricative"],
    'v': ["voiced", "labiodental", "fricative"],
    'θ': ["voiceless", "dental", "fricative"],
    'ð': ["voiced", "dental", "fricative"],
    's': ["voiceless", "alveolar", "fricative"],
    'z': ["voiced", "alveolar", "fricative"],
    'ʃ': ["voiceless", "postalveolar", "fricative"],
    'ʒ': ["voiced", "postalveolar", "fricative"],
    'ʂ': ["voiceless", "retroflex", "fricative"],
    'ç': ["voiceless", "palatal", "fricative"],
    'x': ["voiceless", "velar", "fricative"],
    'ɣ': ["voiced", "velar", "fricative"],
    'χ': ["voiceless", "uvular", "fricative"],
    'ʁ': ["voiced", "uvular", "fricative"],
    'h': ["voiceless", "glottal", "fricative"],
    // affricate
    'ts': ["voiceless", "alveolar", "affricate"],
    'dz': ["voiced", "alveolar", "affricate"],
    'tʃ': ["voiceless", "postalveolar", "affricate"],
    'dʒ': ["voiced", "postalveolar", "affricate"],
    'ʈʂ': ["voiceless", "retroflex", "affricate"],
    'cç': ["voiceless", "palatal", "affricate"],
    'ɟʝ': ["voiced", "palatal", "affricate"],
    // nasal
    'm': ["voiced", "bilabial", "nasal"],
    'n': ["voiced", "alveolar", "nasal"],
    'ɳ': ["voiced", "retroflex", "nasal"],
    'ɲ': ["voiced", "palatal", "nasal"],
    'ŋ': ["voiced", "velar", "nasal"],
    // flap
    'ɾ': ["voiced", "alveolar", "flap/tap"],
    'ɽ': ["voiced", "retroflex", "flap/tap"],
    // trill
    'r': ["voiced", "alveolar", "trill"],
    // lateral
    'l': ["voiced", "alveolar", "lateral"],
    'ɭ': ["voiced", "retroflex", "lateral"],
    'ʎ': ["voiced", "palatal", "lateral"],
    // approximant
    // 'w': ["voiced", "bilabial", "approximant"],
    'ɹ': ["voiced", "alveolar", "approximant"],
    'ɻ': ["voiced", "retroflex", "approximant"],
    'j': ["voiced", "palatal", "approximant"],
}
const IPAVowls = [
    'i', 
    'y', 
    'ɨ', 
    'ɯ', 
    'u', 
    'ɪ',
    'ʊ',
    // mid vowels
    'e',
    'ə',
    'o',
    'ɛ',
    'ʌ',
    'ɔ',
    // low
    'æ',
    'a',
    'ɑ'
];

// string names for all the symbols
const symbols = Object.keys(IPASymbols);

// shuffle indices to random choose next symbol
let shuffleIndices = Array.from(Array(symbols.length).keys());
let currentIndex = 0;
shuffleArray(shuffleIndices);

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectIPA_voicing(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevVoicingChoice !== null && prevVoicingChoice !== userChoice) {
            // remove previous selected 
            const prevChoice_div = document.getElementById(prevVoicingChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevVoicingChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevVoicingChoice = userChoice;
    }
}

function selectIPA_manner(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevMannerChoice !== null && prevMannerChoice !== userChoice) {
            const prevChoice_div = document.getElementById(prevMannerChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevMannerChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevMannerChoice = userChoice;
    }
}

function selectIPA_place(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevPlaceChoice !== null && prevPlaceChoice !== userChoice) {
            const prevChoice_div = document.getElementById(prevPlaceChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevPlaceChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevPlaceChoice = userChoice;
    }
}

function selectIPA_rounding(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevRoundingChoice !== null && prevVoicingChoice !== userChoice) {
            // remove previous selected 
            const prevChoice_div = document.getElementById(prevRoundingChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevRoundingChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevRoundingChoice = userChoice;
    }
}

function selectIPA_height(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevHeightChoice !== null && prevHeightChoice !== userChoice) {
            const prevChoice_div = document.getElementById(prevHeightChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevHeightChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevHeightChoice = userChoice;
    }
}

function selectIPA_backness(userChoice_div) {
    if (!clickedOK) {
        userChoice = userChoice_div.innerHTML;
        userChoice_div.classList.add('blue-glow');
    
        if (prevBacknessChoice !== null && prevBacknessChoice !== userChoice) {
            const prevChoice_div = document.getElementById(prevBacknessChoice);
            prevChoice_div.classList.remove('blue-glow');
        } else if (prevBacknessChoice == userChoice) {
            // unselect previous selected, set previous choice to null
            userChoice_div.classList.remove('blue-glow')
            userChoice = null;
        }
    
        prevBacknessChoice = userChoice;
    }
}

function checkConsonant(symbol) {
    voicingCorrect = IPASymbols[symbol][0];
    placeCorrect = IPASymbols[symbol][1];
    mannerCorrect = IPASymbols[symbol][2];

    const prevVoicingChoice_div = document.getElementById(prevVoicingChoice);
    const prevMannerChoice_div = document.getElementById(prevMannerChoice);
    const prevPlaceChoice_div = document.getElementById(prevPlaceChoice);

    const correctVoicingChoice_div = document.getElementById(voicingCorrect);
    const correctMannerChoice_div = document.getElementById(mannerCorrect);
    const correctPlaceChoice_div = document.getElementById(placeCorrect);

    correct = true;
    // check voicing
    if (voicingCorrect !== prevVoicingChoice) {
        prevVoicingChoice_div.classList.remove('blue-glow');
        prevVoicingChoice_div.classList.add('red-glow');
        correctVoicingChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevVoicingChoice_div.classList.remove('blue-glow');
        prevVoicingChoice_div.classList.add('green-glow');
    }

    if (mannerCorrect !== prevMannerChoice) {
        prevMannerChoice_div.classList.remove('blue-glow');
        prevMannerChoice_div.classList.add('red-glow');
        correctMannerChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevMannerChoice_div.classList.remove('blue-glow');
        prevMannerChoice_div.classList.add('green-glow');
    }

    if (placeCorrect !== prevPlaceChoice) {
        prevPlaceChoice_div.classList.remove('blue-glow');
        prevPlaceChoice_div.classList.add('red-glow');
        correctPlaceChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevPlaceChoice_div.classList.remove('blue-glow');
        prevPlaceChoice_div.classList.add('green-glow');
    }

    if (correct) {
        result_p.innerHTML = "You got it correct! 🔥";
    } else {
        result_p.innerHTML = "Sorry you got it wrong. Try again! 🙁";
    }

    return [prevVoicingChoice_div, prevMannerChoice_div, prevPlaceChoice_div, 
            correctVoicingChoice_div, correctMannerChoice_div, correctPlaceChoice_div]
}

function checkVowel(symbol) {
    roundingCorrect = IPASymbols[symbol][0];
    heightCorrect = IPASymbols[symbol][1];
    backnessCorrect = IPASymbols[symbol][2];

    const prevRoundingChoice_div = document.getElementById(prevRoundingChoice);
    const prevHeightChoice_div = document.getElementById(prevHeightChoice);
    const prevBacknessChoice_div = document.getElementById(prevBacknessChoice);

    const correctRoundingChoice_div = document.getElementById(roundingCorrect);
    const correctHeightChoice_div = document.getElementById(heightCorrect);
    const correctBacknessChoice_div = document.getElementById(backnessCorrect);

    correct = true;
    // check voicing
    if (roundingCorrect !== prevRoundingChoice) {
        prevRoundingChoice_div.classList.remove('blue-glow');
        prevRoundingChoice_div.classList.add('red-glow');
        correctRoundingChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevRoundingChoice_div.classList.remove('blue-glow');
        prevRoundingChoice_div.classList.add('green-glow');
    }

    if (heightCorrect !== prevHeightChoice) {
        prevHeightChoice_div.classList.remove('blue-glow');
        prevHeightChoice_div.classList.add('red-glow');
        correctHeightChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevHeightChoice_div.classList.remove('blue-glow');
        prevHeightChoice_div.classList.add('green-glow');
    }

    if (backnessCorrect !== prevBacknessChoice) {
        prevBacknessChoice_div.classList.remove('blue-glow');
        prevBacknessChoice_div.classList.add('red-glow');
        correctBacknessChoice_div.classList.add('green-glow');
        correct = false;
    } else {
        prevBacknessChoice_div.classList.remove('blue-glow');
        prevBacknessChoice_div.classList.add('green-glow');
    }

    if (correct) {
        result_p.innerHTML = "You got it correct! 🔥";
    } else {
        result_p.innerHTML = "Sorry you got it wrong. Try again! 🙁";
    }

    return [prevRoundingChoice_div, prevHeightChoice_div, prevBacknessChoice_div, 
            correctRoundingChoice_div, correctHeightChoice_div, correctBacknessChoice_div]
}

function check(symbol) {
    if (IPAVowls.includes(symbol)) {
        return checkVowel(symbol);
    }
    else {
        return checkConsonant(symbol);
    }
}

function next() {

    if (currentIndex == symbols.length) {
        console.log("shuffled, next round");
        shuffleArray(shuffleIndices);
        currentIndex = 0;
    }

    const index = shuffleIndices[currentIndex];
    IPASymbol_span.innerHTML = symbols[index];

    currentIndex++;
    return symbols[index]
}

function removeGlow(divs) {
    for( i=0; i< divs.length; i++ ) {
        var div = divs[i];
        div.classList.remove('green-glow');
        div.classList.remove('red-glow');
    }
}

function selectOkay() {
    error_msg = "";
    symbol = IPASymbol_span.innerHTML;

    if (IPAVowls.includes(symbol)) {
        if (!prevRoundingChoice) {
            error_msg = error_msg + " [rounding] ";
        }
        if (!prevHeightChoice) {
            error_msg = error_msg + " [height] ";
        }
        if (!prevBacknessChoice) {
            error_msg = error_msg + " [backness] ";
        }
    }
    else {
        if (!prevVoicingChoice) {
            error_msg = error_msg + " [voicing] ";
        }
        if (!prevMannerChoice) {
            error_msg = error_msg + " [manner of articulation] ";
        }
        if (!prevPlaceChoice) {
            error_msg = error_msg + " [place of articulation] ";
        }
    }

    if (error_msg !== "") {
        alert("Please select" + error_msg);
    }
    else {
        divs = check(symbol);
        actionMessage_p.innerHTML = "";
        if (clickedOK) {
            // reset everything
            removeGlow(divs);
            new_symbol = next();
            clickedOK = false;
            prevVoicingChoice = null;
            prevMannerChoice = null;
            prevPlaceChoice = null;
            prevRoundingChoice = null;
            prevHeightChoice = null;
            prevBacknessChoice = null;
            result_p.innerHTML = "";
            okay_div.innerHTML = "Confirm";
            actionMessage_p.innerHTML = "Choose correct phonetic properties.";

            // switch options based on symbol
            console.log(new_symbol);
            if (IPAVowls.includes(new_symbol)) {
                hideDiv(false);
            }
            else {
                hideDiv(true);
            }
        }
        else {
            clickedOK = true;
            okay_div.innerHTML = "OK next!";
        }
    }
}

function hideDiv(isConsonant) {
    var hide1, hide2, hide3, reveal1, reveal2, reveal3;
    if (isConsonant) {
        hide1 = childDivs_r;
        hide2 = childDivs_h;
        hide3 = childDivs_b;

        reveal1 = childDivs_v;
        reveal2 = childDivs_m;
        reveal3 = childDivs_p;
    }
    else {
        hide1 = childDivs_v;
        hide2 = childDivs_m;
        hide3 = childDivs_p;

        reveal1 = childDivs_r;
        reveal2 = childDivs_h;
        reveal3 = childDivs_b;
    }

    // hide the ones needed
    for( i=0; i< hide1.length; i++ ) {
        var childDiv = hide1[i];
        childDiv.classList.add('notDisplayed');
    }

    for( i=0; i< hide2.length; i++ ) {
        var childDiv = hide2[i];
        childDiv.classList.add('notDisplayed');
    }
    
    for( i=0; i< hide3.length; i++ ) {
        var childDiv = hide3[i];
        childDiv.classList.add('notDisplayed');
    }

    // reveal the ones needed
    for( i=0; i< reveal1.length; i++ ) {
        var childDiv = reveal1[i];
        childDiv.classList.remove('notDisplayed');
    }

    for( i=0; i< reveal2.length; i++ ) {
        var childDiv = reveal2[i];
        childDiv.classList.remove('notDisplayed');
    }
    
    for( i=0; i< reveal3.length; i++ ) {
        var childDiv = reveal3[i];
        childDiv.classList.remove('notDisplayed');
    }

}

function handleConsonant() {
    for( i=0; i< childDivs_v.length; i++ ) {
        var childDiv = childDivs_v[i];
        childDiv.classList.add('notDisplayed');        
        // solve binding issue, https://stackoverflow.com/questions/19586137/addeventlistener-using-for-loop-and-passing-values
        childDiv.addEventListener("click", selectIPA_voicing.bind(this, childDiv));
    }

    for( i=0; i< childDivs_m.length; i++ ) {
        var childDiv = childDivs_m[i];
        childDiv.classList.add('notDisplayed');        
        childDiv.addEventListener("click", selectIPA_manner.bind(this, childDiv));
    }

    for( i=0; i< childDivs_p.length; i++ ) {
        var childDiv = childDivs_p[i];
        childDiv.classList.add('notDisplayed');        
        childDiv.addEventListener("click", selectIPA_place.bind(this, childDiv));
    }
}

function handleVowel() {
    for( i=0; i< childDivs_r.length; i++ ) {
        var childDiv = childDivs_r[i];
        // solve binding issue, https://stackoverflow.com/questions/19586137/addeventlistener-using-for-loop-and-passing-values
        childDiv.addEventListener("click", selectIPA_rounding.bind(this, childDiv));
    }

    for( i=0; i< childDivs_h.length; i++ ) {
        var childDiv = childDivs_h[i];
        childDiv.addEventListener("click", selectIPA_height.bind(this, childDiv));
    }

    for( i=0; i< childDivs_b.length; i++ ) {
        var childDiv = childDivs_b[i];
        childDiv.addEventListener("click", selectIPA_backness.bind(this, childDiv));
    }
}

function handleOK() {
    okay_div.addEventListener("click", () => selectOkay());
}

function main() {
    handleConsonant();
    handleVowel();
    handleOK();
}

main();