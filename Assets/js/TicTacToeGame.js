class TicTacToeGame {
    constructor(gameGrid, firstPlayer, secondPlayer) {
        this.gameTable = gameGrid;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;

        this.currentPlayer = firstPlayer;
        this.playerWhoMadeLastMove = secondPlayer;

        this.gameStateObservers = [];

        this.gameTable.gameGrid
            .map(tableRow => {
                tableRow.map(tableCell => {
                    this.attachCellClickEvent(tableCell);
                })
            })

        this.updateGameState(true, false, this.currentPlayer);

    }

    attachCellClickEvent(gridCell) {
        gridCell.cell.addEventListener('click', () => {
            this.handleCellClick(gridCell);
        })
    }

    handleCellClick(clickedCell) {
        if(!this.currentGameState.isRunning)
            return;

        const wasCellMarked = clickedCell.mark(this.currentPlayer);

        if (wasCellMarked) {
            this.switchCurrentPlayer();

            const gameCurrentState = this.hasWinner();

            if (gameCurrentState.hasWinner) {
                console.log(`VENCEDOR: ${gameCurrentState.currentPlayer.name}`);
            } else if (!gameCurrentState.isRunning) {
                console.log("EMPATE");
            }
        }
    }

    switchCurrentPlayer() {
        if (this.currentPlayer.symbol === this.firstPlayer.symbol) {
            this.currentPlayer = this.secondPlayer;
            this.playerWhoMadeLastMove = this.firstPlayer;
        } else {
            this.currentPlayer = this.firstPlayer;
            this.playerWhoMadeLastMove = this.secondPlayer;
        }
    }

    hasWinner() {
        const gridSize = this.gameTable.gridSize,
              fullGameTableCells = this.gameTable.getAllGridCells();

        if(GameGridCell.getValidCellsValues(fullGameTableCells).length === gridSize * gridSize) {
            return this.updateGameState(false, false, this.currentPlayer);
        }
        
        let winnerCells = [],
            tableHasElementsInSequence = false;

        for (let rowNum = 0; rowNum < gridSize; rowNum++) {
            const currentRow = this.gameTable.getGridRow(rowNum),
                rowCellValues = GameGridCell.getValidCellsValues(currentRow);

            if (rowCellValues.length === gridSize && ArrayUtil.areElementsIdenthical(rowCellValues)) {
                tableHasElementsInSequence = true;
                winnerCells.push(...currentRow);
                break;
            }
        }

        for (let colNum = 0; colNum < gridSize; colNum++) {
            const currentCol = this.gameTable.getGridCol(colNum),
                colCellValues = GameGridCell.getValidCellsValues(currentCol);

            if (colCellValues.length === gridSize && ArrayUtil.areElementsIdenthical(colCellValues)) {
                tableHasElementsInSequence = true;
                winnerCells.push(...currentCol);
                break;
            }
        }

        const mainDiagonalCells = this.gameTable.getGridMainDiagonal(),
            diagonalCellsValues = GameGridCell.getValidCellsValues(mainDiagonalCells);

        if (diagonalCellsValues.length === gridSize && ArrayUtil.areElementsIdenthical(diagonalCellsValues)) {
            winnerCells.push(...mainDiagonalCells);
            tableHasElementsInSequence = true;
        }

        const secondaryDiagonalCells = this.gameTable.getGridSecondaryDiagonal(),
            secondaryDiagCellsValues = GameGridCell.getValidCellsValues(secondaryDiagonalCells);

        if (secondaryDiagCellsValues.length === gridSize && ArrayUtil.areElementsIdenthical(secondaryDiagCellsValues)) {
            winnerCells.push(...secondaryDiagonalCells);
            tableHasElementsInSequence = true;
        }

        if (tableHasElementsInSequence) {
            return this.updateGameState(false, true, this.playerWhoMadeLastMove, winnerCells);
        } else {
            return this.updateGameState(true, false, this.currentPlayer);
        }

    }

    updateGameState(isGameRunning, gameHasWinner, currentPlayer, winnerCells = null) {
        this.currentGameState = {
            isRunning: isGameRunning,
            hasWinner: gameHasWinner,
            currentPlayer: currentPlayer,
            winnerCells: winnerCells
        }

        this.gameStateObservers
            .map(observerNotifyMethod => observerNotifyMethod(this.currentGameState));

        return this.currentGameState;
    }
}