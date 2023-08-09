class VoiceSpeech {
  constructor() {
    this.synthesis =
      "speechSynthesis" in window ? window.speechSynthesis : null;
    this.isActive = this._setInitialVoiceSpeech();

    document
      .querySelector("#voice-speech-input")
      .addEventListener("click", () => {
        this._onVoiceInputChange();
      });
  }

  _setInitialVoiceSpeech = () => {
    const isVoiceActive =
      (localStorage.getItem("voiceSpeechActive") ?? "true") === "true";
    document.querySelector("#voice-speech-input").checked = isVoiceActive;
    return isVoiceActive;
  };

  _onVoiceInputChange = () => {
    this.isActive = document.querySelector("#voice-speech-input").checked;
    localStorage.setItem("voiceSpeechActive", this.isActive);
  };

  speakText = (text) => {
    if (this.synthesis) {
      if (this.isActive) {
        const utterance = new SpeechSynthesisUtterance(text);
        this.synthesis.speak(utterance);
      }
    } else {
      console.log("El navegador no admite la síntesis de voz.");
    }
  };
}

const voiceSpeech = new VoiceSpeech();

export default voiceSpeech;
