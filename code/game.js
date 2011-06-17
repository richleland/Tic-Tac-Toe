$(function(){
  var board = $("#board");
  var squares = board.find("td");

  squares.bind("mouseenter", function(e){
    var square = $(this);
    square.addClass("highlight");
  });

  squares.bind("mouseleave", function(e){
    var square = $(this);
    square.removeClass("highlight");
  });

  squares.bind("click", function(e){
    var square = $(this);
    console.log("clicked square " + square.attr("id"));
  });
});
