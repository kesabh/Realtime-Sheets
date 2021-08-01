socket.emit("userConnected", username) ; 

socket.on("cellFocussed", function(cellData){
    if( document.querySelector(".realtime-active-cell") ){
        document.querySelector(".realtime-active-cell").classList.remove("realtime-active-cell") ; 
        document.querySelector(".username-div").remove() ; 
    }

    let {rowid , colid} = cellData ; 
    let cell = document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`) ; 

    let usernameDiv = document.createElement('div') ; 
    usernameDiv.textContent = cellData.username ; 
    usernameDiv.classList.add("username-div") ; 
    cell.append(usernameDiv) ; 
    
    cell.classList.add("realtime-active-cell") ; 

}) ; 

socket.on("cellValueChanged", function(dataObject){
    let div = document.querySelector(`div[rowid="${dataObject.rowid}"][colid="${dataObject.colid}"]`) ; 
    div.textContent = dataObject.text ; 
})