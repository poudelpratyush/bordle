
let userInp = [];
let boxCount = 1;
let rowCount = 1;
let guessNum = 0;
const possibleKeys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", 
    "s", "t", "u", "v", "w", "x", "y", "z", "Enter", "Backspace"
];
let gameWon = false;

document.addEventListener("DOMContentLoaded", () =>{
    const createSquares = () =>{

        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

    createSquares();
})

const canTypeMore = () => {
    if (userInp.length != 5 && guessNum < 6){
        return true
    }
    return false
}

const getTodaysWord = async () =>{
    try{
        const response = await fetch("./words/words.json");
        if (!response.ok){
            console.log("Error");
            return "Error"
        }
        else{
            data = await response.json();

            const pastDate = new Date(2026, 0, 29);
            const today = new Date();
            const diffInMs = today - pastDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 3600 * 24));
            
            todaysWord = data[diffInDays];
            return data[diffInDays];
        }
    }
    catch (error){
        console.error(error);
        return "Error"
    }
}





const validateWord = async (word) =>{
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.status === 404){
            console.log("Word could not be found (404)");
            return false
        }
        else{
            return true
        }
    }
    catch (error){
        console.error(error);
        return false
    }
}


const clickedButton = (currKey) => {
    if (!gameWon){
        if (currKey != "ER" && currKey != "BS" && canTypeMore()){
            userInp.push(currKey);
            const currBox = document.getElementById(boxCount);
            currBox.textContent = currKey;
            boxCount++;
        }  
        else if (currKey == "ER"){
            if (!canTypeMore()){
                validateWord(userInp.join("")).then((valid) => {
                    if (valid){
                        changeColors(userInp.join(""));
                        getTodaysWord().then((word) => {
                            if (userInp.join("").toLowerCase() == word){
                                console.log("Win!!!");
                                gameWon = true;
                            }  
                            else{
                                guessNum ++;
                                userInp = [];
                            }
                        });
                    }
                });   
            }
        }
        else if (currKey == "BS"){
            if (userInp.length > 0){
                boxCount--;
                userInp.pop();
                removeFromGrid(boxCount);
            }
        }
    }
    console.log(userInp);
}


const changeColors = (userWord) =>{
    getTodaysWord().then((wordOfDay) =>{
        let wrd = userWord.toLowerCase();
        
        for (let i = 0; i < 5; i++){
            let currBox = 5 * (rowCount - 1) + (i + 1)
            const boxDOM = document.getElementById(currBox);
            if (wrd[i] == wordOfDay[i]){
                boxDOM.classList.add("greenSquare");
                const keyDOM = document.getElementById(wrd[i].toUpperCase());
                keyDOM.classList.add("greenKey");
            }
            else if (wordOfDay.includes(wrd[i])){
                const keyDOM = document.getElementById(wrd[i].toUpperCase());
                boxDOM.classList.add("graySquare");
                keyDOM.classList.add("grayKey");
            }
        }
        rowCount++;
    });
}


const container = document.querySelector(".keyboard");
container.addEventListener("click", (event) =>{
    if (event.target.tagName === "BUTTON"){
        let buttPressed = event.target.id;
        clickedButton(event.target.id);
    }
});

document.addEventListener("keyup", (event) => {
    if (possibleKeys.includes(event.key)){
        if (event.key !== "Backspace" && event.key !== "Enter"){
            clickedButton((event.key).toUpperCase());
        }
        else if (event.key == "Enter"){
            clickedButton("ER");
        }
        else if (event.key == "Backspace"){
            clickedButton("BS");
        }
    }
});

const removeFromGrid = (currCount) =>{
    const currBox = document.getElementById(currCount);
    currBox.textContent = "";
}