var i, count = 0;

window.onload = () => { 
    var boardBoxWidth = document.getElementById("todoHolder").offsetWidth;
    console.log("Board Box Width = " + boardBoxWidth);
    var boards = document.getElementsByClassName("todoBox");
    console.log("Board Count = " + boards.length);
    console.log("Board Width = " + boards[0].clientWidth);
    var columns = (Math.floor(boardBoxWidth /  ((boards[0].clientWidth))) );
    console.log("Columns = " + columns);
    var emptyBoardsNeeded = (boards.length % columns) === 0 ? 0 : columns - (boards.length % columns);

    console.log("empty needed = " + emptyBoardsNeeded);
    for (i = 0; i < emptyBoardsNeeded; i++) {
        var emptyDiv = document.createElement("DIV");
        emptyDiv.setAttribute("class", "empty");
        document.getElementById("boardBoxTodo").appendChild(emptyDiv);
    }
}
