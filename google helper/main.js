
//speetcher

const speak = (p, voice = getVoice('Michelle')) => {
    p.split('\n').forEach(text => {
        const ssu = new SpeechSynthesisUtterance(text);
        ssu.lang = 'en-US';
        ssu.voice = voice;
        speechSynthesis.speak(ssu);
    });
};

let voices = [];
const getVoice = voiceURI => {
    const voice = voices.find(voice => voice.voiceURI.includes(voiceURI));
    return voice;
};

const voicesChanged = () => {
    voices = speechSynthesis.getVoices();
};
voicesChanged();
speechSynthesis.addEventListener('voiceschanged', voicesChanged);
// hightlight
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}
//say
function say(e) {
if (e.key == 's') {
    speak(getSelectionText())
    document.removeEventListener('keydown', say)
}
}
document.onmouseup = document.onkeyup = document.onselectionchange = function () {
    document.removeEventListener('keydown', say)
    document.onmouseup = () => { document.addEventListener('keydown', say) }
};