const gameContainer = document.getElementById("game");

const COLORS = [
  "red","blue","green","orange","purple","red","blue","green","orange","purple"
];


let selectedCards = document.getElementsByClassName("selected")
let selectedCardsCount = 0
let correct = document.getElementsByClassName("correct")
const clicksReq = document.createElement("h3")
let clicks = 0
let scores = []


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {                                // While there are elements in the array
    let index = Math.floor(Math.random() * counter);   // Pick a random index
    counter--;                                         // Decrease counter by 1
    let temp = array[counter];                         // And swap the last element with it
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function loadDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");         // create a new div
    newDiv.classList.add(color);                          // give class attribute for the value we are looping over
    newDiv.addEventListener("click", handleCardClick);    // call function handleCardClick when div is clicked on
    gameContainer.append(newDiv);                         // append the div to the element with an id of game
  }
}

function loadClicksCounter(){
    clicksReq.classList.add("clicks-req")
    clicksReq.innerText = `Current Score: ${clicks} clicks`
    gameContainer.prepend(clicksReq); 
}


// TODO: Implement this function!
function handleCardClick(event) {
  if (selectedCardsCount < 2){
      selectedCardsCount++
      clicks++
      event.target.style.backgroundColor = event.target.classList   // set div to classList color on click
      event.target.classList.add("selected")
      console.log("you just clicked", event.target);   // you can use event.target to see which element was clicked
      event.target.removeEventListener("click", handleCardClick)
      console.log(selectedCardsCount)
      console.log(selectedCards)
      countClicks()   // refreshes clicks after click event
  }
  if (selectedCardsCount === 2){
    selectedCardsCount = 0
    matchCards(selectedCards)
  }
}

function countClicks(){
  clicksReq.innerText = `Current Score: ${clicks} clicks`
}


function matchCards(array){
  if (array[0].classList.value === array[1].classList.value){
    console.log('The colors match!')
    array[0].removeEventListener("click", handleCardClick)   // doesn't let paired cards be clickable again
    array[1].removeEventListener("click", handleCardClick)
    array[0].classList.add("correct")
    array[1].classList.add("correct")
    array[0].classList.remove("selected")
    array[0].classList.remove("selected")  // still array[0] because array is left with 1 element after previous one removed, so again index is 0
    console.log(array)
    win()
  }
  else {
    array[0].addEventListener("click", handleCardClick)   // let the 2 incorrect cards be clickable again
    array[1].addEventListener("click", handleCardClick)
    closeCards(array)
  }
}


function closeCards(arr){
  setTimeout(function(){
    console.log("The colors don't match!")
      arr[0].style.backgroundColor = "white"
      arr[1].style.backgroundColor = "white"
      arr[0].classList.remove("selected")
      arr[0].classList.remove("selected")
  }, 400)
}


function win(){
  if (correct.length === 10){
    const congrat = document.createElement("h2")
    congrat.innerText = "Great job, you got them all correct!"
    gameContainer.append(congrat)
    const playAgain = document.createElement("button")
    playAgain.innerText = "Play Again"
    playAgain.classList.add("play-again")
    gameContainer.append(playAgain)
    storeScores()
    
  }
}

function storeScores(){
  if (clicks > 0){   // prevents the re-set click counter from entering clicks array
    scores.push(clicks)
    localStorage.setItem("scores", JSON.stringify(scores))
    let bestScore = Math.min(...JSON.parse(localStorage.getItem("scores")))
    console.log(`bestScore: ${bestScore}`)
    let bestScor = document.createElement("h3")
    bestScor.innerText = `Best Score: ${bestScore} clicks`
    bestScor.classList.add("best-score")
    gameContainer.append(bestScor)
    againPlay()
  }
}

function againPlay(){
  document.querySelector("button").addEventListener("click", function(){
    gameContainer.innerHTML = ""   // clear all the colors
    shuffle(COLORS)
    loadDivsForColors(shuffledColors)   // load in new randomized cards
    clicks = 0;   // reset clicks to 0 for new game
    loadClicksCounter();   // display new clicks counter
  })
}


// when the DOM loads
loadDivsForColors(shuffledColors);
loadClicksCounter();   // show clicks counter from the getgo
storeScores()

