
// Player and Map properties (MapSpace, Player, Monster);
// This is the base object for building the map and creatures.
var Tile = function(height, width, image, x, y) {
    this.height = height    || height/5;
    this.width = width      || width/10;
    this.image = image      || getImage("cute/Blank");
    this.x = x              || 0;
    this.y = y              || -height/10;
};