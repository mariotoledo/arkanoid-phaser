export default class Paddle extends Phaser.Physics.Arcade.Sprite {
  group: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paddle");
    this.group = scene.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.group.add(this);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setBounce(1);
    this.setCollideWorldBounds(true);
  }

  public update() {
    console.log(this.x);
    console.log(this.y);
  }
}
