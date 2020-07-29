export default class UnmovableSprite extends Phaser.Physics.Arcade.Sprite {
  group: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
    super(scene, x, y, spriteName);
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
}
