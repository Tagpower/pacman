//Constants
var TILE_SIZE = 16;


// State
var preload = function(game) {
   console.log("Preloading...");
}

preload.prototype = {
   preload: function() {
      //Images
		//this.game.load.image('space', 'assets/bg.png');

		//Spritesheets
		this.game.load.spritesheet('tiles', 'assets/tiles_WIP.png', 16, 16);
		this.game.load.spritesheet('player', 'assets/player.png', 16, 16);

		//Music
		//this.game.load.audio('ambient', ['assets/audio/e1m1.mp3']);

		//Sounds
		//this.game.load.audio('pickup', ['assets/audio/pickup.wav']);


		this.game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);

		//var loadingBar = this.game.add.sprite(game.world.centerX, 400, "loading");
		//this.load.setPreloadSprite(loadingBar, 0);
   },
   create: function() {
      console.log("-*- Preloaded -*-");
      this.game.state.start("GameTitle");
   }
}
