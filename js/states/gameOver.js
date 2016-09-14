var gameOver = function(game) {
   Phaser.State.call(this);
}

gameOver.prototype = Object.create(Phaser.State);
gameOver.prototype.constructor = gameOver;

gameOver.prototype = {

   preload: function() {

   },

   create: function() {
      self.text_over = self.game.add.text(self.game.world.width/2, self.game.world.height/2, 'GAME OVER', {font: '50px Minecraftia', fill: '#ffffff'});
      self.text_over.fixedToCamera = true;
      self.text_over.smoothed = false;
      self.text_over.anchor.setTo(0.5);
      this.game.stateTransition.to("Game", true, false, {current_level: 0});
   }

}

