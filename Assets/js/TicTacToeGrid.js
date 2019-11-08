class TicTacToeGrid {
    constructor(gridSize = 3) {
        this.gameGrid = [];
        this.gridSize = gridSize;
        
        for(let i = 0; i < gridSize; i++) {
            this.gameGrid[i] = [];
        }

        this.drawTableInDOM(this.gameGrid);
    }

    drawTableInDOM(gameGrid) {
        const gridDOMEl = document.querySelector('main');

        for(let rowPosition = 0; rowPosition < this.gridSize; rowPosition++) {
            for(let colPosition = 0; colPosition < this.gridSize; colPosition++) {
                const gameGridCell = this.createGridCell(rowPosition, colPosition);

                gameGrid[rowPosition][colPosition] = gameGridCell;
                gridDOMEl.appendChild(gameGridCell.cell);
            }
        }
    }

    createGridCell(rowPosition, colPosition) {
        const cellDOMEl = document.createElement('span');
        
        cellDOMEl.innerHTML = '';
        cellDOMEl.dataset.rowNumber = rowPosition;
        cellDOMEl.dataset.colNumber = colPosition;
        
        return new GameGridCell(cellDOMEl);
    }
}
