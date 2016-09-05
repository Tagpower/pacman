var pacman = function(game) { 
}

var enemy;

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

      self.map = self.add.tilemap('map3');
      //self.map.addTilesetImage('tileset merdique', 'tiles');
      self.map.addTilesetImage('tileset', 'tiles2');

      self.layer = self.map.createLayer('layer1');
      self.layer.resizeWorld();
      self.safeTile = [1,2];

      // Setting up SaveCPU
      saveCpu = self.game.plugins.add(Phaser.Plugin.SaveCPU);
      saveCpu.renderOnFPS = 40;

      // Setting up ProTracker
      self.proTracker = new Protracker();
      //self.proTracker.onReady = function() { self.proTracker.play(); };
      //self.proTracker.onStop = function() { self.proTracker.play(); };

      //self.proTracker.buffer = self.game.cache.getBinary(MODS[0]);
      //self.proTracker.parse(); 

      self.turnPoint = new Phaser.Point();
      self.marker = new Phaser.Point();

      self.map.setCollision([3,4], true, self.layer);

      self.player = new Pac(this, 24, 24);

      //self.enemies = this.add.group(this, null, 'enemies', false, true, Phaser.Physics.ARCADE);
      //self.enemies.add(new Enemy(this, 120, 24));
      enemy = new Enemy(this, 120, 24);

      self.cursors = self.input.keyboard.createCursorKeys();

      self.dots = this.add.physicsGroup();
      //self.map.createFromTiles([1,2], null, 'dot', self.layer, self.dots);

      self.dots.setAll('x', 7, false, false, 1);
      self.dots.setAll('y', 7, false, false, 1);

      self.player.move(Phaser.RIGHT);
   },

   update: function() {
      var self = this;
      //Check collisions for everything
      //self.player.body.velocity.setTo(0);

      //this.player.checkNearTiles();

      self.text_score.text = self.score;
   },

   render: function() {
      enemy.render();
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
      console.log("qijhfbazekbfkqbf");
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

