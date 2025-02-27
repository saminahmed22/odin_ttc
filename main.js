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
function player(name, marker, moves){
    return {name, marker, moves}
}



// Game controller Module
const controller = (function(){

    let playerOneName = prompt("Enter the name of player one");
    let playerTwoName = prompt("Enter the name of player Two");
    while(playerOneName == playerTwoName){
        playerTwoName = prompt("Both player can't have the same name, enter a different one!")
    }

    let playerOne = player(playerOneName, "X", [])
    let playerTwo = player(playerTwoName, "O", [])

    let round = 1;
    let currentPlayer = round%2 == 0 ? playerTwo : playerOne;

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
        let askRestart = prompt("Restart(Y/n)?")
        if(askRestart == "Y" || askRestart == "y"){
            console.clear();
            Gameboard.resetBoard();
            round++;
            newGame();
        }
    }

    function newGame(){
        playerOne.moves = [];
        playerTwo.moves = [];
        let emptyCell = 9;
        while(emptyCell){
            Gameboard.displayBoard();
            let cell = prompt(`${currentPlayer.name}'s move[1-8]`);
            while(!cell || isNaN(cell) || cell > 8 || playerOne.moves.includes(cell) || playerTwo.moves.includes(cell)){
                cell = prompt(`Issue found, please re-enter`)
            }

            // Add move to current player's moves array
            currentPlayer.moves.push(cell)

            let marker = currentPlayer.marker;
            Gameboard.updateCell(cell, marker);

            if(checkWin(currentPlayer.moves)){
                Gameboard.displayBoard();
                console.log(`${currentPlayer.name} is the winner!`)
                restart();
                break;
            }
            else{
                // Update current player
                currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
                emptyCell -= 1;
            }
            // Checks for draw
            if(!emptyCell){
                Gameboard.displayBoard();
                console.log("Draw!")
                restart()
            }
        }

    }
    newGame()
})()





// const button = document.querySelector(".actionBtn");
// button.addEventListener("click", (event) => {
//     if(event.target.innerText == "Start"){
//         button.textContent = "End";
//     }
//     else if(event.target.innerText == "End"){
//         button.textContent = "Start"
//     }
// })


