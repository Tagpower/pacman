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
      //Create the background
      
      //self.background = game.add.tileSprite(0, 0, game.width, game.height, 'space');
      //self.background.tint = (difficulty == OHGOD ? 0xff1111 : 0x3355ee);

      //Audio
      self.mute = false;
      self.gameoversound = false;
      self.introduction_sound = true;

      self.map = self.add.tilemap('map1');
      self.map.addTilesetImage('tileset merdique', 'tiles');

      self.layer = self.map.createLayer('layer1');
      self.layer.resizeWorld();

      self.map.setCollision(1, true, self.layer);

      self.createPlayer();

      self.cursors = self.input.keyboard.createCursorKeys();

      //self.move(Phaser.DOWN);
   },

   update: function() {
      var self = this;
      self.physics.arcade.collide(self.player, self.layer);
      //Check collisions for everything

      self.player.body.velocity.setTo(0);

      if (self.cursors.up.isDown) {
         self.player.animations.play('up');
         self.player.body.velocity.y = -50;
      } else if (self.cursors.down.isDown) {
         self.player.animations.play('down');
         self.player.body.velocity.y = 50;
      } else if (self.cursors.left.isDown) {
         self.player.animations.play('left');
         self.player.body.velocity.x = -50;
      } else if (self.cursors.right.isDown) {
         self.player.animations.play('right');
         self.player.body.velocity.x = 50;
      }

   },

   // {{{ CREATEPLAYER
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

   // Load a level and its enemies
   loadLevel: function(lvl) {
      var self = this;
      

   },
   // }}}

   // {{{ PAUSEGAME
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
   // }}}

   // When the player is hit by enemy
   playerHit: function(player, shot) {
      var self = this;
      
   },
   // }}}

  
   gameOver: function() {
      var self = this;

      //this.game.state.start("GameOver");
   },

   // {{{ MUTEGAME
   muteGame: function() {
      var self = this;
      if (!self.mute) {
         self.mute = true;
         self.music.pause()
         self.music_bonus.pause();
      } else {
         self.mute = false;
         if (self.in_bonus_level) {
            self.music_bonus.resume();
         } else {
            self.music.resume();
         }
      }

      console.log('mute is ' + self.mute);
      self.mute_wait = 30;
   },

   // {{{ RESTART
   // Restarts the game from zero
   restart: function(level) {
      var self = this;
   },
}

