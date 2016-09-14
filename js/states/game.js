var pacman = function() { 
   Phaser.State.call(this);
}

pacman.prototype = Object.create(Phaser.State);
pacman.prototype.constructor = pacman;

pacman.prototype = {

   init: function(config) {
      var self = this;
      console.log("Running the game...");

      self.current_level = config.current_level;
      self.READY = false;
   },

   create: function() {
      var self = this;

      //Audio
      self.mute = false;
      self.score = 0;


      self.map = self.add.tilemap(self.game.gameMaps[self.current_level]);
      console.log(this.map);
      self.map.addTilesetImage('tileset', 'tiles');

      self.layer = self.map.createLayer('layer1');
      self.layer.resizeWorld();
      console.log(this.layer);
      self.safeTile = [2,3,4];

      self.text_score = self.game.add.text(self.map.widthInPixels+40, 16, '', {font: '16px Minecraftia', fill: '#ffffff', align: 'right'});
      self.text_score.fixedToCamera = true;
      self.text_score.anchor.setTo(0.5);

      // Setting up ProTracker
      self.proTracker = new Protracker();
      //self.proTracker.onReady = function() { self.proTracker.play(); };
      //self.proTracker.onStop = function() { self.proTracker.play(); };

      //self.proTracker.buffer = self.game.cache.getBinary(MODS[0]);
      //self.proTracker.parse(); 

      self.turnPoint = new Phaser.Point();
      self.marker = new Phaser.Point();

      self.map.setCollision([1,5,6], true, self.layer);

      self.player = new Pac(this, 24, 24);

      self.enemies = this.add.group(this, null, 'enemies', false, true, Phaser.Physics.ARCADE);
      self.enemies.add(new Enemy(this, (TILE_SIZE+TILE_SIZE/2)*5, 24));

      self.cursors = self.input.keyboard.createCursorKeys();

      self.dots = this.add.physicsGroup();
      self.map.createFromTiles(self.safeTile, null, 'dot', self.layer, self.dots);

      self.dots.setAll('x', 7, false, false, 1);
      self.dots.setAll('y', 7, false, false, 1);

      self.player.move(Phaser.DOWN);
      self.READY = true;
   },

   update: function() {
      var self = this;
      if (self.READY) {
         self.text_score.text = self.score;


         if (self.dots.countLiving() === 0) {
            self.dots.destroy();
            self.enemies.removeAll();
            var config = {
               current_level: (self.current_level+1)%self.game.gameMaps.length,
            };
            this.game.stateTransition.to("Game", true, false, config);
         }
      }
   },

   render: function() {
      var self = this;
      game.debug.body(self.player);
      self.enemies.forEach( function(e){
         game.debug.body(e);
      }, self);
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

   gameOver: function() {
      var self = this;
      this.game.stateTransition.to("GameOver", true, false);
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

   shutdown: function() {
   }
}

