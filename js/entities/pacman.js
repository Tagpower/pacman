var Pac = function(state, x, y) {
   Phaser.Sprite.call(this, state.game, x, y, 'player');

   this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
   this.game.physics.arcade.enable(this);
   this.game.add.existing(this);

   this.body.collideWordlBounds = true;
   this.body.immovable = false;
   this.body.isCircle = true; // MAGIC !!!
   this.anchor.setTo(0.5);

   this.speed = 5;
   this.state = state;
   this.state.turnPoint.x = x;
   this.state.turnPoint.y = y;
   this.current = Phaser.NONE;
   this.turning = Phaser.NONE;
   this.threshold = 3;

   this.animations.add('chomp', [0,1,2,1],   12,true);
   this.animations.play('chomp');
}

Pac.prototype = Object.create(Phaser.Sprite.prototype);
Pac.prototype.constructor = Pac;

Pac.prototype.update = function() {
   this.game.physics.arcade.collide(this, this.state.layer);
   this.game.physics.arcade.overlap(this, this.state.dots, this.state.eatDot, null, this.state);

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

Pac.prototype.checkDirection = function(turnTo) {
   if (this.turning === turnTo || this.state.directions[turnTo] === null || this.state.directions[turnTo].index !== this.state.safeTile)
      return;

   if (this.current === this.state.opposites[turnTo])
      this.move(turnTo);
   else
   {
      this.turning = turnTo;

      this.state.turnPoint.x = (this.state.marker.x * TILE_SIZE) + (TILE_SIZE / 2);
      this.state.turnPoint.y = (this.state.marker.y * TILE_SIZE) + (TILE_SIZE / 2);
   }
}


Pac.prototype.turn = function () {

   var cx = Math.floor(this.x);
   var cy = Math.floor(this.y);

   //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
   if (!this.state.math.fuzzyEqual(cx, this.state.turnPoint.x, this.threshold) || !this.state.math.fuzzyEqual(cy, this.state.turnPoint.y, this.threshold))
      return false;

   //  Grid align before turning
   this.x = this.state.turnPoint.x;
   this.y = this.state.turnPoint.y;

   this.body.reset(this.x, this.y);

   this.move(this.turning);

   this.turning = Phaser.NONE;

   return true;

}

Pac.prototype.move = function(direction) {
   var speed = this.speed;
   this.scale.x = 1;
   this.angle = 0;

   if (direction === Phaser.LEFT || direction === Phaser.UP)
      speed = -speed;
   
   if (direction === Phaser.RIGHT || direction === Phaser.LEFT)
      this.body.velocity.x = speed;
   else
      this.body.velocity.y = speed;

   //  Reset the scale and angle (Pacman is facing to the right in the sprite sheet)

   if (direction === Phaser.LEFT)
      this.scale.x = -1;
   else if (direction === Phaser.UP)
      this.angle = 270;
   else if (direction === Phaser.DOWN)
      this.angle = 90;

   this.current = direction;
}
