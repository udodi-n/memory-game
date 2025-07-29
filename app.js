const cardArray = [
    {
        name: 'marclou',
        img: 'images/marclou.png'
    },
    {
        name: 'sacha',
        img: 'images/sacha.png'
    },
    {
        name: 'eliana',
        img: 'images/eliana.png'
    },
    {
        name: 'pieter',
        img: 'images/pieter.png'
    },
    {
        name: 'garry',
        img: 'images/garry.png'
    },
    {
        name: 'rob',
        img: 'images/rob.png'
    },
    {
        name: 'marclou',
        img: 'images/marclou.png'
    },
    {
        name: 'sacha',
        img: 'images/sacha.png'
    },
    {
        name: 'eliana',
        img: 'images/eliana.png'
    },
    {
        name: 'pieter',
        img: 'images/pieter.png'
    },
    {
        name: 'garry',
        img: 'images/garry.png'
    },
    {
        name: 'rob',
        img: 'images/rob.png'
    },
]

const gridDisplay = document.querySelector("#grid")
let cardChosen = []
let cardChosenId = []
let cardsWon = []

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

shuffleCards(cardArray)

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const cardWrapper = document.createElement('div')
    cardWrapper.classList.add('card')
    cardWrapper.setAttribute('data-id', i)

    const front = document.createElement('img')
    front.src = cardArray[i].img
    front.classList.add('front')

    const back = document.createElement('img')
    back.src = 'images/blank.png'
    back.classList.add('back')

    cardWrapper.appendChild(front)
    cardWrapper.appendChild(back)
    gridDisplay.appendChild(cardWrapper)

    cardWrapper.addEventListener('click', flipCard)
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')
  if (cardChosenId.includes(cardId) || this.classList.contains('flipped')) return

  this.classList.add('flipped')
  cardChosen.push(cardArray[cardId].name)
  cardChosenId.push(cardId)

  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('.card')
  const [firstId, secondId] = cardChosenId
  const [firstCard, secondCard] = [cards[firstId], cards[secondId]]

  if (cardChosen[0] === cardChosen[1]) {
    cardsWon.push(cardChosen[0])
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
  } else {
    firstCard.classList.remove('flipped')
    secondCard.classList.remove('flipped')
  }

  cardChosen = []
  cardChosenId = []

  document.getElementById('result').textContent = cardsWon.length

  if (cardsWon.length === cardArray.length / 2) {
  document.getElementById('result').textContent = 'You win!'
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  })
}

}

createBoard()