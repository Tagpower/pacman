//Constants
var TILE_SIZE = 16;
var MODS = []; // mods files

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
		//this.game.load.binary('shampoo', 'assets/audio/shampoo.mod', this.modLoaded, this);

		//Sounds
		//this.game.load.audio('pickup', ['assets/audio/pickup.wav']);


		this.game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'maps/map2.json', null, Phaser.Tilemap.TILED_JSON);

		var loadingBar = this.game.add.sprite(game.world.centerX, game.world.centerY, "loading");
		this.load.setPreloadSprite(loadingBar, 0);
   },
   create: function() {
      console.log("-*- Preloaded -*-");
      this.game.state.start("GameTitle");
   },
   modLoaded: function(key, data) {
      MODS.push(key);
      var buffer = new Uint8Array(data);
      return buffer;
   }
}
