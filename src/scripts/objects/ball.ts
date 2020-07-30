export default class Ball extends Phaser.Physics.Arcade.Sprite {
    group: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "ball");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(1);
    this.setCollideWorldBounds(true);    
  }

  public update() {}
}
