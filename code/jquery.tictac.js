(function($) {
  $.fn.tictac = function() {

    return this.each(function() {
      var possibleWins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      var CORNER_SQUARES = [0, 2, 6, 8];
      var SIDE_SQUARES = [1, 3, 5, 7];
      var CENTER_SQUARE = 4;
      var board = $(this);
      var squares = board.find("td");
      var X = "X";
      var O = "O";

      var getPossibleCombosForSelection = function (squareIndex) {
        // loop through each possible winning combo, seeing if it contains the index
        // of the selected square
        var possibleCombos = [];
        $.each(possibleWins, function(index, value) {
          if($.inArray(squareIndex, value) > -1) {
            possibleCombos.push(value);
          }
        });
        return possibleCombos;
      };

      var getAvailableSquares = function(board) {
        // get the indexes of all available squares for supplied board
        var allSquares = board.find("td");
        var emptySquares = board.find("td:empty");
        var emptyIndexes = [];
        for(var i = 0; i < emptySquares.length; i++) {
          emptyIndexes.push(allSquares.index(emptySquares[i]));
        }
        return emptyIndexes;
      };

      var findPotentialFork = function(board) {
        var emptyIndexes = getAvailableSquares(board);
        var indexCreatesFork = -1;
        var potentialIndicies = [];

        for(var i = 0; i < emptyIndexes.length; i++) {
          // create a temporary board to fake actions X might take
          var fakeBoard = board.clone();
          var fakeSquares = fakeBoard.find("td");

          // fake selecting a square on the fake board
          fakeSquares.eq(emptyIndexes[i]).text(X);

          var combos = 0;
          $.each(possibleWins, function(index, winningCombo) {
            var squaresWithX = [];
            var hasO = false;

            $.each(winningCombo, function(index, value) {
              var currentSquare = fakeSquares.eq(value);
              if(currentSquare.text() == X) {
                squaresWithX.push(currentSquare);
              } else if(currentSquare.text() == O) {
                hasO = true;
              }
            });

            if(squaresWithX.length == 2 && !hasO) {
              combos++;
            }
          });

          if(combos == 2) {
            potentialIndicies.push(emptyIndexes[i]);
          }
        }

        // check the potential indicies
        if(potentialIndicies.length == 2) {
          // if there are 2 potential forks, set the index to the first available side
          $.each(SIDE_SQUARES, function(index, value) {
            var currentSquare = fakeSquares.eq(value);
            if(currentSquare.text() === "") {
              indexCreatesFork = value;
              return false;
            }
          });
        } else {
          // otherwise set the fork to be blocked as the first in the list
          indexCreatesFork = potentialIndicies[0];
        }

        return indexCreatesFork;
      };

      squares.click(function() {
        var square = $(this);
        var squareIndex = squares.index(square);
        var played = false;
        var possibleCombos;

        // fill in the square with an X if it's open
        if(square.text() === "") {
          square.text(X);
          possibleCombos = getPossibleCombosForSelection(squareIndex);
        } else {
          return;
        }

        // see if X has won, if so, something is wrong
        var xWins = false;
        $.each(possibleWins, function(index, winningCombo) {
          var squaresWithX = [];

          $.each(winningCombo, function(index, value) {
            var currentSquare = squares.eq(value);
            if(currentSquare.text() == X) {
              squaresWithX.push(currentSquare);
            }
          });

          if(squaresWithX.length == 3) {
            $(squaresWithX).each(function() {
              $(this).addClass("winner");
            });
            xWins = true;
            return false;
          }
        });

        if(xWins) {
          squares.unbind("click");
          return;
        }

        // see if O can win, if so, place O and win
        $.each(possibleWins, function(index, winningCombo) {
          var squaresWithO = [];

          $.each(winningCombo, function(index, value) {
            var currentSquare = squares.eq(value);
            if(currentSquare.text() == O) {
              squaresWithO.push(currentSquare);
            } else if(currentSquare.text() == X) {
              // X is blocking our way
              return false;
            }
          });

          if(squaresWithO.length == 2) {
            $.each(winningCombo, function(index, value) {
              var currentSquare = squares.eq(value);
              if(currentSquare.text() === "") {
                currentSquare.text(O);
                squaresWithO.push(currentSquare);
                played = true;
                return false;
              }
            });
          }

          if(played) {
            $(squaresWithO).each(function() {
              $(this).addClass("winner");
            });
            return false;
          }
        });

        // stop execution, O wins!
        if(played) {
          squares.unbind("click");
          return;
        }

        // see if X can be blocked, if so, block it with O
        $.each(possibleCombos, function(index, winningCombo) {
          var squaresWithX = 0;

          $.each(winningCombo, function(index, value) {
            var currentSquare = squares.eq(value);
            if(currentSquare.text() === X) {
              squaresWithX++;
            }
          });

          if(squaresWithX == 2) {
            $.each(winningCombo, function(index, value) {
              var currentSquare = squares.eq(value);
              if(currentSquare.text() === "") {
                currentSquare.text(O);
                played = true;
                return false;
              }
            });

            // don't play more than one square, fool!
            if(played) {
              return false;
            }
          }
        });

        // stop execution if O played
        if(played) {
          return;
        }

        // see if x can create a fork
        var forked = findPotentialFork(board);
        if(forked > -1) {
          squares.eq(forked).text(O);
          played = true;
          return;
        }

        // if X picks the middle, put O in a corner
        if(squareIndex == CENTER_SQUARE) {
          $.each(CORNER_SQUARES, function(index, value) {
            var currentSquare = squares.eq(value);
            if(currentSquare.text() === "") {
              currentSquare.text(O);
              played = true;
              return false;
            }
          });
          // stop execution if O played
          if(played) {
            return;
          }
        }

        // if center is empty, play it
        var centerSquare = squares.eq(CENTER_SQUARE);
        if(centerSquare.text() === "") {
          centerSquare.text(O);
          return;
        }

        // if X picks a corner, put O in the center
        if($.inArray(squareIndex, CORNER_SQUARES) > -1) {
          if(centerSquare.text() === "") {
            centerSquare.text(O);
            played = true;
          } else {
            // put O in a side (1, 3, 5, 7)
            $.each(SIDE_SQUARES, function(index, value) {
              var currentSquare = squares.eq(value);
              if(currentSquare.text() === "") {
                currentSquare.text(O);
                played = true;
                return false;
              }
            });
          }

          // stop execution if O played
          if(played) {
            return;
          }
        }

        // go through X's next possible plays, and put an O on the first available square
        $.each(possibleCombos, function(index, winningCombo) {
          $.each(winningCombo, function(index, value) {
            var currentSquare = squares.eq(value);
            if(currentSquare.text() === "") {
              currentSquare.text(O);
              played = true;
              return false;
            }
          });
          // stop execution if O played
          if(played) {
            return false;
          }
        });
      });
    });
  };
})(jQuery);
