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
      self.score = 0;

      self.text_score = self.game.add.text(self.game.world.width-40, 16, '', {font: '16px Minecraftia', fill: '#ffffff', align: 'right'});
      self.text_score.fixedToCamera = true;
      self.text_score.anchor.setTo(0.5);

      self.map = self.add.tilemap('map1');
      self.map.addTilesetImage('tileset merdique', 'tiles');
      //self.map.addTilesetImage('tiles_WIP', 'tiles');

      self.layer = self.map.createLayer('layer1');
      self.layer.resizeWorld();
      self.safeTile = 2;

      //Setting up EasyStar data
      var grid = [];
      for (var i = 0 ; i < self.layer.layer.data.length; i++) {
         grid.push([]);
         for (var j = 0 ; j < self.layer.layer.data[i].length; j++) {
            grid[i].push(self.layer.layer.data[i][j].index);
         }
      }
      easystar.setGrid(grid);
      easystar.setAcceptableTiles([2]);
      easystar.calculate();

      self.turnPoint = new Phaser.Point();
      self.marker = new Phaser.Point();

      self.directions = [ null, null, null, null, null ];
      self.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]; 

      self.map.setCollision(1, true, self.layer);

      self.player = new Pac(this, 24, 24);

      self.cursors = self.input.keyboard.createCursorKeys();

      self.dots = this.add.physicsGroup();
      self.map.createFromTiles(2, null, 'dot', self.layer, self.dots);

      self.dots.setAll('x', 7, false, false, 1);
      self.dots.setAll('y', 7, false, false, 1);

      self.player.move(Phaser.RIGHT);
   },

   update: function() {
      var self = this;
      //Check collisions for everything
      //self.player.body.velocity.setTo(0);

      this.checkNearTiles();

      self.text_score.text = self.score;
   },

   checkNearTiles: function() {
      var self = this;
      self.marker.x = self.math.snapToFloor(Math.floor(self.player.x), TILE_SIZE) / TILE_SIZE;
      self.marker.y = self.math.snapToFloor(Math.floor(self.player.y), TILE_SIZE) / TILE_SIZE;

      var i = self.layer.index;

      self.directions[Phaser.LEFT] = self.map.getTileLeft(i, self.marker.x, self.marker.y);
      self.directions[Phaser.RIGHT] = self.map.getTileRight(i, self.marker.x, self.marker.y);
      self.directions[Phaser.UP] = self.map.getTileAbove(i, self.marker.x, self.marker.y);
      self.directions[Phaser.DOWN] = self.map.getTileBelow(i, self.marker.x, self.marker.y);
      self.directions[Phaser.NONE] = new Phaser.Point(1,1);
   },

   eatDot: function (pacman, dot) {
      var self = this;
      dot.kill();
      self.score += 10;

      if (self.dots.total === 0) {
         self.dots.callAll('revive');
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

      this.game.state.start("GameOver");
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

