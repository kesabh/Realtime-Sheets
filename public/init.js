let cellContainerDiv = document.querySelector('.cell-container');
let colNameContainerDiv = cellContainerDiv.querySelector('.col-name-container');
let rowNameContainerDiv = cellContainerDiv.querySelector('.row-name-container');
let allCellsDiv = cellContainerDiv.querySelector('.all-cells');
let selectAllDiv = document.querySelector('.select-all');

let username = prompt("Enter your name !") ;

function createCells() {
    for (let i = 0; i < 26; i++) {
        colNameContainerDiv.innerHTML += "<div class='col-name-cell'>" + String.fromCharCode(65 + i) + "</div>"
    }

    for (let i = 1; i <= 100; i++) {
        rowNameContainerDiv.innerHTML += "<div class='row-name-cell'>" + i + "</div>"
    }

    let allCells = "";
    for (let i = 0; i < 100; i++) {
        allCells += '<div class="row">'
        for (let j = 0; j < 26; j++) {
            allCells += '<div class="cell" contenteditable="true" rowid=' + i + '  colid=' + j + ' spellcheck="false"></div>'
        }
        allCells += '</div>'
    }
    allCellsDiv.innerHTML = allCells;
}
createCells();

let sheetsDB = [];                  // [ {db , visitedcells} , {} , {}     ]

let db;  // it is gonna be active db 
let visitedCells;      // will contain location of cells having some content
function createDB() {
    let newDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let address = String.fromCharCode(65 + j) + (i + 1) + "";
            let cellObject = {
                address: address,
                value: "",
                formula: "",
                children: [],
                parents: [],
                visited: false,
                styling: { 
                    bold: false, 
                    italic: false,
                    underline: false, 
                    align: "left", 
                    fontSize : "16px" , 
                    fontFamily : "Times New Roman" , 
                    color : "black" ,
                    backgroundColor : "white" 
                }
            };

            row.push(cellObject);
        }

        newDB.push(row);
    }
    db = newDB;                // active db 
    visitedCells = [];
    sheetsDB.push({ db: db, visitedCells: visitedCells });      // adding in all sheets database
}
createDB();