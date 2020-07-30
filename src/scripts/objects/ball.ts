const config = require('../../config/config.json').ball

export default class Ball extends Phaser.Physics.Arcade.Sprite {
    group: Phaser.Physics.Arcade.Group;
    initialX: number;
    initialY: number;

  constructor(scene: Phaser.Scene, initialX: number, initialY: number) {
    super(scene, initialX, initialY, "ball");
    this.initialX = initialX;
    this.initialY = initialY;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(1);
    this.setCollideWorldBounds(true);
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.body.velocity.x = config.velocity.x;
    this.body.velocity.y = config.velocity.y;
  }

  public update() {}
}
