var gameTitle = function(game) {
   console.log("Game Title");
}

gameTitle.prototype = {
   preload: function() {

   },

   create: function() {
      var self = this;
      console.log("-*- Launch the game -*-");


      //self.music = game.add.audio('title');
      //self.music.loop = true;
      //self.music.volume = 1;
      //self.music.play();
      self.launch(0);
   },

   update: function() {
      //this.background.tilePosition.y += 1
   },

   launch: function(difficulty) {
      var self = this;
      var config = {
         is_boss: false,
         current_level: 0,
      };
      //self.music.stop();
      this.game.state.start("Game", true, false, config);
   }

}
