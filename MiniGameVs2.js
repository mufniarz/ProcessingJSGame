// Button Constructor and Methods (start)
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.txtSize = config.txtSize || 11;
    this.label = config.label || "";
    this.message = config.message || "Clicked!";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    fill(0, 0, 0);
    textSize(this.txtSize);
    textAlign(LEFT, TOP);
    text(this.label, this.x + 10, this.y + this.height/4);
};

Button.prototype.isMouseInside = function() {
    return (mouseX >= this.x &&
            mouseX <= (this.x + this.width) &&
            mouseY >= this.y &&
            mouseY <= (this.y + this.height));
};

Button.prototype.handleMouseClick = function() {
    if(this.isMouseInside()) {
        this.onClick();
    }
};
// Button Constructor and Methods (end)


// Create different types of block objects.  
// Game Tile Structure.
var Canvas = function(config) {
    this.width = config.width || width;
    this.height = config.height || height;
};

var Tile = function(config) {
    Canvas.call(this, width, height);
    this.image = config.image || getImage("cute/Blank");
};

Tile.prototype.draw = function(posX, posY) {
    image(this.image, posX, posY, this.width/10, this.height/5);
};
// Empty tile 
var emptyTile = new Tile({});

// Obstructions
var tallTreeTile = new Tile({
    image: getImage("cute/TreeTall")
});
var shortTreeTile = new Tile({
    image: getImage("cute/TreeShort")
});
var uglyTreeTile = new Tile({
    image: getImage("cute/TreeUgly")
});
var wallTile = new Tile({
    image: getImage("cute/WallBlock")
});
var tallWallTile = new Tile({
    image: getImage("cute/WallBlockTall")
});
var openChestTile = new Tile({
    image: getImage("cute/ChestOpen")
});

//  Interactive Tiles
var rockTile = new Tile({
    image: getImage("cute/Rock")
});
var heartTile = new Tile({
    image: getImage("cute/Heart")
});
var chestTile = new Tile({
    image: getImage("cute/ChestClosed")
});

//  1=blank, 2=tall tree, 3=short tree, 4=ugly tree, 5=rock
//  6=tall wall, 7=wall, 8=heart, 9=chest, 10=open chest
var mapTile = [
    [6,7,7,7,5,5,7,7,7,6],
    [7,2,3,4,1,1,4,3,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,1,9,1,1,1,8,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,3,4,5,1,4,3,2,7],
    [6,7,7,6,1,1,6,7,7,6],
    [1,2,2,3,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,4,1],
    [4,3,3,4,1,1,1,1,1,1]
];

var xPos = 0,
    yPos = 0,
    tileNumb = 0,
    charPosX = 200,
    charPosY = 200;
var Player = function(config) {
    Canvas.call(this, width, height);
    this.image = config.image || getImage("cute/CharacterCatGirl");
    this.x = config.x || 200;
    this.y = config.y || 200;
};

Player.prototype.draw = function(posX, posY) {
    image(this.image, posX, posY, this.width/10, this.height/5);
};

var mainPlayer = new Player({});

Player.prototype.move = function(direction) {
    var curCharPosX = charPosX,
        curCharPosY = charPosY;
    if(direction === "UP") {
        println(charPosY);
        while(curCharPosY - height/10 < charPosY) {
            charPosY--;
        }
    } else if(direction === "DOWN") {
        println(charPosY);
        while(curCharPosY + height/10 > charPosY) {
            charPosY++;
        }
    } else if(direction === "LEFT") {
        println(charPosX);
        while(curCharPosX - width/10 < charPosX) {
            charPosX--;
        }
    } else if(direction === "RIGHT") {
        println(charPosX);
        while(curCharPosX + width/10 > charPosX) {
            charPosX++;
        }
    }
};

keyPressed = function() {
    println(keyCode);
    if(keyCode === 38) {
        mainPlayer.move("UP");
    } else if(keyCode === 40) {
        mainPlayer.move("DOWN");
    } else if(keyCode === 37) {
        mainPlayer.move("LEFT");
    } else if(keyCode === 39) {
        mainPlayer.move("RIGHT");
    }
};

draw = function() { 
    //  Draws green background
    background(62, 120, 33);
    //  Splits up the canvas into 10 rows (r)
    for(var r = 0; r < 10; r++) {
        //  Splits up the canvas into 10 columns (c) 
        for(var c = 0; c < 10; c++) {
            //  Obtains the tile number stored in the mapTile array
            tileNumb = mapTile[r][c];
            //  Determines which tile to disply based on the tile number
            if(tileNumb === 1) {
                //  Draws the tile at position xPos and yPos
                emptyTile.draw(xPos,yPos);
            } else if (tileNumb === 2) {
                tallTreeTile.draw(xPos,yPos);
            } else if (tileNumb === 3) {
                shortTreeTile.draw(xPos,yPos);
            } else if (tileNumb === 4) {
                uglyTreeTile.draw(xPos,yPos);
            } else if (tileNumb === 5) {
                rockTile.draw(xPos,yPos);
            } else if (tileNumb === 6) {
                tallWallTile.draw(xPos,yPos);
            } else if (tileNumb === 7) {
                wallTile.draw(xPos,yPos);
            } else if (tileNumb === 8) {
                heartTile.draw(xPos,yPos);
            } else if (tileNumb === 9) {
                chestTile.draw(xPos,yPos);
            } else if (tileNumb === 10) {
                openChestTile.draw(xPos,yPos);
            } else { 
                emptyTile.draw(xPos,yPos);
            }
            xPos += width/10;
        }
        yPos += height/10;
        // Clears xPos at the end of the column loop
        xPos = 0;
    }
    //  Clears yPos at the end of the row loop
    yPos = 0;
    
    mainPlayer.draw(charPosX, charPosY);
};
