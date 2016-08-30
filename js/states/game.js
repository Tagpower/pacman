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

      //Create the player's ship
      console.log("\tCreating player...");
      self.createPlayer();
      console.log("\t-*- Player created -*-");
      self.game.camera.follow(self.player); 
   },

   update: function() {
      var self = this;
      
      //Check collisions for everything
   },

   // {{{ CREATEPLAYER
   createPlayer: function() {
      var self = this;
      self.player = self.game.add.sprite(self.init_x,self.init_y,'ship');
      self.game.physics.arcade.enable(self.player);

      self.player.body.collideWorldBounds = true;
      self.player.body.immovable = false;
      self.lostAlife = false;
      self.touched = false;

      self.player.anchor.setTo(0.5,0.5);

      self.player.animations.add('idle', [0,1],6,true);
      self.player.animations.add('left', [2,3],6,true);
      self.player.animations.add('right', [4,5],6,true);
      self.player.animations.add('dead', [6],6,true);

      self.weapon = self.weapons[self.power-1];
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

