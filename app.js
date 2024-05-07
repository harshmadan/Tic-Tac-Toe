let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = false; 
let count =0;
let confirm = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[0,4,8],[1,4,7],[2,5,8],
    [2,4,6],[6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO === true){ //player O
            box.innerText = "O";
            turnO = false;
            count = count +1;
        } else { //player X
            box.innerText = "X";
            turnO = true;
            count = count +1;
        }
        box.disabled = true;
        checkWinner();
        if(count===9 && confirm == false)
        checkDraw();
    });
});
const checkDraw = () => {
    if(count === 9){
        msg.innerText = 'OOPS! Match Drawn'
        msgContainer.classList.remove("hide");
        count = 0;
    }
};
const resetGame = () => {
    turnO = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled =  false;
        box.innerText = "";
    }
};
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    disableBoxes();
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);
        //console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let p1Val = boxes[pattern[0]].innerText;
        let p2Val = boxes[pattern[1]].innerText;
        let p3Val = boxes[pattern[2]].innerText;

        if(p1Val != "" && p2Val != "" && p3Val != ""){
            if(p1Val === p2Val && p3Val===p2Val){
                console.log("Winner",p1Val);
                showWinner(p1Val)
                confirm = true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);