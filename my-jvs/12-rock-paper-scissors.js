const score 
  = JSON.parse(localStorage.getItem('score'))
  || {
    wins: 0,
    losses: 0,
    ties: 0
  };

let isAutoPlaying=false;
let intervalID;
renderScore();

function renderScore(){
  const scoreElement=document.querySelector('.totalScore');
  const {wins,losses,ties}=score;  
  scoreElement.innerHTML=`Wins: ${wins}, Losses: ${losses}, Ties: ${ties}`;
}

renderScore();

function makeMove(myMove){
  const computerMove=chooseRandomMove();
  const resultElement=document.querySelector('.js-result-div');
  if(myMove===computerMove){
    score.ties++;
    resultElement.innerHTML=`
      <p class="result">Tie.</p>
      <p class="js-moves-chosen">You 
        <img src="${myMove}-emoji.png" class="my-move">
        <img src="${computerMove}-emoji.png" class="computer-move">
        Computer
      </p>`
  } else if(
    (myMove==='rock' && computerMove==='scissors')
    ||(myMove==='paper' && computerMove==='rock')
    ||(myMove==='scissors'&&computerMove==='paper')
  ){
    score.wins++;
    resultElement.innerHTML=`
      <p class="result">You win.</p>
      <p class="js-moves-chosen">You 
        <img src="${myMove}-emoji.png" class="my-move">
        <img src="${computerMove}-emoji.png" class="computer-move">
        Computer
      </p>`
  } else{
    score.losses++;
    resultElement.innerHTML=`
      <p class="result">You lose.</p>
      <p class="js-moves-chosen">You 
        <img src="${myMove}-emoji.png" class="my-move">
        <img src="${computerMove}-emoji.png" class="computer-move">
        Computer
      </p>`
  }
  renderScore();

  localStorage.setItem('score',JSON.stringify(score));
}

function chooseRandomMove(){
  const randomNumber=Math.random();
  if (randomNumber<1/3)
    return 'rock';
  else if(randomNumber<2/3)
    return 'paper';
  else return 'scissors';
}

function resetScore(){ 
  score.wins=score.losses=score.ties=0;
  localStorage.setItem('score',JSON.stringify(score));
  renderScore();
}

function autoPlay(){
  const autoPlayElement=document.querySelector('.auto-play-button');
  if (!isAutoPlaying){
    autoPlayElement.innerHTML="Stop Play";
    intervalID = setInterval(function(){
      const myMove=chooseRandomMove();
      makeMove(myMove);
    },1000)
    isAutoPlaying=true;
  }
  else{
    clearInterval(intervalID);
    autoPlayElement.innerHTML="Auto Play";
    isAutoPlaying=false;
  }
}
