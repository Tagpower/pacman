var boot = function(game) {
   console.log("Booting...");
}

boot.prototype = {
   preload: function() {

      this.game.load.image('loading', 'assets/loadingbar.png');
   },
   create : function() {
      //this.scale.pageAlignHorizontally = true;

      this.game.renderer.clearBeforeRender = false;
      this.game.renderer.roundPixels = false;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      console.log("-*- Booted -*-");
      this.game.state.start("Preload");
   }
}
