import UnmovableSprite from './unmovableSprite';

export default class Brick extends UnmovableSprite {
  lives: number;

  constructor(scene: Phaser.Scene, x: number, y: number, lives: number, assetName, width, height) {
    super(scene, x, y, assetName);

    this.setOrigin(0, 0);
    
    this.lives = lives;

    this.displayWidth = width;
    this.displayHeight = height;
  }

  public update() {}
}
