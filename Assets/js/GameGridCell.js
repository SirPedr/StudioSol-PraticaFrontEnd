class GameGridCell {
    constructor(cell) {
        this.cell = cell;
        this.isFilled = false;
        this.position = {
            row: parseInt(cell.dataset.rowNumber),
            col: parseInt(cell.dataset.colNumber)
        };
    }

    mark(player) {
        if (!this.isFilled) {
            this.cell.innerHTML = player.symbol;
            this.cell.style.color = player.referenceColor;
            this.isFilled = true;

            return true;
        }

        return false;
    }

    static getValidCellsValues(gridCells) {
        return gridCells
            .filter(gridCell => gridCell.isFilled)
            .map(filledCell => filledCell.cell.innerHTML);
    }
}