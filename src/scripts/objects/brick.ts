import UnmovableSprite from './unmovableSprite';

export default class Brick extends UnmovableSprite {
  lives: number;

  constructor(scene: Phaser.Scene, x: number, y: number, lives: number, assetName, width:number) {
    super(scene, x, y, assetName);

    this.setOrigin(0, 0);
    
    this.lives = lives;

    this.displayWidth = width;
    this.displayHeight = (this.displayWidth * this.height) / this.width;

    this.on('hit', (brick) => {
      brick.takeHit(brick);
    });
  }

  takeHit(brick) {
    if(brick.lives > 1) {
      brick.lives--;
      brick.updateAsset();
    } else {
      brick.destroy();
    }
  }

  updateAsset() {
    this.setTexture("brick" + this.lives)
  }

  public update() {}
}
