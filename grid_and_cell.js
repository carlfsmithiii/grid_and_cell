class Grid {
    constructor({rowCount, columnCount, parentNode, gridOptions, cellOptions}) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.options = gridOptions || {classList: ['grid']};
        this.nodeReference = this._createGrid(cellOptions);
        parentNode.appendChild(this.nodeReference);
    }
    _createGrid(cellOptions) {
        this.model = [];
        const gridNode = this._createGridNode();
        gridNode.classList.add(...this.options.classList || ["grid"]);
        gridNode.style.setProperty('--row-count', this.rowCount);
        gridNode.style.setProperty('--column-count', this.columnCount);

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
        return gridNode;
    }
    getCellByPosition(row, column) {
        return this.model[row][column];
    }
    resetClickedStatuses() {
        for (let row of this.model) {
            for (let cell of row) {
                if (cell.clicked) {
                    cell.toggleClickedStatus();
                }
            }
        }
    }
    getNeighborsOf(cell) {
        const cellRow = cell.row;
        const cellColumn = cell.column;
        const neighborsList = [];
        for (let row = Math.max(0, Number(cellRow) - 1); row < Math.min(this.rowCount, Number(cellRow) + 2); row++) {
            for (let column = Math.max(0, cellColumn - 1); column < Math.min(this.columnCount, cellColumn + 2); column++) {
                if (!(row === cellRow && column === cellColumn)) {
                    neighborsList.push(this.model[row][column]);
                }
            }
        }
        return neighborsList;
    }
}

class Cell {
    constructor({row, column, cellOptions}) {
        this.row = row;
        this.column = column;
        this.options = cellOptions || {classList: ['cell']};
        const cellNode = document.createElement("div");
        cellNode.classList.add(...this.options.classList || ['cell']);
        cellNode.dataset.row = row;
        cellNode.dataset.column = column;
        this.nodeReference = cellNode;
        this.clicked = false;
        cellNode.onclick = () => this.toggleClickedStatus();
    }
    swapStyle(oldClasses, newClasses) {
        this.nodeReference.classList.remove(...oldClasses);
        this.nodeReference.classList.add(...newClasses);
    }
    toggleClickedStatus() {
        this.clicked = !this.clicked;
        this.clicked
            ? this.nodeReference.classList.add("clicked")
            : this.nodeReference.classList.remove("clicked");
    }
}

const gridParent = document.getElementById("grid-container");
const grid = new Grid({
    rowCount: 5, 
    columnCount: 5, 
    parentNode: gridParent
});