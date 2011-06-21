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

  var testBoard = $(boardHTML);
  var squares = testBoard.find("td");
  var X = "X";
  var O = "O";
  testBoard.tictac();

  test("Click places X in selected square", function() {
    expect(1);
    var firstSquare = squares.eq(0);
    firstSquare.trigger("click");
    equals(firstSquare.text(), X, "We expect value to be " + X);
  });

});
