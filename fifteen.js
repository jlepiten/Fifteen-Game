var MARGIN = 2;
var BORDER = 1;

var tileWidth;
var tileHeight;
var tiles = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, null]
];

var gapX = 3;
var gapY = 3;

function slideTile(tile, duration) {
  tile.animate ({
    top: tile.data("y") * tileHeight,
    left: tile.data("x") * tileWidth
  }, duration || 200);
}

function down() {
  if (gapY > 0) {
    var tile = tiles[gapY - 1][gapX];
    tiles[gapY][gapX] = tile;
    tile.data("y", gapY);
    slideTile(tile);
    gapY = gapY - 1;
    tiles[gapY][gapX] = null;
  }
}

function up() {
  if (gapY < 3) {
    var tile = tiles[gapY + 1][gapX];
    tiles[gapY][gapX] = tile;
    tile.data("y", gapY);
    slideTile(tile);
    gapY = gapY + 1;
    tiles[gapY][gapX] = null;
  }
}

function right() {
  if (gapX > 0) {
    var tile = tiles[gapY][gapX - 1];
    tiles[gapY][gapX] = tile;
    tile.data("x", gapX);
    slideTile(tile);
    gapX = gapX - 1;
    tiles[gapY][gapX] = null;
  }
}

function left() {
  if (gapX < 3) {
    var tile = tiles[gapY][gapX + 1];
    tiles[gapY][gapX] = tile;
    tile.data("x", gapX);
    slideTile(tile);
    gapX = gapX + 1;
    tiles[gapY][gapX] = null;
  }
}

function positionTiles() {
  for (var x = 0; x < 4; x++){
    for (var y = 0; y < 4; y++ ){
      var tile = tiles [y][x];

      if (tile) {
        tile.css ({
          top: tile.data("y") * tileHeight,
          left: tile.data("x") * tileWidth
        });
      }
    }
  }
}

function resize(){
  var margin = parseInt($("body").css("margin"));
  var windowWidth = $(window).width() - 2 * margin;
  var windowHeight = $(window).height() - 2 * margin;

  // tileWidth = Math.floor(windowWidth /4);
  // tileHeight = Math.floor(windowHeight /4);

  tileWidth = 100;
  tileHeight = 100;

  console.log(tileWidth, tileHeight);
  var fontSize = Math.min(tileWidth, tileHeight);
  var extra = 2 * (MARGIN + BORDER);

  $(".tile")
  .width(tileWidth - extra)
  .height(tileHeight - extra)
  .css("fontSize", (.8 * fontSize) + "px");

  positionTiles();
}

function initTiles(){
  var board = $('#board');
  for (var y = 0; y <4; y++){
    for (var x = 0; x < 4; x++) {

      var value = y * 4 + x + 1;

      if (value < 16){
        var tile = $('<div class ="tile") />');
        board.append(tile);
        tile.data("x", x).data("y",y);
        tile.css('background-position', -100*x + 'px ' + -100*y + 'px');
        tiles[y][x] = tile;

        // if (x % 2){
        //   tile.css("backgroundColor","blue");
        // }
        // else {
        //   tile.css("backgroundColor", "Yellow");
        // }
      }
    }
  }
}

function scramble() {
  for (var i = 0; i < 100; i++) {
    var r = Math.random();

    if (r < 0.25) {
      up();
    } else if (r < .5) {
      down();
    } else if (r < 0.75) {
      left();
    } else {
      right();
    }
  }
}

function keydown(event) {
  console.log(event.which);
  switch (event.which){
    case 38: //up
    up();
    break;
    case 37: //left
    left();
    break;
    case 39: //right
    right();
    break;
    case 40: //down
    down();
    break;
  }
  event.stopPropagation();
  event.preventDefault();
}

$(
  function(evt)  {
    $(window).resize(resize);
    $(document).keydown(keydown);
    initTiles();
    resize();
    $('#shuffle').click(scramble);
    //scramble();

  }
);