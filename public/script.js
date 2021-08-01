let lastSelectedCell;
let addressBar = document.querySelector('#address');
let formulaInput = document.querySelector('#formula');

let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');

let alignLeft = document.querySelector('.align-left');
let alignRight = document.querySelector('.align-right');
let alignCenter = document.querySelector('.align-center');

let textColor = document.querySelector('.text-color');
let textFill = document.querySelector('.text-fill');

let fontSizeSelector = document.querySelector('.font-size-selector');
let fontFamilySelector = document.querySelector('.font-family-selector');

cellContainerDiv.addEventListener('scroll', function (e) {
    colNameContainerDiv.style.top = e.target.scrollTop + "px";
    selectAllDiv.style.top = e.target.scrollTop + "px";
    selectAllDiv.style.left = e.target.scrollLeft + "px";
    rowNameContainerDiv.style.left = e.target.scrollLeft + "px";

});

let cell = document.querySelectorAll('.cell');
for (let i = 0; i < cell.length; i++) {

    cell[i].addEventListener('focus', function (e) {
        lastSelectedCell = e.target;
        let { rowid, colid } = getRowidColidFromElement(e.target);
        let cellObject = db[rowid][colid];
        // let address = String.fromCharCode(65+colid) + (rowid + 1) + "" ; 
        let address = cellObject.address;
        let formula = cellObject.formula;
        addressBar.value = address;
        formulaInput.value = formula;
        // console.log(db[rowid][colid]) ; 

        // bold
        if (cellObject.styling.bold) {
            document.querySelector('.bold').classList.add("active-menu-icon");
            lastSelectedCell.style.fontWeight = "bold";
        } else {
            document.querySelector('.bold').classList.remove("active-menu-icon");
            lastSelectedCell.style.fontWeight = "";
        }

        //italic
        if (cellObject.styling.italic) {
            document.querySelector('.italic').classList.add("active-menu-icon")
            lastSelectedCell.style.fontStyle = "italic";
        } else {
            document.querySelector('.italic').classList.remove("active-menu-icon")
            lastSelectedCell.style.fontStyle = "";
        }

        //underline
        if (cellObject.styling.underline) {
            document.querySelector('.underline').classList.add("active-menu-icon");
            lastSelectedCell.style.textDecoration = "underline";
        } else {
            document.querySelector('.underline').classList.remove("active-menu-icon")
            lastSelectedCell.style.textDecoration = "";
        }

        alignLeft.classList.remove("active-menu-icon");
        alignRight.classList.remove("active-menu-icon");
        alignCenter.classList.remove("active-menu-icon");

        if (cellObject.styling.align == "left") {
            alignLeft.classList.add("active-menu-icon");
            lastSelectedCell.style.textAlign = "left";
        } else if (cellObject.styling.align == "right") {
            alignRight.classList.add("active-menu-icon");
            lastSelectedCell.style.textAlign = "right";
        } else if (cellObject.styling.align == "center") {
            alignCenter.classList.add("active-menu-icon");
            lastSelectedCell.style.textAlign = "center";
        }

        fontSizeSelector.querySelector(`option[value="${cellObject.styling.fontSize}"`).selected = "selected";
        fontFamilySelector.querySelector(`option[value="${cellObject.styling.fontFamily}"`).selected = "selected";

        if (document.querySelector('.focussed-cell'))
            document.querySelector('.focussed-cell').classList.remove("focussed-cell");
        lastSelectedCell.classList.add("focussed-cell");

        if (document.querySelector('.row-name-cell.highlight-colrow'))
            document.querySelector('.row-name-cell.highlight-colrow').classList.remove("highlight-colrow")
        if (document.querySelector('.col-name-cell.highlight-colrow'))
            document.querySelector('.col-name-cell.highlight-colrow').classList.remove("highlight-colrow")

        document.querySelectorAll('.col-name-cell')[colid].classList.add("highlight-colrow");
        document.querySelectorAll('.row-name-cell')[rowid].classList.add("highlight-colrow");

        socket.emit("cellFocussed", { username, rowid, colid });

    });

    cell[i].addEventListener('focusout', function (e) {
        let rowid = Number(e.target.getAttribute('rowid'));
        let colid = Number(e.target.getAttribute('colid'));
        let content = e.target.textContent;

        let cellObject = db[rowid][colid];

        if (cellObject.value == content) {
            return;
        }
        else {
            cellObject.value = content;
            if (cellObject.formula) {
                removeFormula(cellObject);
                formulaInput.value = '';
            }
            updateValueOfChildren(cellObject.children);
        }
        // console.log( db ) ; 
        // console.log(a)

        if (cellObject.visited) {
            return;
        }

        cellObject.visited = true;
        visitedCells.push({ rowId: rowid, colId: colid });

        console.log(sheetsDB);
    })

    cell[i].addEventListener("keyup", function (e) {
        // console.log(e.target.textContent) ; 
        let { rowid, colid } = getRowidColidFromElement(e.target);
        let dataObject = { rowid : rowid, colid : colid, text : e.target.textContent } ; 
        socket.emit("cellValueChanged", dataObject);
    })

}

// when the formula bar is out of focus 
formulaInput.addEventListener('focusout', function (e) {
    let formula = e.target.value;
    let rowid = lastSelectedCell.getAttribute("rowid");
    let colid = lastSelectedCell.getAttribute("colid");
    let cellObject = db[rowid][colid];
    if (formula && formula != cellObject.formula) {

        if (cellObject.formula) {
            removeFormula(cellObject);
        }


        let val = evaluateFormula(formula, cellObject);

        // cell value update 
        lastSelectedCell.textContent = val;

        //db update 
        cellObject.value = val;

        // cell formula update 
        cellObject.formula = formula;


        // update all children 
        updateValueOfChildren(cellObject.children);

        if (cellObject.visited) {
            return;
        }
        cellObject.visited = true;
        visitedCells.push({ rowId: rowid, colId: colid });


        console.log(db);
    }
})

