var Enemy = function(state, x, y) {
   Phaser.Sprite.call(this, state.game, x, y, 'enemy');

   this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
   this.game.physics.arcade.enable(this);
   this.game.add.existing(this);

   this.body.collideWorldBounds = true;
   this.body.immovable = false;
   this.anchor.setTo(0.5);

   this.speed = 60;
   this.state = state;
   this.turnPoint = new Phaser.Point(x,y);
   this.marker = new Phaser.Point();
   this.current = Phaser.RIGHT;
   this.turning = Phaser.NONE;  

   this.directions = [ null, null, null, null, null ];
   this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]; 

   this.checkNearTiles();

   this.threshold = 3;

   // Setting up AStar data
   this.aStar = this.game.plugins.add(Phaser.Plugin.AStar);
   this.aStar.setAStarMap(this.state.map, this.state.layer.layer.name, this.state.map.tilesets[0].name);
   this.aStar._useDiagonal = false;

   this.path = null;

   this.animations.add('move', [0,1],6,true);
   this.animations.play('move');

   this.events.onKilled.add(this.cleanPlugins, this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.cleanPlugins = function(enemy) {
   this.game.plugins.remove(this.aStar, true);
}

Enemy.prototype.render = function() {
   //this.game.debug.AStar(this.aStar, 20, 340, '#ff0000');
}

Enemy.prototype.update = function() {
   this.game.physics.arcade.collide(this, this.state.layer);

   var start = this.state.layer.getTileXY(this.x, this.y, {});
   var tile = this.state.player.directions[this.state.player.current];
   if (tile !== null || tile !== undefined) {
      var goal = this.state.layer.getTileXY(tile.worldX, tile.worldY, {});
      this.path = this.aStar.findPath(start, goal);
   }

   this.checkPoint(this.path.nodes[this.path.nodes.length-1]);
}

Enemy.prototype.checkNearTiles = function() {
   this.marker.x = this.state.math.snapToFloor(Math.floor(this.x), TILE_SIZE) / TILE_SIZE;
   this.marker.y = this.state.math.snapToFloor(Math.floor(this.y), TILE_SIZE) / TILE_SIZE;

   var i = this.state.layer.index;

   this.directions[Phaser.LEFT] = this.state.map.getTileLeft(i, this.marker.x, this.marker.y);
   this.directions[Phaser.RIGHT] = this.state.map.getTileRight(i, this.marker.x, this.marker.y);
   this.directions[Phaser.UP] = this.state.map.getTileAbove(i, this.marker.x, this.marker.y);
   this.directions[Phaser.DOWN] = this.state.map.getTileBelow(i, this.marker.x, this.marker.y);
   this.directions[Phaser.NONE] = new Phaser.Point(1,1);
}

Enemy.prototype.checkPoint = function(nextPoint) {
   this.checkNearTiles();
   var direction = this.current;
   if (nextPoint) {
      var x = nextPoint.x;
      var y = nextPoint.y;
      

      if (x < Math.floor(this.x/TILE_SIZE)) {
         direction = Phaser.LEFT;
      }
      else if (x > Math.floor(this.x/TILE_SIZE)) {
         direction = Phaser.RIGHT;
      }
      else if (y < Math.floor(this.y/TILE_SIZE)) {
         direction = Phaser.UP;
      }
      else if (y > Math.floor(this.y/TILE_SIZE)) {
         direction = Phaser.DOWN;
      }
      else {
         direction = Phaser.NONE;
      }
   }

   if (this.state.math.fuzzyEqual(this.x, this.directions[this.current].worldX + TILE_SIZE/2, this.threshold)
         && this.state.math.fuzzyEqual(this.y, this.directions[this.current].worldY + TILE_SIZE/2, this.threshold)) {
      this.x = this.directions[this.current].worldX + TILE_SIZE/2;
      this.y = this.directions[this.current].worldY + TILE_SIZE/2;
   }

   this.move(direction);
}

Enemy.prototype.move = function(direction) {
   var speed = this.speed;

   if (direction === Phaser.LEFT || direction === Phaser.UP)
      speed = -speed;

   if (direction === Phaser.RIGHT || direction === Phaser.LEFT) {
      this.body.velocity.x = speed;
   }
   else {
      this.body.velocity.y = speed;
   }
   this.current = direction;
}
