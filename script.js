'use strict';
// Initialisation des variables.
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const die = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rolling = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
let currentScore = 0;
let activePlayer = 0;
let onGoing = true;

// Fonction table-rase.
const start = () => {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  onGoing = true;
  player0.classList.add('player--active');    // Ce sont les lignes qui 
  player1.classList.remove('player--active'); // permutent l'habillage de
  player0.classList.remove('player--winner'); // l'overlay en fonction 
  player1.classList.remove('player--winner'); // du statut de la partie
  die.classList.add('hidden');
};

start();

// Fonction qui passe la main entre les deux joueurs.
const switchSide = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Event lancé de dé via le bouton "roll".
rolling.addEventListener('click', function () {
  const roll = Math.trunc(Math.random() * 6) + 1;      // Un D6.
  die.classList.remove('hidden'); // On affiche le dé.
  die.src = `dice-${roll}.png`;   // On attribue l'image correspondant au résultat.
  if (roll !== 1) {                
    currentScore += roll;         // Si le résultat est différent de 1, on incrémente le score temporaire.  
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchSide();                 // Autrement on passe la main.
  }
});

// Event encaisser le score temporaire dans le score final.
hold.addEventListener('click', () => {
  if (onGoing) {                    // Si la partie est en cours...
    let finalScore = Number(         
      document.getElementById(`score--${activePlayer}`).textContent  // Variable reflétant le score final,
    );                                                               // à laquelle on additionne le score temporaire.
    finalScore += Number(
      document.getElementById(`current--${activePlayer}`).textContent
    );

    document.getElementById(`score--${activePlayer}`).textContent = finalScore;
    if (document.getElementById(`score--${activePlayer}`).textContent >= 100) { // Condition de victoire.
      onGoing = false;    // Verrouillage du bouton hold.
      die.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchSide();
    }
  }
});

// Bouton redémarrer la partie
newGame.addEventListener('click', function () {
  start();
});

