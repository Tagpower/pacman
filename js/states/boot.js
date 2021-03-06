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
      this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      console.log("-*- Load SaveCPU -*-");
      this.saveCpu = this.game.plugins.add(Phaser.Plugin.SaveCPU);
      this.saveCpu.renderOnFPS = 50;

      console.log("-*- Load StateTransition -*-");
      this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
      this.game.stateTransition.configure({
         duration: Phaser.Timer.SECOND * 1.5,
         ease: Phaser.Easing.Exponential.InOut,
         properties: {
            alpha: 0,
            scale: {
               x: 0.4,
               y: 0.4
            }
         }
      });

      console.log("-*- Booted -*-");
      this.game.state.start("Preload");
   }
}
