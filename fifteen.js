var MARGIN = 2;
var BORDER = 1;
var MOVES = 0;

var tileWidth;
var tileHeight;
var tiles = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, null]
];
var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var gapX = 3;
var gapY = 3;

function checkWin() {
  if (gapX == 3 && gapY == 3) {

    for (var y = 0; y < 4; y++){
      for (var x = 0; x < 4; x++ ){
        var value = y * 4 + x + 1;
        if (value < 16) {
          var data = tiles[y][x].data();
          console.log(data);
        }
        // var data = tiles[y][x].data();
        // if (data != null) {
        //   console.log(data);
        // }

        //console.log(tilerow[x]);
        // console.log(value);
        // console.log(tiles[y][x]);
        // if ( (value < 16) && (tiles[y][x] != value) ) {
        //   console.log("loser");
        //   return 0;
        // }
      }
    }
    // console.log("winner");
    // return 1;
  }
}

function slideTile(tile, duration) {
  tile.animate ({
    top: tile.data("y") * tileHeight,
    left: tile.data("x") * tileWidth + window.innerWidth / 2 - 200
  }, duration || 200);
}

function down() {
  if (gapY > 0) {
    // change order array
    var i = (gapY - 1) * 4 + gapX;
    var max = i + 3;
    for (i = i; i < max; i++) {
      // bubble-sort-esque
      var temp = order[i];
      order[i] = order[i+1];
      order[i+1] = temp;
    }
    console.log("gapY: " + gapY);
    console.log("gapX: " + gapX);
    console.log("i: " + i);
    console.log(order);

    // change tile positions
    var tile = tiles[gapY - 1][gapX];
    tiles[gapY][gapX] = tile;
    tile.data("y", gapY);
    slideTile(tile);
    gapY = gapY - 1;
    tiles[gapY][gapX] = null;

    MOVES++;
    document.getElementById('moves').innerHTML = MOVES;
    //checkWin();
  }
}

function up() {
  if (gapY < 3) {
    // // change order array
    // var i = (gapY + 1) * 4 - gapX;
    // var max = i + 3;
    // for (i = i; i < max; i++) {
    //   // bubble-sort-esque
    //   var temp = order[i];
    //   order[i] = order[i+1];
    //   order[i+1] = temp;
    // }
    // console.log("gapY: " + gapY);
    // console.log("gapX: " + gapX);
    // console.log("i: " + i);
    // console.log(order);

    // change tile positions
    var tile = tiles[gapY + 1][gapX];
    tiles[gapY][gapX] = tile;
    tile.data("y", gapY);
    slideTile(tile);
    gapY = gapY + 1;
    tiles[gapY][gapX] = null;
    MOVES++;
    document.getElementById('moves').innerHTML = MOVES;
    //checkWin();
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
    MOVES++;
    document.getElementById('moves').innerHTML = MOVES;
    //checkWin();
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
    MOVES++;
    document.getElementById('moves').innerHTML = MOVES;
    //checkWin();
  }
}

function positionTiles() {
  for (var x = 0; x < 4; x++){
    for (var y = 0; y < 4; y++ ){
      var tile = tiles [y][x];
      if (tile) {
        tile.css ({
          top: tile.data("y") * tileHeight,
          left: tile.data("x") * tileWidth + window.innerWidth / 2 - 200
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

function initTiles(background){
  var board = $('#board');
  for (var y = 0; y <4; y++){
    for (var x = 0; x < 4; x++) {

      var value = y * 4 + x + 1;

      if (value < 16){
        var tile = $('<div class ="tile") />');
        board.append(tile);
        tile.data("x", x).data("y",y);
        //var data = tile.data("x");//testing
        //console.log(data);//testing
        tile.css('background', background);
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
  console.log("initialization complete");
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
  resetMoves();
}

function resetMoves() {
  MOVES = 0;
  document.getElementById('moves').innerHTML = MOVES;
}

function keydown(event) {
  //console.log(event.which);
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

// $(document).ready
$(
  function()  {
    $(window).resize(resize);
    $(document).keydown(keydown);

    // initialize tiles with random background on page startup
    var bg = Math.floor(Math.random * 4);
    initTiles("url(./background1.jpg)");
    resize();
    $('#shuffle').click(function() {
      scramble();
      totalSeconds = -1; // reset timer
    });
    document.getElementById('moves').innerHTML = MOVES;

    // feature: notify when user has won


    // game timer in seconds
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);
    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }

    // change background based on option selected
    $('input:radio[name=background]').change(function() {
      switch (this.value) {
        case 'one':
          $("#board").empty();
          initTiles("url(./background1.jpg)");
          resize();
          gapX = 3;
          gapY = 3;
          break;
        case 'two':
          $("#board").empty();
          initTiles("url(./background2.jpg)");
          resize();
          gapX = 3;
          gapY = 3;
          break;
        case 'three':
          $("#board").empty();
          initTiles("url(./background3.png)");
          resize();
          gapX = 3;
          gapY = 3;
          break;
        case 'four':
          $("#board").empty();
          initTiles("url(./background4.jpg)");
          resize();
          gapX = 3;
          gapY = 3;
          break;
      }
      resetMoves();
      totalSeconds = -1;
    });

  } // end of document.ready
);
