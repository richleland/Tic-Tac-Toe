$(function(){
  var boardHTML = "";
  boardHTML += '<table id="board">';
  boardHTML += '    <tr>';
  boardHTML += '        <td class="even"></td>';
  boardHTML += '        <td></td>';
  boardHTML += '        <td class="even"></td>';
  boardHTML += '    </tr>';
  boardHTML += '    <tr>';
  boardHTML += '        <td></td>';
  boardHTML += '        <td class="even"></td>';
  boardHTML += '        <td></td>';
  boardHTML += '    </tr>';
  boardHTML += '    <tr>';
  boardHTML += '        <td class="even"></td>';
  boardHTML += '        <td></td>';
  boardHTML += '        <td class="even"></td>';
  boardHTML += '    </tr>';
  boardHTML += '</table>';

  var X = "X";
  var O = "O";

  var setupBoard = function() {
    this.board = $(boardHTML);
    this.squares = this.board.find("td");
    this.board.tictac();
  };

  var getAvailableSquares = function(board) {
    var allSquares = board.find("td");
    var emptySquares = board.find("td:empty");
    var emptyIndexes = [];
    for(var i = 0; i < emptySquares.length; i++) {
      emptyIndexes.push(allSquares.index(emptySquares[i]));
    }
    return emptyIndexes;
  };

  var playFullGame = function(board) {
    // play a full game, making 5 moves for X and returning the result
    // -1 for win by X, 0 for a tie, and 1 for win by O
    var squares = board.find("td");
    var clickedSquares = [];
    for(var x = 0; x < 5; x++) {
      // click a random square from the list of available squares
      var availableSquares = getAvailableSquares(board);
      var random = Math.floor(Math.random() * availableSquares.length);
      squares.eq(availableSquares[random]).trigger("click");
      clickedSquares.push(availableSquares[random]);

      // check for win or loss
      var winningSquares = squares.filter(".winner");
      if(winningSquares.length) {
        if(winningSquares.text() === "XXX") {
          // X won
          //$("body").append("<p>--X WINS--</p>").append(board);
          //console.log("X WINS");
          //console.log("X clicked the following squares: " + clickedSquares);
          return -1;
        } else if(winningSquares.text() === "OOO") {
          // O won
          return 1;
        }
      }
    }
    // if we got to this point, it's a draw
    return 0;
  };

  module("Game results");

  test("Games always result in win or tie", function() {
    var xWon = false;
    for(var i = 0; i < 1000; i++) {
      var board = $(boardHTML);
      var squares = board.find("td");
      board.tictac();
      xWon = playFullGame(board) == -1;
      if(xWon) {
        break;
      }
    }
    ok(!xWon, "We expect " + X + " to never win a game. Mwa ah ah!");
  });

  module("User interactions", {
    setup: setupBoard
  });

  test("Place X in selected square", function() {
    /*
      X - -
      - O -
      - - -
    */
    expect(1);
    this.squares.eq(0).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
  });

  test("Do nothing to a square that is already filled", function() {
    /*
      X - -
      - O -
      - - -
    */
    expect(6);
    this.squares.eq(0).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
    this.squares.eq(0).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
    this.squares.eq(4).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
  });

  test("End game in a tie", function() {
    /*
      X X O
      O O X
      X X O
    */
    expect(9);
    this.squares.eq(0).trigger("click");
    this.squares.eq(1).trigger("click");
    this.squares.eq(6).trigger("click");
    this.squares.eq(5).trigger("click");
    this.squares.eq(7).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(1).text(), X, "We expect the top middle square to contain an " + X);
    equal(this.squares.eq(5).text(), X, "We expect the middle right square to contain an " + X);
    equal(this.squares.eq(6).text(), X, "We expect the bottom left square to contain an " + X);
    equal(this.squares.eq(7).text(), X, "We expect the bottom middle square to contain an " + X);
    equal(this.squares.eq(2).text(), O, "We expect the top right square to contain an " + O);
    equal(this.squares.eq(3).text(), O, "We expect the middle left square to contain an " + O);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
    equal(this.squares.eq(8).text(), O, "We expect the bottom right square to contain an " + O);
  });

  module("Computer reactions", {
    setup: setupBoard
  });

  test("Place O in a corner since X selected the middle", function() {
    /*
      O - -
      - X -
      - - -
    */
    expect(2);
    this.squares.eq(4).trigger("click");
    equal(this.squares.eq(4).text(), X, "We expect the center square to contain an " + X);
    equal(this.squares.eq(0).text(), O, "We expect the center square to contain an " + O);
  });

  test("Place O in center since X selected a corner", function() {
    /*
      - - X
      - O -
      - - -
    */
    expect(2);
    this.squares.eq(2).trigger("click");
    var centerSquare = this.squares.eq(4);
    equal(this.squares.eq(2).text(), X, "We expect the top right square to contain an " + X);
    equal(centerSquare.text(), O, "We expect the center square to contain an " + O);
  });

  test("Place O in a side since X selected a corner and the center spot is unavailable", function() {
    /*
      X O -
      - O -
      - - X
    */
    expect(4);
    this.squares.eq(0).trigger("click");
    this.squares.eq(8).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the center square to contain an " + X);
    equal(this.squares.eq(8).text(), X, "We expect the bottom right square to contain an " + X);
    equal(this.squares.eq(1).text(), O, "We expect the top middle square to contain an " + O);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
  });

  test("Block a winning combo", function() {
    /*
      X X O
      - O -
      - - -
    */
    expect(4);
    this.squares.eq(0).trigger("click");
    this.squares.eq(1).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(1).text(), X, "We expect the top middle square to contain an " + X);
    equal(this.squares.eq(2).text(), O, "We expect the top right square to contain an " + O);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
  });

  test("Win the game", function() {
    /*
      X X O
      - O -
      O - X
    */
    expect(6);
    this.squares.eq(0).trigger("click");
    this.squares.eq(1).trigger("click");
    this.squares.eq(8).trigger("click");
    equal(this.squares.eq(0).text(), X, "We expect the top left square to contain an " + X);
    equal(this.squares.eq(1).text(), X, "We expect the top middle square to contain an " + X);
    equal(this.squares.eq(8).text(), X, "We expect the bottom right square to contain an " + X);
    equal(this.squares.eq(2).text(), O, "We expect the top right square to contain an " + O);
    equal(this.squares.eq(4).text(), O, "We expect the center square to contain an " + O);
    equal(this.squares.eq(6).text(), O, "We expect the bottom left square to contain an " + O);
  });

  test("O never has more squares filled than X", function() {
    expect(1);
    var tooManySquaresWithO = false;
    for(var i = 0; i < 1000; i++) {
      var board = $(boardHTML);
      var squares = board.find("td");
      board.tictac();
      playFullGame(board);
      
      var squaresWithX = squares.filter(":contains(X)");
      var squaresWithO = squares.filter(":contains(O)");
      tooManySquaresWithO = squaresWithO.length > squaresWithX.length;
      if(tooManySquaresWithO) {
        break;
      }
    }
    ok(!tooManySquaresWithO);
  });
});
