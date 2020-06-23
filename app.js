/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//my coding pig game
var score, activePlayer, roundScore, gamePlaying;
init();
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1.Random number
		var dice;
		dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		//2.display the result
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		//3.update the round score if the rolled number was not 1
		if (dice !== 1) {
			//add player
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else {
			//next player
			nextPlayer();
		}
	}
});

//implementing hold functionality
document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//1.add round score to global score
		score[activePlayer] += roundScore;
		//2.update the ui
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
		//3.check if player won the game
		//	var x = document.querySelector('#score-' +activePlayer).textContent;
		var input = document.querySelector('.final-score').value;
		var winningScore;
		if(input)
			{
			    winningScore = input;
			}else{
				winningScore = 100;
			}
		//3.check if player won the game
		//	var x = document.querySelector('#score-' +activePlayer).textContent;
		if (score[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
			gamePlaying = false;
		}
		else {
			//4.next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//		if (activePlayer === 0)
	//			{
	//				activePlayer = 1;
	//			}
	//		else{
	//			activePlayer = 0;
	//		}
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	score = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
//	document.querySelector('.final-score').value = winningScore;
}