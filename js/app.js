
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
      console.log("Submit GUess");
      gameOn.play();
   });

  // Bind a click of the reset button to browser reload
  gameOn.reset.addEventListener("click", function (event) {
      event.preventDefault();
      location.reload();
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
   
    var userInput = parseInt(document.getElementById('enter_number').value, 10);
    if(!gameOn.numValidate(userInput)){
      return;
    }
    if(userInput == gameOn.random){
      document.getElementById("demo").innerHTML = "You { GOT IT } right.";
    }
    else if(Math.abs(gameOn.random - userInput) > Math.abs(gameOn.random - this.initNum)){
      document.getElementById("demo").innerHTML = "Your getting cold! Do you feel comfortable?";
    }
    else if(Math.abs(gameOn.random - userInput) < Math.abs(gameOn.random - this.initNum)){
      document.getElementById("demo").innerHTML = "Great!! Let's warm this place up a little more";
    }
    this.initNum = userInput;
    console.log(this.random);
    gameOn.progress_bar();
  },

  progress_bar: function() {
    if (gameOn.random>50) {
      bar = parseInt(100-((Math.abs(gameOn.random - gameOn.initNum)/Math.abs(gameOn.random-0)) * 100));
    }
    else if (gameOn.random < 50)  {
      bar = parseInt(100-((Math.abs(gameOn.random - gameOn.initNum)/Math.abs(gameOn.random-100)) * 100));
    }
    var barWidth = bar*$("#container").width()/ 100;  
      $("#progress_bar").animate({width:barWidth},700).html(bar + "%");
  }

}

                    
$(document).ready(gameOn.initialize);
