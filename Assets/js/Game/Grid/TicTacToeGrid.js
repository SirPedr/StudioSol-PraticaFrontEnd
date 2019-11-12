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
        
        return new GameGridCell(cellDOMEl);
    }

    highlightGridCells(gridCellsToHighlight, colorToHighlight) {
        const cssVariables = getComputedStyle(document.body);

        this.getAllGridCells().forEach(gridCell =>
             gridCell.cell.style.color = cssVariables.getPropertyValue("--inactiveElementColor")
        );

        gridCellsToHighlight.forEach(gridCell => 
            gridCell.cell.style.color = colorToHighlight
        );
    }

    getGridCol(colNumber) {
        if(colNumber > this.gridSize - 1)
            return [];

        const requestedColCells = [];

        this.gameGrid
            .map(tableRow => {
               tableRow
               .map((tableCell, colIndex) => {
                   if(colIndex === colNumber)
                    requestedColCells.push(tableCell);
                });
            });
        
        return requestedColCells;
    }

    getGridRow(rowNumber) {
        if(rowNumber > this.gridSize - 1)
            return [];

        const requestedRowCells = [];

        this.gameGrid
            .map((tableRow, rowIndex) => {
                if(rowIndex === rowNumber) {
                    requestedRowCells.push(...tableRow);
                }
            });

        return requestedRowCells;
    }

    getGridMainDiagonal() {
        const mainDiagonalCells = [];

        this.gameGrid
            .map((tableRow, rowIndex) => {
                tableRow
                .map((tableCell, colIndex) => {
                    if(rowIndex === colIndex) {
                        mainDiagonalCells.push(tableCell);
                    }
                })
            });
        
        return mainDiagonalCells;
    }

    getGridSecondaryDiagonal() {
        const secondaryDiagonalCells = [];

        this.gameGrid
            .map((tableRow, rowIndex) => {
                tableRow
                .map((tableCell, colIndex) => {
                    if(rowIndex + colIndex === this.gridSize - 1) {
                        secondaryDiagonalCells.push(tableCell);
                    }
                })
            });
        
        return secondaryDiagonalCells;
        
    }

    getAllGridCells() {
        const gridCells = [];

        this.gameGrid
        .map(tableRow => gridCells.push(...tableRow));

        return gridCells;
    }

    clearTable() {
        this.gameGrid
        .map(tableRow => {
            tableRow.map(tableCell => {
                tableCell.clearCell();
            })
        })
    }
}
