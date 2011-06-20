$(function(){
  var possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  var board = $("#board");
  var squares = board.find("td");
  var info = $("#info");
  var computersTurn = false;
  var X = "X";
  var O = "O";

  squares.click(function() {
    var square = $(this);
    if(square.text() == "") {
      square.text(X);
    } else {
      info.text("That space is occupied by an " + square.text() + ".");
    }

  });
});
