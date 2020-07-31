import UnmovableSprite from './unmovableSprite';
const config = require('../../config/config.json').paddle

export default class Paddle extends UnmovableSprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paddle");    

    this.setInteractive({ draggable: true })
    .on('drag', (pointer, dragX, dragY) => {
        this.x = dragX
    })
  }

  public enableShooting() {
    this.setTexture("paddle_gun");
  }

  public disableShooting() {
    this.setTexture("paddle");;
  }

  public enlarge() {
    this.scaleX = config.largeScale;
  }

  public shrink() {
    this.scaleX = config.normalScale;
  }

  public blink() {
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0 },
      ease: 'Linear',
      duration: config.blinkPaddleIntervalMs / 2,
      repeat: Math.floor(config.blinkPaddleTimeMs / config.blinkPaddleIntervalMs),
      yoyo: true
    });
  }
}
