
var maxNum = 100;

var gameOn = {
  guess: document.getElementsByTagName("button")[0], //click event
  reset: document.getElementById("reset"),
  inputBox: document.getElementById('enter_number'),
  initNum: 0,
  random: Math.floor(Math.random() * (maxNum - 0 + 1) + 0),
  userInput: document.getElementById("enter_number").value,
  
  initialize: function() {

   //Prevent browser default onclick behaviour
   gameOn.guess.addEventListener("click", function (event) {
      event.preventDefault();
      gameOn.play();
   });

  // Bind a click of the reset button to browser reload
  gameOn.reset.addEventListener("click", function (event) {
    event.preventDefault();
      gameOn.resetGame();
   });

  // Bind enter key to the gameplay object function for browsers that don't always interpret an enter press as a form submission.
  gameOn.inputBox.addEventListener('keypress', function(e) {
     if (e.which == 13) {
      gameOn.play(); 
      }
  });
  },

  //VALIDATE USERS INPUT
  numValidate: function(userInput) {

    if(userInput === " " || isNaN(userInput)){
      document.getElementById("demo").innerHTML = "Please Enter a valid Number";
    }
    else if(0 > userInput){
      document.getElementById("demo").innerHTML = "You have to use positive Numbers";
    }
    else if(userInput > maxNum){
      document.getElementById("demo").innerHTML = "Your Number Should be within a range of One(1) to Hundred(100)";
    }
    else{
      return true;
    }
    return false;
  },

  //GAME CONFIGURATION
  play: function(userInput) {
   
    userInput = parseInt(document.getElementById('enter_number').value, 10);
    if(!gameOn.numValidate(userInput)){
      return;
    }
    if(userInput == this.random){
      document.getElementById("demo").innerHTML = "You { GOT IT } right.";
    }
    else if(Math.abs(this.random - userInput) > Math.abs(this.random - this.initNum)){
      document.getElementById("demo").innerHTML = "Your getting cold! Do you feel comfortable?";
    }
    else if(Math.abs(this.random - userInput) < Math.abs(this.random - this.initNum)){
      document.getElementById("demo").innerHTML = "Great!! Let's warm this place up a little more";
    }
    this.initNum = userInput;
    console.log(this.random);
    gameOn.progress_bar();
  },

  //PLAY AGAIN (RESET)
  resetGame: function (){
            this.random = Math.round(Math.random() * 100);
            this.userInput.value = " ";
            this.inputBox.value  = " ";
            document.getElementById("demo").innerHTML = "Let's Go....";
    },

  //PROGRESS BAR ANIMATION
  progress_bar: function() {
    var pBar;
    if (this.random>50) {
      pBar = parseInt(100-((Math.abs(this.random - this.initNum)/Math.abs(this.random-0)) * 100));
    }
    else if (this.random < 50)  {
      pBar = parseInt(100-((Math.abs(this.random - this.initNum)/Math.abs(this.random-100)) * 100));
    }
    var barWidth = pBar*$("#container").width()/ 100;  
      $("#progress_bar").animate({width:barWidth},700).html(pBar + "%");
  }

};

                    
$(document).ready(gameOn.initialize);
