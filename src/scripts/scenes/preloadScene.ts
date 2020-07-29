export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('paddle', 'assets/img/paddle.png')
    this.load.image('ball', 'assets/img/ball.png')
    this.load.image('brick0', 'assets/img/brick0.png')
    this.load.image('brick1', 'assets/img/brick1.png')
    this.load.image('brick2', 'assets/img/brick2.png')
    this.load.image('brick3', 'assets/img/brick3.png')
    this.load.image('brick4', 'assets/img/brick4.png')
    this.load.image('brick5', 'assets/img/brick5.png')
  }

  create() {
    this.scene.start('MainScene')
  }
}
