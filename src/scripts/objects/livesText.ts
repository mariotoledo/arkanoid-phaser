const config = require('../../config/config.json');

export default class LivesText extends Phaser.GameObjects.Text {
  lives:number;

  constructor(scene: Phaser.Scene) {
    super(scene, config.livesText.position.x, config.livesText.position.y, '', config.style)
    this.lives = config.game.lives;
    scene.add.existing(this)
    this.setOrigin(config.livesText.origin.x, config.livesText.origin.y)
  }

  public setLives(lives:number) {
    this.lives = lives;
  }

  public update() {
    this.setText(`Lives: ${this.lives}`);
  }
}
