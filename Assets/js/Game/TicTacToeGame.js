class TicTacToeGame {
    constructor(gameGrid, firstPlayer, secondPlayer) {
        this.gameTable = gameGrid;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;

        this.currentPlayer = firstPlayer;
        this.currentPlayer.statistics.startMoveTimeCount();
        this.playerWhoMadeLastMove = secondPlayer;

        this.gameStateObservers = [];

        this.gameTable.gameGrid
            .map(tableRow => {
                tableRow.map(tableCell => {
                    this.attachCellClickEvent(tableCell);
                })
            })

        this.setGameState(true, false, this.currentPlayer);
        
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
            this.currentPlayer.statistics.stopMoveTimeCount();
            this.switchCurrentPlayer();

            const gameCurrentState = this.recalculateGameState();

            if (gameCurrentState.hasWinner) {
                gameCurrentState.currentPlayer.statistics.increaseScore();
                this.gameTable.highlightGridCells(gameCurrentState.winnerCells, gameCurrentState.currentPlayer.referenceColor);
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

        this.currentPlayer.statistics.startMoveTimeCount();
    }

    recalculateGameState() {
        const gridSize = this.gameTable.gridSize;        
        
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


        const fullGameTableCells = this.gameTable.getAllGridCells();

        if (tableHasElementsInSequence) {
            return this.setGameState(false, true, this.playerWhoMadeLastMove, winnerCells);

        } else if(GameGridCell.getValidCellsValues(fullGameTableCells).length === gridSize * gridSize) {
            return this.setGameState(false, false, this.currentPlayer);

        } else {
            return this.setGameState(true, false, this.currentPlayer);
        }

    }

    setGameState(isGameRunning, gameHasWinner, currentPlayer, winnerCells = null) {
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

    resetGame() {
        const playerRandomIndex = RandomUtil.getRandomIntInRange(0, 2);
        let nextPlayer;

        if(playerRandomIndex % 2 == 0) {
            nextPlayer = this.firstPlayer;
        } else {
            nextPlayer = this.secondPlayer;
        }

        this.currentPlayer = nextPlayer;

        this.gameTable.clearTable();
        this.setGameState(true, false, this.currentPlayer);
    }

    getStatistics() {
        return {
            firstPlayer: this.firstPlayer,
            secondPlayer: this.secondPlayer,
            totalGameTime: this.firstPlayer.statistics.totalTimeSpent + this.secondPlayer.statistics.totalTimeSpent
        }
    }
}