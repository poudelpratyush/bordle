
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

let userInp = [];
let boxCount = 1;
let needToChange = false;
const possibleKeys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", 
    "s", "t", "u", "v", "w", "x", "y", "z", "Enter", "Backspace"
];

const checkIfNeedToChange = () =>{
    if (userInp.length % 5 == 0 && userInp.length != 0){
        needToChange = true;
    }
    else{
        needToChange = false;
    }
}

const clickedButton = (currKey) => {
    checkIfNeedToChange();
    if (currKey != "ER" && currKey != "BS" && !needToChange){
        console.log("boxCount: ", boxCount);
        userInp.push(currKey);
        const currBox = document.getElementById(boxCount);
        currBox.textContent = currKey;
        boxCount++;
    }  
    else if (currKey == "ER"){
        if (needToChange){
            // we need to then check and post the first guess
        }
    }
    else if (currKey == "BS"){
        if (userInp.length > 0){
            boxCount--;
            userInp.pop();
            removeFromGrid(boxCount);
        }
    }
    console.log(boxCount);
    console.log(userInp);
}

const container = document.querySelector(".keyboard");
container.addEventListener("click", (event) =>{
    if (event.target.tagName === "BUTTON"){
        let buttPressed = event.target.id;
        console.log("event click button");
        clickedButton(event.target.id);
    }
});

document.addEventListener("keyup", (event) => {
    console.log("You pressed: ", event);
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
    console.log(currBox);
    currBox.textContent = "";
}