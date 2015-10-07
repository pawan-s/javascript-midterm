// set an card namr array
var GOT_array = ['Cersei','Melisandre','Sansa','Arya','Night_king','Daenerys','Eddard','Jon_snow','Jaime','Joffrey','Jon_snow','Cersei','Margaery','Joffrey','Margaery','Sansa','Daenerys','Melisandre','Tyrion','Arya','Jaime','Tyrion','Night_king','Eddard'];
var temp_values = [];
var temp_card_ids = [];
var flipped = 0;
var tried = 0;

Array.prototype.scramble = function(){ //random card position
    var j, temp;
    for(var i = this.length-1 ; i > 0 ; --i)
    {
		j = Math.floor(Math.random() * (i+1));
		//console.log("i = "+ i+" & j = " +j);
        temp = this[j];
        //console.log("temp = "+ temp);
        this[j] = this[i];
        //console.log("array j = "+ this[j]+" & array i = " +this[i]);
        this[i] = temp;
    }
}

function newBoard(){ // draw board game
	flipped = 0;
	var output = "";
    GOT_array.scramble();
	for(var i = 0; i < GOT_array.length; i++){
		output += '<div id="card_'+i+'" class="flip3D" onclick="flipCard(this,\''+ GOT_array[i]+'\')"></div>';
		//console.log(this+" "+ GOT_array[i]);
	}
	document.getElementById('gameBoard').innerHTML = output; // place a card
	startTimer();
}

function flipBack(){ // Flip all card back
	// reset card
	var card1 = document.getElementById(temp_card_ids[0]);
	var card2 = document.getElementById(temp_card_ids[1]);
	card1.style.background = 'url(img/GOT.png) no-repeat';
    card1.innerHTML = "";
	card2.style.background = 'url(img/GOT.png) no-repeat';
    card2.innerHTML = "";
    document.getElementById('tried').innerHTML = "Your have tried : "+tried+" times,&nbsp";
	resetTemp();
}

function resetGame(){ // restart game
	document.getElementById('gameBoard').innerHTML = "";
	document.getElementById('score').innerHTML = "Your score : 0";
	document.getElementById('tried').innerHTML = "Your have tried : 0 time,&nbsp";
	tried = 0;
	resetTimer();
	newBoard(); // new game
	resetTemp();
}

function resetTemp(){ // reset temp array
	temp_values = [];
    temp_card_ids = [];
}

function flipCard(card, value){
	if(card.innerHTML == "" && temp_values.length < 2){ // Check if card is not click and number of flip cards are not more than 2
		card.style.background = 'url(img/'+value+'.png) no-repeat';
		card.innerHTML = value; // Set value flag
		if(temp_values.length == 0){ // if this is the first flipped card -> add value to compare
			temp_values.push(value);
			temp_card_ids.push(card.id);
		} else if(temp_values.length == 1){ // if this is the second flipped card -> add value to compare
			temp_values.push(value);
			temp_card_ids.push(card.id);
			if(temp_values[0] == temp_values[1]){ // compare the first and second card
				flipped += 2; // set number of flipped card
				document.getElementById('score').innerHTML = "Your score : "+flipped/2;
				resetTemp();
				if(flipped == GOT_array.length){ // Check to see if the entire board is cleared
					pauseTimer();
					alert("Congratulation! You are the conqueror of the Westeros. It takes "+ minutes+":"+seconds+" minutes. Let's play again!");
					resetGame();
				}
			} else {
				++tried;
				setTimeout(flipBack, 800); // set time of hold the card if card isn't match. Time: 0.8 second
			}
		}
	}
}

function buildTime(t) {
    minutes = t.getMinutes();
    seconds = t.getSeconds();
    hours = t.getHours();
    if (minutes < 10) {
        minutes = "0"+minutes;
    }
    if (seconds < 10) {
        seconds = "0"+seconds;
    }
    if (hours > 0) {
        return "Time "+hours+":"+minutes+":"+seconds;
    } else {
        return "Time "+minutes+":"+seconds;
    }
}
 
function startTimer() { // start timer
    time = new Date();
    time.setSeconds(0); // Sets seconds to 0
    time.setMinutes(0); // Sets minutes to 0
    time.setHours(0);   // Sets hours to 0
    document.getElementById("timer").innerHTML = buildTime(time); // buildTime(time) returns 00:00
    // Update seconds, to be executed every second or 1000 miliseconds
	function changeTimer() {
    	time.setSeconds(time.getSeconds()+1);
    	document.getElementById("timer").innerHTML = buildTime(time);
	}
    // Set Interval to every second
    interval = setInterval(changeTimer, 1000);
}
 
function pauseTimer() {
    clearInterval(interval); // Pauses timer for popup
}
 
function resetTimer() { // Reset timer to 00:00
    time = "";
    clearInterval(interval); // Clear interval
    document.getElementById("timer").innerHTML = "Time 00:00"; // Put timer to 0's
}