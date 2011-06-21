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

});
