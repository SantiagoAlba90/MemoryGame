const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// Assuming COLORS and gameContainer are defined as before

function shuffle(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  
  let shuffledColors = shuffle(COLORS);
  let openCards = [];
  let matchesFound = 0;
  let isWaiting = false;
  
  function createDivsForColors(colorArray) {
    colorArray.forEach(color => {
      const card = document.createElement("div");
      card.classList.add(color);
      card.addEventListener("click", handleCardClick);
      gameContainer.appendChild(card);
    });
  }
  
  function handleCardClick(event) {
    if (isWaiting || event.target.classList.contains("matched")) return;
  
    const selectedCard = event.target;
    if (openCards.includes(selectedCard)) return; // Prevent clicking the same card tp times
  
    selectedCard.style.backgroundColor = selectedCard.className;
    openCards.push(selectedCard);
  
    if (openCards.length === 2) {
      isWaiting = true;
      const [firstCard, secondCard] = openCards;
      
      if (firstCard.className === secondCard.className) {
        //  match
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchesFound += 2;
        resetRound();
      } else {
        // No match 
        setTimeout(() => {
          firstCard.style.backgroundColor = "";
          secondCard.style.backgroundColor = "";
          resetRound();
        }, 1000);
      }
    }
  
    
    if (matchesFound === COLORS.length) {
      setTimeout(() => alert("Game Over!"), 500);
    }
  }
  
  function resetRound() {
    openCards = [];
    isWaiting = false;
  }
  
  createDivsForColors(shuffledColors);
  