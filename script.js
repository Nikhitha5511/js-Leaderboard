const onbuttonClick=(event)=>{
    const button=event.target;
    const buttonText=event.target.innerText;
    if(buttonText==='🗑'){
    button.parentElement.parentElement.remove();
    }
    else if (buttonText === "+5" || buttonText === "-5") {
        const scoreElement = button.parentElement.previousElementSibling;
        let currentScore = parseInt(scoreElement.innerText);
        currentScore += buttonText === "+5" ? 5 : -5;
        currentScore = Math.max(currentScore, 0);
    
        scoreElement.innerText = currentScore;
        sortCards(); 
      }
    };

const createCard =(firstName,lastName,country,score)=>{
    const currentDate = new Date();
    const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate);
    const formattedDate = `${monthAbbreviation.toUpperCase()} ${currentDate.getFullYear()}: ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
 const cardContents=`<div>
                    <p>${firstName} ${lastName}</p>
                    <p>${formattedDate}</p>
                    </div>
                    <div class="country">${country}</div>
                    <div class="score">${score}</div>
                    <div class="container-button">
                    <button>🗑</button>
                    <button>+5</button>
                    <button>-5</button>
                    </div>`;

    const card= document.createElement("div");
    card.classList.add("card");
    card.innerHTML=cardContents;
    card.children[3].addEventListener("click",onbuttonClick);
    return card;

}

const cardContainer=document.getElementById("cards-container");

const sortCards=()=>{
    const cards=document.querySelectorAll(".card");
    const cardArray =Array.from(cards);
    cardArray.sort((card1,card2)=>{
    const score1 = parseInt(card1.children[2].innerText);
    const score2 = parseInt(card2.children[2].innerText);
    if(score1>score2){
        return -1;
    }
    else if(score1 <=score2){
        return 1;
    }
    else{
        return 0;
    }
    });
    cardArray.forEach((card)=>{
    cardContainer.append(card);
    });
}

const addPlayerForm = document.getElementById("form-container");
addPlayerForm.addEventListener("submit",(event)=>{
event.preventDefault();
const errorMsg = document.getElementsByClassName("error-msg");
errorMsg[0].style.display ="none";

const firstName =event.target.children[0].value;
const lastName =event.target.children[1].value;
const country =event.target.children[2].value;
const score = event.target.children[3].value;

if(!firstName || !lastName ||!country || !score){
    errorMsg[0].style.display="block";
    return;
}
console.log(errorMsg);

console.log(firstName, lastName, country, score);

const card =createCard(firstName,lastName,country,score);
cardContainer.appendChild(card);
event.target.reset();
sortCards();

})