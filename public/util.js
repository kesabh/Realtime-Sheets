function evaluateFormula(formula, selfCellObject ){
    // formula = ( A1 + A2 ) 

    let formulaComps = formula.split(" ") ; 
    // formulaComps = [  "(" , "A1", "+", "A2", ")" ] 

    for(let i = 0 ; i < formulaComps.length ; i++){

        let component = formulaComps[i] ;                   
        if( component[0]>="A" && component[0] <="Z" ){
            let { rowid, colid } = getRowidColidFromAddress( component ) ; 
            let val = db[rowid][colid].value ; 

            // update the children of all the cells on which the current cell depends 
            if(selfCellObject){
                db[rowid][colid].children.push( selfCellObject.address ) ; 
                selfCellObject.parents.push( component ) ; 
            }


            formula = formula.replace( component, val ) ; 
        }
    }

    let result = eval( formula ) ; 
    return result ; 
}


function getRowidColidFromElement(element){
    let rowid = Number(element.getAttribute('rowid'));
    let colid = Number(element.getAttribute('colid'));

    return {rowid, colid} ; 
}

function getRowidColidFromAddress(address){
    // address  = "A1"  

    let colid = address.charCodeAt(0) - 65 ; 
    let rowid = Number( address.substring(1)) - 1 ; 

    return { rowid, colid } ; 

}

function updateValueOfChildren(children){
    // children = [ "B1, C1"]  ; 

    for(let i = 0 ; i < children.length ; i++){
        let address = children[i] ;      // B1 , C1 
        let {rowid, colid} = getRowidColidFromAddress( address ) ; 

        let cellObject = db[rowid][colid] ; 
        let val = evaluateFormula( cellObject.formula ) ; 

        cellObject.value = val ; 
        
        // update on UI 
        let cell = document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`) ; 
        cell.textContent = val ; 

        updateValueOfChildren( cellObject.children ) ; 
    }

}

function removeFormula( selfCellObject ) {
    selfCellObject.formula = "" ; 
    for(let i = 0 ; i < selfCellObject.parents.length ; i++){
        let parentAddress = selfCellObject.parents[i] ; 

        let {rowid, colid} = getRowidColidFromAddress(parentAddress) ; 
        let parentCellObject = db[rowid][colid] ; 

        let idx = parentCellObject.children.indexOf( selfCellObject.address ) ; 
        parentCellObject.children.splice( idx , 1 ) ; 
    }
    selfCellObject.parents = [ ]; 
}