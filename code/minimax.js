Array.prototype.clone = function() {
  return this.slice(0);
}

$(function(){
  var alphaBeta = function(state, depth, alpha, beta, forLetter) {
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
    //console.log(state + " at depth " + depth);
    var validMoves = getValidMoves(state);
    var winner = checkForWinner(state)

    if(depth == 0 || validMoves.length == 0 || winner) {
      var score = 0;
      winner == X ? score = -1000 : score = 1000;
      return score
    }

    var currentLetter = forLetter;
    for(var i = 0; i < validMoves.length; i++) {
      var move = validMoves[i];
      var newState = state.clone();
      newState[move] = currentLetter;

      currentLetter = currentLetter == X ? O : X;
      var val = -alphaBeta(newState, depth - 1, -beta, -alpha, currentLetter);
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

  var getBestMove = function(state, forLetter) {
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

    var currentLetter = forLetter;
    for(var i = 0; i < validMoves.length; i++) {
      var move = validMoves[i];
      var newState = state.clone();
      newState[move] = currentLetter;
      currentLetter = currentLetter == X ? O : X;
      var rank = -(alphaBeta(newState, 3, alpha, beta, currentLetter));
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

  var checkForWinner = function(state) {
    var winner = false;

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
    
    // update the evaluated board as well
    var evaluatedSquare = evaluated.find("td:eq("+squares.index(square)+")");
    evaluatedSquare.text(letter);

    // on the evaluation board, highlight next best move
    letter = computersTurn ? O : X;
    evaluated.find("td").removeClass("best");
    var bestMove = getBestMove(getBoardState(), letter);
    evaluated.find("td:eq("+bestMove+")").addClass("best");

    var hasWinner = checkForWinner(getBoardState());
    if(hasWinner) {
      squares.unbind("click");
      return false;
    }

    if(computersTurn && !checkForWinner(getBoardState())) {
      //makeComputerMove();
    }
  };

  var makeComputerMove = function() {
    var bestMove = getBestMove(getBoardState(), O);
    if(bestMove !== undefined) {
      squares.eq(bestMove).trigger("click");
    }
  };

  var possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  var state = ["", "", "", "", "", "", "", "", ""];
  var X = "X";
  var O = "O";
  var board = $("#board");
  var squares = board.find("td");
  var evaluated = $("#evaluated");
  var info = $("#info");
  var computersTurn = false;

  squares.bind("click", pickSquare);

  var testState = [
    X, X, X,
    O, X, X,
    O, O, O
  ];

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

});

