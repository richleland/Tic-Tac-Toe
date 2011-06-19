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
  };

  var getValidMoves = function(board) {
    // grab all valid moves on the board in supplied state
    return board.find("td:empty");
  };

  var pickSquare = function() {
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
});

