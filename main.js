const Gameboard = (function(){

    let Board = [" "," "," "," "," "," "," "," "," "];
    function displayBoard() {
        console.log(
            `
                  |     |     
               ${Board[0]}  |  ${Board[1]}  |  ${Board[2]}  
            ______|_____|_____
                  |     |     
               ${Board[3]}  |  ${Board[4]}  |  ${Board[5]}  
            ______|_____|_____
                  |     |     
               ${Board[6]}  |  ${Board[7]}  |  ${Board[8]}  
                  |     |     `
        );
    };

    function updateCell(index, marker){
        Board[index] = marker;
    }

    function resetBoard(){
        Board.fill(" ");
    };

    return{displayBoard, updateCell, resetBoard};
})();




// Creates Player
function player(name, marker, moves, color){
    return {name, marker, moves, color}
}



// Game controller Module
const controller = (function(){

    let playerOneName = "Samin";
    let playerTwoName = "Pamin";

    let playerOne = player(playerOneName, "X", [], "#EA3323")
    let playerTwo = player(playerTwoName, "O", [], "#0000F5")

    

    const boxes = document.querySelectorAll(".box");

    function checkWin(moves){

        const winningSets = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
        ]
        
        const check = winningSets.some(set => set.every(move => moves.includes(move)))
        return check;
    }

    function restart(){
        const button = document.querySelector(".actionBtn");
        button.style.display = "block";
        button.addEventListener("click", () => {
            location.reload();
        })
    }

    function newGame(){
        let currentPlayer = playerOne;
        let emptyCell = 9;
        let resultDiv = document.querySelector(".resultDiv");
        console.log(emptyCell);
        boxes.forEach(box => {
            
            box.addEventListener("click", () => {
                
                let cell = box.id;
                
                // checks if cell is occupied or not
                if(!box.querySelector("img") && emptyCell !== "filled"){
                    const image = document.createElement("img");
                    image.setAttribute("src", `icons/${currentPlayer.marker}.svg`);
                    box.appendChild(image);

                    // Add move to current player's moves array
                    currentPlayer.moves.push(cell)
                    Gameboard.updateCell(cell, currentPlayer.marker);
                    Gameboard.displayBoard();

                    if(checkWin(currentPlayer.moves)){
                        emptyCell = "filled";
                        console.log(`${currentPlayer.name} is the winner!`)
                        resultDiv.textContent = `${currentPlayer.name} wins!`;

                        restart();
                    }
                    else{
                        // Update current player
                        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
                        emptyCell -= 1;
                        console.log(emptyCell);
                    }
                    // Checks for draw
                    if(emptyCell <= 0){
                        console.log("Draw!");
                        resultDiv.textContent = "Draw";
                        restart();
                    }
                }
            })
        })
    }
    newGame()
})()


