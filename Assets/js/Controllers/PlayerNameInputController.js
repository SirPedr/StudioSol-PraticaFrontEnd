class PlayerNameInputController {
    constructor(referencePlayer, DOMInputEl) {
        this.referencePlayer = referencePlayer;
        this.referenceDOMInput = DOMInputEl;
        this.updateDOMInputWithPlayerName();
    }

    updatePlayerName() {
        const newPlayerName = this.referenceDOMInput.value;
        
        if(newPlayerName.replace(/\s+/g, '') != '')
            this.referencePlayer.name =  newPlayerName;
    }

    updateDOMInputWithPlayerName() {
        this.referenceDOMInput.value = this.referencePlayer.name;
    }
}