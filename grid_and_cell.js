class Grid {
    constructor({rowCount, columnCount, parentNode, cellOptions}) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.nodeReference = this._createGrid(parentNode, cellOptions);
        parentNode.appendChild(this.nodeReference);
    }
    _createGrid(parentNode, cellOptions) {
        this.model = [];
        const gridNode = this._createGridNode();

        for (let row = 0; row < this.rowCount; row++) {
            this.model.push([]);
            for (let column = 0; column < this.columnCount; column++) {
                const cell = new Cell({column, row, cellOptions});
                this.model[row][column] = cell;
                gridNode.appendChild(cell.nodeReference);
            }
        }
        return gridNode;
    }
    _createGridNode() {
        const gridNode = document.createElement("div");
        gridNode.style.display = 'grid';
        gridNode.style.gridTemplateRows = `repeat(${this.rowCount}, 1fr)`;
        gridNode.style.gridTemplateColumns = `repeat(${this.columnCount}, 1fr)`;
        gridNode.style.width = '90vh';
        gridNode.style.height = '90vh';
        gridNode.style.margin = 'auto';
        return gridNode;
    }
}

class Cell {
    constructor({row, column, cellOptions}) {
        this.row = row;
        this.column = column;
        this.options = cellOptions;
        const cellNode = document.createElement("div");
        cellNode.classList.add(...this.options.classList);
        cellNode.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        cellNode.style.border = '1px solid white';
        cellNode.dataset.row = row;
        cellNode.dataset.column = column;
        this.nodeReference = cellNode;
    }

}

const gridParent = document.getElementById("grid-container");
const grid = new Grid({rowCount: 5, columnCount: 5, parentNode: gridParent, cellOptions: {classList: ["cell"]}});