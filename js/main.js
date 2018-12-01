$(document).ready(function () {
    var boxNumber = [1,2,3,4,5,6,7,8,9];
    var userOneSelection = [];
    var userTwoSelection = []
    var winer = false;
    var cardCount = 0;
    var gameLevel = 'hard';
    var numberOfPlayers = 'onePlayer';
    var userOnPlay = true;

    // Get & set the number of the player
    $('.player').on('click', function(){
        $('.player').css('backgroundColor','#7d1ae8');
        $(this).css('backgroundColor','#00c4cc');
        window.localStorage.setItem('NumberOfPlayer', this.id);
        checkPlayers(this.id);
    })
    numberOfPlayers = window.localStorage.getItem('NumberOfPlayer');

    // Get & set the level game if there is only 1 player
    $('.game-level-btn').on('click', function(){
        $('.game-level-btn').css('backgroundColor','#7d1ae8');
        $(this).css('backgroundColor','#00c4cc');
        window.localStorage.setItem('GameLevel', this.id);
    })
    gameLevel = window.localStorage.getItem('GameLevel');
    

    // Reset the game board yo play again
    $('#reset').click(playAgain);

    // Check if the there are 2 players than the game level will be hided
    function checkPlayers(playerNum){
        if(playerNum == 'twoPlayer'){
            $('.game-level-btn').hide();
        } else {
            $('.game-level-btn').show();
        }
    }
    
    // set the game if its 1 or 2 players
    function playBoard(){
        if (numberOfPlayers === 'onePlayer'){
            $('.cards').click(userSelect);
        } else if (numberOfPlayers === 'twoPlayer') {
            $('.cards').click(twoUsersGame);
        }
    }
    playBoard();

    // the function will add the movement to the player array and disable the selection and check for the winner if the user array >= 3
    function makeMove(elem, move , collection) { 
        $(elem).addClass(move);
        var idSelected = $(elem).attr('id');
        collection.push(parseInt(idSelected));
        var playerSelection = boxNumber.indexOf(parseInt(idSelected));
        boxNumber.splice(playerSelection, 1);
        $(elem).off('click');

        if(collection.length >= 3){
            checkForWinner(move);
        }
    }
    
    // the function will be called when the user will play with computer
    function userSelect() {
        cardCount++;
        makeMove(this, 'x-play', userOneSelection);
        if (winer == false){ // it will be called when the user finish his selection
            computerSelect();
        }  
    }

    // This function will be called when there are 2 players
    function twoUsersGame() {
        if(userOnPlay == true){  // let player one make selection & add it to player array         
                cardCount++;
                makeMove(this, 'x-play', userOneSelection);
                userOnPlay = false;
    } else {  // let player two make selection & add it to player array           
            cardCount++;
            makeMove(this, 'o-play', userTwoSelection);
            userOnPlay = true;
    }
    }

    // this function will check if computer can win or block the user from wining if no one can win make random selection
    function checkWin(player){
        var computerSelection;
        if (($("#1").hasClass(player) && $("#2").hasClass(player) ||
                 $("#6").hasClass(player) && $("#9").hasClass(player) ||
                 $("#5").hasClass(player) && $("#7").hasClass(player)) && (boxNumber.includes(3))) {
                            computerSelection = 3;
            } else if (($("#2").hasClass(player) && $("#3").hasClass(player) ||
                        $("#4").hasClass(player) && $("#7").hasClass(player) ||
                        $("#5").hasClass(player) && $("#9").hasClass(player)) && (boxNumber.includes(1))){
                            computerSelection = 1;
            } else if (($("#1").hasClass(player) && $("#3").hasClass(player) ||
                        $("#5").hasClass(player) && $("#8").hasClass(player)) && (boxNumber.includes(2))){
                            computerSelection = 2;
            } else if (($("#4").hasClass(player) && $("#5").hasClass(player) ||
                        $("#3").hasClass(player) && $("#9").hasClass(player)) && (boxNumber.includes(6))){
                            computerSelection = 6;
            } else if (($("#5").hasClass(player) && $("#6").hasClass(player) ||
                        $("#1").hasClass(player) && $("#7").hasClass(player)) && (boxNumber.includes(4))){
                            computerSelection = 4;
            } else if (($("#4").hasClass(player) && $("#6").hasClass(player) ||
                        $("#2").hasClass(player) && $("#8").hasClass(player) ||
                        $("#1").hasClass(player) && $("#9").hasClass(player) ||
                        $("#3").hasClass(player) && $("#7").hasClass(player)) && (boxNumber.includes(5))){
                            computerSelection = 5;
            } else if (($("#7").hasClass(player) && $("#8").hasClass(player) || 
                        $("#3").hasClass(player) && $("#6").hasClass(player) || 
                        $("#1").hasClass(player) && $("#5").hasClass(player)) && (boxNumber.includes(9))) {
                            computerSelection = 9;
            } else if (($("#1").hasClass(player) && $("#4").hasClass(player) ||
                        $("#3").hasClass(player) && $("#5").hasClass(player) ||
                        $("#8").hasClass(player) && $("#9").hasClass(player)) && (boxNumber.includes(7))) {
                            computerSelection = 7;
            } else if (($("#2").hasClass(player) && $("#5").hasClass(player) ||
                        $("#7").hasClass(player) && $("#9").hasClass(player)) && (boxNumber.includes(8))){
                            computerSelection = 8;
            } 
            else if (player === 'o-play') {
                return computerSelection = 0;
            } 
            else {
                computerSelection = boxNumber[Math.floor(Math.random() * boxNumber.length)];
            }
        return computerSelection;      
    }

    // Check the game level with computer and than the computer selectiion will depends on it
    function computerSelect() {
        cardCount++;
        var selectedElem;
        //If the level easy the computer selection will be random
        if (gameLevel == 'easy'){
            selectedElem = boxNumber[Math.floor(Math.random() * boxNumber.length)];
        } else if (gameLevel == 'hard') { // if the game level hard 
            selectedElem = checkWin('o-play'); // check if computer can win if not 
            if (selectedElem == 0){
                selectedElem = checkWin('x-play'); // check if the computer can block the player from winning
            }
        }
        setTimeout(function(){
            makeMove('#'+selectedElem, 'o-play', userTwoSelection); // make the computer selection on the board
        }, 150);
    }

    // This function going to check for the winner and show alert if one of the players win
    function checkForWinner(playerClass) {
        if ($("#1").hasClass(playerClass) && $("#2").hasClass(playerClass) && $("#3").hasClass(playerClass) ||
            $("#4").hasClass(playerClass) && $("#5").hasClass(playerClass) && $("#6").hasClass(playerClass) ||
            $("#7").hasClass(playerClass) && $("#8").hasClass(playerClass) && $("#9").hasClass(playerClass) || 
            $("#1").hasClass(playerClass) && $("#4").hasClass(playerClass) && $("#7").hasClass(playerClass) || 
            $("#2").hasClass(playerClass) && $("#5").hasClass(playerClass) && $("#8").hasClass(playerClass) || 
            $("#3").hasClass(playerClass) && $("#6").hasClass(playerClass) && $("#9").hasClass(playerClass) || 
            $("#1").hasClass(playerClass) && $("#5").hasClass(playerClass) && $("#9").hasClass(playerClass) || 
            $("#3").hasClass(playerClass) && $("#5").hasClass(playerClass) && $("#7").hasClass(playerClass)) {
                setTimeout(function() {alert(`${playerClass} WON the Game.`)}, 200);
                winer = true;
                $('.cards').off('click');
         } else if (cardCount === 9){ // if the counter is 9 this mean and no one win the game will tie
            setTimeout(function() {alert('The game tie, Try again')}, 0);
         }
    }
    
    // Reset the game board
    function playAgain() {
        $('.cards').removeClass('x-play o-play');
        $('.cards').click(userSelect);
        cardCount = 0;
        boxNumber = [1,2,3,4,5,6,7,8,9];
        winer = false;
        userOneSelection = [];
        userTwoSelection = [];
    }
});