var Enemy = function(state, x, y) {
   Phaser.Sprite.call(this, state.game, x, y, 'enemy');

   this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
   this.game.physics.arcade.enable(this);
   this.game.add.existing(this);

   this.body.collideWorldBounds = true;
   this.body.immovable = false;
   this.body.isCircle = true; // MAGIC !!!
   this.anchor.setTo(0.5);

   this.speed = 60;
   this.state = state;
   this.turnPoint = new Phaser.Point(x,y);
   this.marker = new Phaser.Point();
   this.current = Phaser.NONE;
   this.turning = Phaser.NONE;  

   this.directions = [ null, null, null, null, null ];
   this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]; 

   this.threshold = 3;

   this.animations.add('move', [0,1],6,true);
   this.animations.play('move');
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
   this.game.physics.arcade.collide(this, this.state.layer);
   this.game.physics.arcade.overlap(this, this.state.player, this.state.playerHit, null, this.state);

   if (this.state.cursors.up.isDown && this.current !== Phaser.UP) {
      this.checkDirection(Phaser.UP);
   } else if (this.state.cursors.down.isDown && this.current !== Phaser.DOWN) {
      this.checkDirection(Phaser.DOWN);
   } else if (this.state.cursors.left.isDown && this.current !== Phaser.LEFT) {
      this.checkDirection(Phaser.LEFT);
   } else if (this.state.cursors.right.isDown && this.current !== Phaser.RIGHT) {
      this.checkDirection(Phaser.RIGHT);
   }
   else {
      this.turning = Phaser.NONE;
   }

   if (this.turning !== Phaser.NONE) {
      this.turn();
   }
}

Enemy.prototype.checkDirection = function(turnTo) {
   if (this.turning === turnTo || this.directions[turnTo] === null || !this.state.safeTile.includes(this.directions[turnTo].index))
      return;

   if (this.current === this.opposites[turnTo])
      this.move(turnTo);
   else
   {
      this.turning = turnTo;

      this.turnPoint.x = (this.marker.x * TILE_SIZE) + (TILE_SIZE / 2);
      this.turnPoint.y = (this.marker.y * TILE_SIZE) + (TILE_SIZE / 2);
   }
}


Enemy.prototype.turn = function () {

   var cx = Math.floor(this.x);
   var cy = Math.floor(this.y);

   //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
   if (!this.state.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.state.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
      return false;

   //  Grid align before turning
   this.x = this.turnPoint.x;
   this.y = this.turnPoint.y;

   this.body.reset(this.x, this.y);

   this.move(this.turning);

   this.turning = Phaser.NONE;

   return true;

}

Enemy.prototype.move = function(direction) {
   var speed = this.speed;

   if (direction === Phaser.LEFT || direction === Phaser.UP)
      speed = -speed;
   
   if (direction === Phaser.RIGHT || direction === Phaser.LEFT)
      this.body.velocity.x = speed;
   else
      this.body.velocity.y = speed;

   this.current = direction;
}
