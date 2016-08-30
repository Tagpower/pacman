//Constants



// State
var preload = function(game) {
   console.log("Preloading...");
}

preload.prototype = {
   preload: function() {
      //Images
		this.game.load.image('space', 'assets/bg.png');

		//Spritesheets
		this.game.load.spritesheet('enemyshots', 'assets/enemyshots.png', 4, 8);

		//Music
		this.game.load.audio('ambient', ['assets/audio/e1m1.mp3']);

		//Sounds
		this.game.load.audio('pickup', ['assets/audio/pickup.wav']);

		var loadingBar = this.game.add.sprite(game.world.centerX, 400, "loading");
		this.load.setPreloadSprite(loadingBar, 0);
   },
   create: function() {
      console.log("-*- Preloaded -*-");
      this.game.state.start("GameTitle");
   }
}
