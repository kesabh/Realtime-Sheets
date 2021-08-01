

bold.addEventListener('click', function(e){
    addStyle("bold") ; 
}) ; 

italic.addEventListener('click', function(e){
    addStyle("italic") ; 
}) ; 

underline.addEventListener('click', function(e){
    addStyle("underline") ; 
}) ; 

function addStyle( css ){
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ; 

    if( css == "bold"){
        if( cellObject.styling.bold ){
            lastSelectedCell.style.fontWeight = "" ;  
            bold.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.fontWeight = "bold" ;  
            bold.classList.add("active-menu-icon") ; 
        }
    }else if( css == "italic"){
        if( cellObject.styling.italic ){
            lastSelectedCell.style.fontStyle = "" ;  
            italic.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.fontStyle = "italic" ;  
            italic.classList.add("active-menu-icon") ; 
        }
    }else if( css == "underline"){
        if( cellObject.styling.underline ){
            lastSelectedCell.style.textDecoration = "" ;  
            underline.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.textDecoration = "underline" ;  
            underline.classList.add("active-menu-icon") ; 
        }
    }

    cellObject.styling[css] = !cellObject.styling[css] ; 
}

alignLeft.addEventListener('click', function(e){
    if( alignLeft.classList.contains("active-menu-icon") )
        return ; 
    alignCellText("left") ; 
}) ; 
alignRight.addEventListener('click', function(e){
    if( alignRight.classList.contains("active-menu-icon") )
    return ; 
    alignCellText("right") ; 
}) ; 
alignCenter.addEventListener('click', function(e){
    if( alignCenter.classList.contains("active-menu-icon") )
    return ; 
    alignCellText("center") ; 
}) ; 

function alignCellText( dir ){
    if( !lastSelectedCell ){
        return ; 
    }
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ; 
    alignLeft.classList.remove("active-menu-icon");
    alignRight.classList.remove("active-menu-icon");
    alignCenter.classList.remove("active-menu-icon");
    
    if( dir == "left"){

        alignLeft.classList.add("active-menu-icon") ; 
        lastSelectedCell.style.textAlign = "left" ;
        cellObject.styling.align = "left"  ; 
    }else if(dir == "right") {
        alignRight.classList.add("active-menu-icon") ; 
        lastSelectedCell.style.textAlign = "right" ; 
        cellObject.styling.align = "right"  ;
    }else if( dir == "center" ){
        alignCenter.classList.add("active-menu-icon") ; 
        lastSelectedCell.style.textAlign = "center" ; 
        cellObject.styling.align = "center"  ;
    }
}

textColor.addEventListener('click' , function(e){
    let colorPicker = textColor.querySelector('input') ; 
    colorPicker.click() ; 
    colorPicker.addEventListener('input', function(e){
        if( !lastSelectedCell ){
            return ; 
        }
        setColor("color", e.target.value) ; 
    });

})

textFill.addEventListener('click' , function(e){
    let colorPicker = textFill.querySelector('input') ; 
    colorPicker.click() ; 
    colorPicker.addEventListener('input', function(e){
        if( !lastSelectedCell ){
            return ; 
        }
        setColor( "backgroundColor" , e.target.value ) ; 
    }) ; 
}) ;

function setColor(css, color ){
    lastSelectedCell.style[css] = color ; 
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ; 
    cellObject.styling[css] = color ; 
}

fontSizeSelector.addEventListener('input', function(e){

    if(!lastSelectedCell){
        return;
    }
    lastSelectedCell.style.fontSize = e.target.value ;
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ;
    cellObject.styling.fontSize = e.target.value ; 
})

fontFamilySelector.addEventListener('input', function(e){

    if(!lastSelectedCell){
        return;
    }
    lastSelectedCell.style.fontFamily = e.target.value ;
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ;
    cellObject.styling.fontFamily = e.target.value ; 
})