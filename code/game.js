Array.prototype.compare = function(arr) {
    if (this.length != arr.length) return false;
    for (var i = 0; i < arr.length; i++) {
        if (this[i].compareArrays) { //likely nested array
            if (!this[i].compareArrays(arr[i])) return false;
            else continue;
        }
        if (this[i] != arr[i]) return false;
    }
    return true;
}

$(function(){
  var searchForWin = function(){
    // return winning index or false
    return false;
  };

  var searchForBlock = function(){
    // return blocking index or false
    var emptySquares = squares.filter(":empty");
    var diagonals = squares.filter(".even");
    var diagonalTopLeft = diagonals.filter(":even");
    var diagonalTopRight = diagonals.slice(1, 4);

    emptySquares.each(function(index){
      var square = $(this);
      var aboveSquare = square.parent().siblings(":first").children(":eq("+square.index()+")").text();
      var belowSquare = square.parent().siblings(":last").children(":eq("+square.index()+")").text();

      if(square.siblings(":contains("+X+")").length == 2) {
        // checks current empty square row
        square.css("background-color", "#CC0000");
      } else if(aboveSquare == X && belowSquare == X) {
        // checks empty square column
        square.css("background-color", "#CC0000");
      } else if(diagonalTopLeft.index(square) >= 0 && diagonalTopLeft.filter(":contains('"+X+"')").length == 2) {
        // if its the \ diagonal
        square.css("background-color", "#CC0000");
      } else if(diagonalTopRight.index(square) >= 0 && diagonalTopRight.filter(":contains('"+X+"')").length == 2) {
        // if its in the / diagonal
        square.css("background-color", "#CC0000");
      }
    });
    return false;
  };

  var makeComputerMove = function(){
    var winIndex = searchForWin();
    var blockIndex = searchForBlock();

    if(winIndex !== false){
      squares.eq(winIndex).trigger("click");
      return;
    }

    if(blockIndex !== false){
      squares.eq(blockIndex).trigger("click");
      return;
    }

    // temporarily pick the next available square
    squares.each(function(){
      var square = $(this);
      if(square.text() === ""){
        square.trigger("click");
        return false;
      }
    });
  };

  var checkForWin = function(){
    // check to see if we have 3 in a row (8 possible combinations)
    var isWinner = false;
    var possibleWins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [3, 4, 6]
    ];

    // get positions of all of the currently played letter
    var positions = []
    squares.each(function(index){
      var square = $(this);
      if(square.text() == currentLetter) {
        positions.push(index);
      }
    });
    
    // see if we have a winner
    for(var i = 0; i < possibleWins.length; i++) {
      if(possibleWins[i].compare(positions)) {
        isWinner = true;
        break;
      }
    }

    if(isWinner) {
      // declare winner
      info.text("WIN!");
      $.each(positions, function(index, value){
        squares.eq(value).addClass("winner");
      });
      squares.unbind("click");
    } else if(numMoves == 9) {
      // we have a tie
      info.text("TIE!");
      squares.unbind("click");
    } else {
      // if not a win, switch players
      if(currentPlayer == HUMAN) {
        currentPlayer = COMPUTER;
        currentLetter = O;
        info.text("My move.");
        makeComputerMove();
      } else {
        currentPlayer = HUMAN;
        currentLetter = X;
        info.text("Your move.");
      }
    }
  };

  var numMoves = 0
    , COMPUTER = 0
    , HUMAN = 1
    , X = "X"
    , O = "O"
    , currentPlayer = HUMAN
    , currentLetter = X
    , board = $("#board")
    , info = $("#info")
    , squares = board.find("td");

  squares.bind("mouseenter", function(e){
    var square = $(this);
    square.addClass("highlight");
  });

  squares.bind("mouseleave", function(e){
    var square = $(this);
    square.removeClass("highlight");
  });

  squares.bind("click", function(e){
    var square = $(this)
      , squareID = square.attr("id")
      , currentValue = square.text();

    if(currentValue == X || currentValue == O) {
      // already filled in
      info.text("That square is already occupied by an " + currentValue + ".");
    } else {
      // fill in the spot
      if(currentPlayer == HUMAN) {
        square.text(X);
      } else {
        square.text(O);
      }
      numMoves++;
      checkForWin();
    }
  });
});
