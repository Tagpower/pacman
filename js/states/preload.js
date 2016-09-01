//Constants
var TILE_SIZE = 16;
var easystar = new EasyStar.js();

// State
var preload = function(game) {
   console.log("Preloading...");
}

preload.prototype = {
   preload: function() {
      //Images
		//this.game.load.image('space', 'assets/bg.png');

		this.game.load.image('dot', 'assets/dot.png', 2, 2);

		//Spritesheets
		this.game.load.spritesheet('tiles', 'assets/tiles_WIP.png', 16, 16);
		this.game.load.spritesheet('player', 'assets/player.png', 16, 16);

		//Music
		//this.game.load.audio('ambient', ['assets/audio/e1m1.mp3']);

		//Sounds
		//this.game.load.audio('pickup', ['assets/audio/pickup.wav']);


		this.game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'maps/map2.json', null, Phaser.Tilemap.TILED_JSON);

		var loadingBar = this.game.add.sprite(game.world.centerX, game.world.centerY, "loading");
		this.load.setPreloadSprite(loadingBar, 0);
   },
   create: function() {
      console.log("-*- Preloaded -*-");
      console.log(easystar);
      this.game.state.start("GameTitle");
   }
}
