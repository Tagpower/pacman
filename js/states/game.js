var pacman = function(game) { 
}

pacman.prototype = {

   init: function(config) {
      var self = this;
      console.log("Running the game...");
      console.log(self.config);

      self.current_level = config.current_level;
   },

   create: function() {
      var self = this;

      //Audio
      self.mute = false;

      self.map = self.add.tilemap('map1');
      self.map.addTilesetImage('tileset merdique', 'tiles');

      self.layer = self.map.createLayer('layer1');
      console.log(self.layer)
      self.layer.resizeWorld();

      self.direction = Phaser.NONE; 
      self.directions = []; //rename this

      self.marker = new Phaser.Point();
      self.turnPoint = new Phaser.Point();

      self.map.setCollision(1, true, self.layer);

      self.createPlayer();

      self.cursors = self.input.keyboard.createCursorKeys();
   },

   update: function() {
      var self = this;
      //Check collisions for everything
      self.physics.arcade.collide(self.player, self.layer);

      //self.player.body.velocity.setTo(0);

      self.marker.x = self.math.snapToFloor(Math.floor(self.player.x), TILE_SIZE) / TILE_SIZE;
      self.marker.y = self.math.snapToFloor(Math.floor(self.player.y), TILE_SIZE) / TILE_SIZE;

      var i = self.layer.index;

      self.directions[Phaser.LEFT] = self.map.getTileLeft(i, self.marker.x, self.marker.y);
      self.directions[Phaser.RIGHT] = self.map.getTileRight(i, self.marker.x, self.marker.y);
      self.directions[Phaser.UP] = self.map.getTileAbove(i, self.marker.x, self.marker.y);
      self.directions[Phaser.DOWN] = self.map.getTileBelow(i, self.marker.x, self.marker.y);


      if (self.cursors.up.isDown) {
         self.checkDirection(Phaser.UP);
      } else if (self.cursors.down.isDown) {
         self.checkDirection(Phaser.DOWN);
      } else if (self.cursors.left.isDown) {
         self.checkDirection(Phaser.LEFT);
      } else if (self.cursors.right.isDown) {
         self.checkDirection(Phaser.RIGHT);
      }

      if (self.math.fuzzyEqual(self.player.x, self.turnPoint.x, 2) && self.math.fuzzyEqual(self.player.y, self.turnPoint.y, 2)) {
         self.player.x = self.turnPoint.x;
         self.player.y = self.turnPoint.y;

         self.player.body.reset(self.turnPoint.x, self.turnPoint.y);
         self.move(self.direction);
         self.direction = Phaser.NONE;
      }


   },

   createPlayer: function() {
      var self = this;
      self.player = self.game.add.sprite(24,24,'player');
      self.game.physics.arcade.enable(self.player);

      self.player.body.collideWorldBounds = true;
      self.player.body.immovable = false;
      self.lostAlife = false;

      self.player.anchor.setTo(0.5);

      self.player.animations.add('right', [0,1,2,1],12,true);
      self.player.animations.add('up', [3,4,5,4],12,true);
      self.player.animations.add('left', [6,7,8,7],12,true);
      self.player.animations.add('down', [9,10,11,10],12,true);
   },

   checkDirection: function(dir) {
      var self = this;
      if (self.direction === dir) { //FIXME
         self.move(dir);
      } else {
         self.direction = dir;
         self.turnPoint.x = (self.directions[dir].x * TILE_SIZE) + (TILE_SIZE / 2);
         self.turnPoint.y = (self.directions[dir].y * TILE_SIZE) + (TILE_SIZE / 2);
         console.log(self.turnPoint);
      }
   },

   move: function(dir) {
      var self = this;

      switch (dir) {
         case Phaser.UP:
            self.player.animations.play('up');
            self.player.body.velocity.y = -75;
            break;
         case Phaser.DOWN:
            self.player.animations.play('down');
            self.player.body.velocity.y = 75;
            break;
         case Phaser.LEFT:
            self.player.animations.play('left');
            self.player.body.velocity.x = -75;
            break;
         case Phaser.RIGHT:
            self.player.animations.play('right');
            self.player.body.velocity.x = 75;
            break;
         default:
            break;
      }
   },

   // Load a level and its enemies
   loadLevel: function(lvl) {
      var self = this;
      
   },

   pauseGame: function() {
      var self = this;
      if (self.lives > 0) {
         if (!self.game.paused) {
            console.log("\tGame paused !");
            self.text_pause.alpha = 1;
            self.game.paused = true;
            self.music.pause();
         } else {
            console.log("\tGame resumed !");
            self.text_pause.alpha = 0;
            self.game.paused = false;
            if (!self.mute) {
               self.music.resume();
            }
         }
      }   
   },

   // When the player is hit by enemy
   playerHit: function(player, enemy) {
      var self = this;
      
   },

  
   gameOver: function() {
      var self = this;

      //this.game.state.start("GameOver");
   },

   muteGame: function() {
      var self = this;
      if (!self.mute) {
         self.mute = true;
         self.music.pause()
      } else {
         self.mute = false;
         self.music.resume();
      }

      console.log('mute is ' + self.mute);
      self.mute_wait = 30;
   },

   // Restarts the game from zero
   restart: function(level) {
      var self = this;
   },
}

