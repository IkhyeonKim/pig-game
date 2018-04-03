/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Event listener : A function that performs an action based on a certain event. It waits for a specific event to happen.


/*window.onload = function(){
	document.querySelector('.dice').style.display ='none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

}*/

/*function initPage(){
	document.querySelector('.dice').style.display ='none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}*/

//위 두개 방법은 좀 느림..

var scores, roundScore, activePlayer, gamePlaying, winningScore, sixCounting, lastDice;

init(); // 위 두개 방법은 페이지가 로드 되고 난 다음에 실행되서 느림, 이렇게 바로 호출하면 빠름

//document.querySelector('#current-' + activePlayer).textContent = dice; //setter
//querySelector is easy to use, it lets us select stuff exactly the way we do it in CSS
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';




document.querySelector('.btn-roll').addEventListener('click',function(){
	
	if(gamePlaying){
		
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		
		document.getElementById('dice-1').src = 'dice-' + dice + '.png';
		document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';

		
		//3. Update the round scroe If the rolled number was not a 1
		if(dice === 6 && lastDice === 6){
			//player looses score 
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();
		}else if(dice !== 1 && dice2 !== 1){
			//Add score
			roundScore = roundScore + (dice + dice2);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			nextPlayer();
		}
		
		lastDice = dice;
	}

	
	
});

document.querySelector('.btn-hold').addEventListener('click',function(){
	
	if(gamePlaying){
		
		// Add Current score to Global score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		
		// Undefined, 0, null, or are coerced to false
		if(input){
			winningScore = input;
		}else{
			winningScore = 100;
		}

		// Check if player won the game
		if(scores[activePlayer] >= winningScore){

			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		}else{
			// Next player
			nextPlayer();
		}
	}


});

function dicing(){
	return Math.floor(Math.random() * 6) + 1;
}

function nextPlayer(){
	//Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		sixCounting =0;
		
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		// what toggle does is to add the class, if it's not there, and it it's there, to remove.
		
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
	
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	
	
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	
}

