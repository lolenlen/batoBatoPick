
/* Bato-bato Pick Script below                */

let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins:0,
    loses:0,
    ties:0,
  }
 };

 updateScoreElement();

let isAutoPlaying = false;
let intervalID;


function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }


}

document.querySelector('.js-bButton').addEventListener('click', () => {
  playGame('BATO');
} );

document.querySelector('.js-pButton').addEventListener('click', () => {
  playGame('PAPEL');
} );

document.querySelector('.js-gButton').addEventListener('click', () => {
  playGame('GUNTING');
} );

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {playGame('BATO')
} else if (event.key === 's') {playGame('PAPEL')
} else if (event.key === 'd') {playGame('GUNTING')
} else if (event.key === 'r') { score.wins = 0;
                                score.loses =  0;
                                score.ties = 0;
                                localStorage.removeItem('score');
                                updateScoreElement();
} else if (event.key === 't') {autoPlay()}
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'GUNTING') {if (computerMove === 'BATO') {
      result = 'Talo ka!'
      } else if (computerMove === 'PAPEL') {
        result = 'Panalo ka!';
      } else if (computerMove === 'GUNTING') {
        result = 'Tabla kayo!';
      }
  } else if (playerMove === 'PAPEL') {if (computerMove === 'BATO') {
      result = 'Panalo ka!'
      } else if (computerMove === 'PAPEL') {
        result = 'Tabla kayo!';
      } else if (computerMove === 'GUNTING') {
        result = 'Talo ka!';
      }
  } else {if (computerMove === 'BATO') {
      result = 'Tabla kayo!'
      } else if (computerMove === 'PAPEL') {
        result = 'Talo ka!';
      } else if (computerMove === 'GUNTING') {
        result = 'Panalo ka!';
      }
  }
  
  if (result === 'Panalo ka!') {
    score.wins ++;
  } else if (result === 'Talo ka!') {
    score.loses ++;
  } else if (result === 'Tabla kayo!') {
    score.ties ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-move')
 .innerHTML = `Pato mo <img src="batoBatoPickPics/${playerMove}-emoji.png" class="move-icon"> <img src="batoBatoPickPics/${computerMove}-emoji.png" class="move-icon">  Pato ng Computer`;

 document.querySelector('.js-result')
 .innerHTML = result;

  /*alert(`Pato mo ay ${playerMove}. Pato ng Computer ay ${computerMove}, ${result}\nPanalo: ${score.wins}, Talo: ${score.loses}, Tabla: ${score.ties}`); */
}

  function updateScoreElement() {
    document.querySelector('.js-score')
 .innerHTML = `Panalo: ${score.wins}, Talo: ${score.loses}, Tabla: ${score.ties}`;
  };

  /* function updateMoveElement() {
    document.querySelector('.js-move')
 .innerHTML = `Pato mo ay ${playerMove}. Pato ng Computer ay ${computerMove}`;
  };

  function updateResultElement() {
    document.querySelector('.js-result')
 .innerHTML = result;
  };  */

//let computerMove = ''; //global variables 
function pickComputerMove() {
  const randomNumber = Math.random();
   
  let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3) {
   computerMove ='BATO';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
   computerMove ='PAPEL';
} else if (randomNumber >= 2/3 && randomNumber < 1) {
  computerMove ='GUNTING';
}

return computerMove;
}

/* Bato-bato Pick Script above */
