const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let CardFirst, Cardsecond;

function flipCard() {
    if (lockBoard) return;
    if (this === CardFirst) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        CardFirst = this;
        return;
    }

    Cardsecond = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = CardFirst.dataset.framework === Cardsecond.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    CardFirst.removeEventListener('click', flipCard);
    Cardsecond.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        CardFirst.classList.remove('flip');
        Cardsecond.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [CardFirst, Cardsecond] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));