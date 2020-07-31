import UnmovableSprite from './unmovableSprite';
const config = require('../../config/config.json');

export default class Brick extends UnmovableSprite {
  lives: number;
  powerUpCallback: (x:number, y:number, powerUpType: number, context: any) => void;
  powerUpCallbackContext: any;

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
      this.dropPowerUp();
      brick.destroy();
    }
  }

  dropPowerUp() {
    const dropChance = Math.random();

    if(dropChance <= config.powerups.dropChance) {
      const powerUpType = Math.floor(Math.random() * 3);
      if(this.powerUpCallback)
        this.powerUpCallback(
          this.getCenter().x + this.parentContainer.x, 
          this.getCenter().y + this.parentContainer.y, 
          powerUpType,
          this.powerUpCallbackContext
        );
    }
  }

  updateAsset() {
    this.setTexture("brick" + this.lives)
  }

  public update() {}
}
