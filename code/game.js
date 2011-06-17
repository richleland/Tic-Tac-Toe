$(function(){
  var checkForWin = function(){
    // check to see if we have 3 in a row (8 possible combinations)
  };

  var COMPUTER = 0
    , HUMAN = 1
    , X = "X"
    , O = "O"
    , currentPlayer = HUMAN
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
        info.text("My move.");
      } else {
        square.text(O);
        info.text("Your move.");
      }
      currentPlayer = currentPlayer == HUMAN ? COMPUTER : HUMAN;
    }
    checkForWin();
  });
});
