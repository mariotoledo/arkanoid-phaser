export default class Brick extends Phaser.Physics.Arcade.Sprite {
  group: Phaser.Physics.Arcade.Group;
  lives: number;

  constructor(scene: Phaser.Scene, x: number, y: number, lives: number, assetName, width, height) {
    super(scene, x, y, assetName);
    this.group = scene.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.setOrigin(0, 0);
    this.group.add(this);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setBounce(1);
    this.setCollideWorldBounds(true);
    
    this.lives = lives;

    this.displayWidth = width;
    this.displayHeight = height;
  }

  public update() {}
}
