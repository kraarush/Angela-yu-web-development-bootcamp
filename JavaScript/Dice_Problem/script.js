document.querySelector("#btn1").addEventListener("click",changeDice);

function changeDice(){
    var randomNumber1 = Math.floor((Math.random() * 6) + 1);
    var randomNumber2 = Math.floor((Math.random() * 6) + 1);

    document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
    document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

    document.querySelector("#winnerName").textContent = declareWinner(randomNumber1,randomNumber2);
}

function declareWinner(randomNumber1,randomNumber2){
    if(randomNumber1 == randomNumber2){
        return "Tie";
    }
    if(randomNumber1 > randomNumber2){
        return "Player 1 won";
    }
    return "Player 2 won";
}