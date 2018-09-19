class Grid {
    constructor({rowCount, columnCount, parentNode, cellOptionsObject}) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this._createGrid(parentNode);
    }
    _createGrid(parentNode) {
        this.model = [];
        this.nodeReference = this._createGrideNode();
        parentNode.appendchild(this.nodeReference);

        for (let row = 0; row < this.rowCount; row++) {
            model.push([]);
            for (let column = 0; column < this.columnCount; column++) {
                const cell = new Cell({column, row});
                model[row][column] = cell;
                this.nodeReference.appendchild(cell.nodeReference);
            }
        }
    }
    _createGridNode() {
        const gridNode = document.createElement("div");
        gridNode.style.display = 'grid';
        gridNode.style.gridTemplateRows = `repeat(${this.rowCount}, 1fr)`;
        gridNode.style.gridTemplateColumns = `repeat(${this.columnCount}, 1fr)`;
        gridNode.style.width = '100%';
        gridNode.style.height = '100%';
        return gridNode;
    }
}

class Cell {
    constructor({row, column, optionsObject}) {
        this.row = row;
        this.column = column;
        this.options = optionsObject;
        const cellNode = document.createElementById("div");
        cellNode.classList.add(...this.options.classList);
        cellNode.dataset.row = row;
        cellNode.dataset.column = column;
        this.nodeReference = cellNode;
    }

}