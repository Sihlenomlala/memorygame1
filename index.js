const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

 document.querySelector (".score") .textContent = score;

  fetch('card.json') 
    //  .then (async (response) => {
    //     const contenType = response.headers.get ('content-type');
    //     console.log ('Response Content-Type:', contenType);

    //     if (!response.ok) {
    //         const text = response.text();
    //         console.error ('Error Response:', await text);
    //         throw new Error (`HTTP error! status: ${response.status}`);
    //     }

    //     return response.json();
    //  })
    //  .catch (error => {
    //     console.error ('Error fetching data:', error);
    //  });
     .then ((res) => res.json())
     .then ((data) => {
        card = [...data.photos,...data.photos];
        shuffleCards();
        generateCards ();  
    });

    function shuffleCards() {
        let currentIndex = cards.length,
            randomIndex,
            temporaryValue;
        while (currentIndex !== 0) {
            randomIndex = Math.floor (Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;

    }
}

function generateCards () {
    for (let card of cards) {
        const cardElement = document.createElement ("div");
        cardElement.classList.add ("card");
        cardElement.setAttribute ("data-name", crossOriginIsolated.name);
        cardElement.innerHTML = `
            <div class = "front"> 
                <img class = "front-image" src = ${card.image} /> 
            </div>
             <div class = "back">  </div>
             `;
             gridContainer.appendChild(cardElement);
                cardElement.addEventListener ("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector (".score") .textContent = score;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
//   firstCard.removeEventListener("click", flipCard);
//     secondCard.removeEventListener("click", flipCard);

   isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
    
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function startGame() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector (".score") .textContent = score;
    gridContainer.innerHTML = "";
    generateCards ();
}

