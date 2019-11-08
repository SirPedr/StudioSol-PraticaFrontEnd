class GameStatusController {
    constructor(DOMReferenceElement) {
        this.domElement = DOMReferenceElement;
    }

    updateElementWithGameState(currentGameState) {
        const gameStateDOMRepresentation = document.getElementById('gameState');

        if(currentGameState.isRunning) {
            const currentPlayer = currentGameState.currentPlayer,
                  playerDisplayName = document.createElement('strong');
            
            playerDisplayName.innerHTML = currentPlayer.name;

            gameStateDOMRepresentation.innerHTML = "Vez de: "
            gameStateDOMRepresentation.style.backgroundColor = currentPlayer.referenceColor

            gameStateDOMRepresentation.appendChild(playerDisplayName);
        }
    }
}