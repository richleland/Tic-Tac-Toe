Array.prototype.clone = function() {
  return this.slice(0);
}

$(function(){
  var alphaBeta = function(state, depth, alpha, beta) {
    /* pseudocode:
       
      get all valid moves
      if (depth is 0 or there are no valid moves or the game is over)
        return the score from examineState(state)
      for each move in available moves
        pretend to make the move, getting the new state of the board if it had that move
        get value of recursive run of alphaBeta(new state, depth -1, -beta, -alpha)
        if value is greater than alpha
          set alpha to value
        if alpha is greater than or equal to beta
          break, pruning this branch
      return the alpha value

    */
    var validMoves = getValidMoves(state);
    var winner = checkForWinner(state)

    if(depth == 0 || validMoves.length == 0 || winner) {
      return examineState(state);
    }

    for(var i = 0; i < validMoves.length; i++) {
      var move = validMoves[i];
      var newState = state.clone();
      newState[move] = X;

      var val = -alphaBeta(newState, depth - 1, -beta, -alpha);
      if(val > alpha) {
        alpha = val;
      }

      if(alpha >= beta) {
        // prune it!
        break;
      }
    }

    return alpha;
  };

  var getBestMove = function(state) {
    /* pseudocode
      
      set constants for alpha (-1000, game lost) and beta (1000, game won)
      keep track of the best move and best rank
      get all valid moves
      for each move in available moves
        pretend to make the move, getting the new state of the board if it had that move
        rank the move using alphaBeta(new state, depth, alpha, beta)
        set the best move and the best rank
        if the new rank (the result of alphaBeta) is greater than best rank
          set best move to current move
          set best rank to rank (the result of alphaBeta)
      return the best move

    */
    var alpha = -1000;
    var beta = 1000;

    var validMoves = getValidMoves(state);
    var bestMove;
    var bestRank;

    for(var i = 0; i < validMoves.length; i++) {
      var move = validMoves[i];
      var newState = state.clone();
      newState[move] = O;
      var rank = -(alphaBeta(newState, 9, alpha, beta));
      if(bestMove == null) {
        bestMove = move;
        bestRank = rank;
      }

      if(rank > bestRank) {
        bestMove = move;
        bestRank = rank;
      }
    }
    return bestMove;
  };

  var examineState = function(state) {
    /* pseudocode
      
      set score to 0
      if the game is over
        return 1000 if won, -1000 if lost
      calculate how many fields we have
      calculate how many fields our opponent has
      increment score by fields we have
      decrement score by fields opponent has
      return score
    */
    var score = 0;
    var winner = checkForWinner(state);
    if(winner) {
      return winner == X ? -1000 : 1000;
    }

    var squaresWithX = $.map(state, function(item, index) {
      return item == X ? index : null;
    }).length;
    var squaresWithO = $.map(state, function(item, index) {
      return item == O ? index : null;
    }).length;

    score += squaresWithO * 2.5;
    score -= squaresWithX * 0.5;

    return score
  };

  var checkForWinner = function(state) {
    var winner = false;
    var possibleWins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    var squaresWithX = $.map(state, function(item, index) {
      return item == X ? index : null;
    });

    var squaresWithO = $.map(state, function(item, index) {
      return item == O ? index : null;
    });

    $.each(possibleWins, function(index, winningCombo) {
      var hitCount = 0;
      $.each(squaresWithX, function(squareIndex, xPosition) {
        if($.inArray(xPosition, winningCombo) > -1) {
          hitCount++;
        }
        if(hitCount == 3) {
          //console.log("X WINS!");
          //console.log(winningCombo);
          winner = X;
          return false;
        }
      });
    });

    $.each(possibleWins, function(index, winningCombo) {
      var hitCount = 0;
      $.each(squaresWithO, function(squareIndex, oPosition) {
        if($.inArray(oPosition, winningCombo) > -1) {
          hitCount++;
        }
        if(hitCount == 3) {
          //console.log("O WINS!");
          //console.log(winningCombo);
          winner = O;
          return false;
        }
      });
    });

    return winner
  };

  var getValidMoves = function(state) {
    // grab all valid moves on the board in supplied state
    var availableSlots = $.map(state, function(item, index) {
      return item == "" ? index : null;
    });
    return availableSlots;
  };

  var getBoardState = function() {
    var boardState = $.map(squares, function(square, index) {
      return $(square).text();
    });
    return boardState;
  };

  var pickSquare = function() {
    // handle the click on a square
    var square = $(this);
    var letter = computersTurn ? O : X;
    square.text(letter);
    computersTurn = !computersTurn;
    console.log(getBoardState(state));
  };

  var state = ["", "", "", "", "", "", "", "", ""];
  var X = "X";
  var O = "O";
  var board = $("#board");
  var squares = board.find("td");
  var evaluated = $("#evaluated");
  var info = $("#info");
  var computersTurn = false;

  squares.bind("click", pickSquare);

  //var testState = [
    //O, X, X,
    //X, O, O,
    //X, X, O
  //];
  //var midState = [
    //O, X, X,
    //X, "", O,
    //"", X, O
  //];
  //var foo = examineState(testState);
  //var foo = getBestMove(state);
  //console.log(foo);

  /*
  var pickSquare = function() {
    // handle the click on a square
    var square = $(this);
    var letter = computersTurn ? O : X;
    square.text(letter);
    computersTurn = !computersTurn;
  };

  // reference some objects
  var initialBoard = $("#board");
  var evaluated = $("#evaluated");
  var squares = initialBoard.find("td");
  var info = $("#info");
  var X = "X";
  var O = "O";
  var computersTurn = false;

  // tell the squares how to respond
  squares.bind("click", pickSquare);
  */
});

