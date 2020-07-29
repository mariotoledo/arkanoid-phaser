import Paddle from '../objects/paddle'
import PointsText from '../objects/pointsText'
const config = require('../../config/config.json');

export default class MainScene extends Phaser.Scene {
  pointsText: Phaser.GameObjects.Text
  paddle: Phaser.Physics.Arcade.Sprite

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.paddle = new Paddle(
      this, 
      this.cameras.main.centerX, 
      this.cameras.main.height + config.paddle.offset.y
    );
    this.pointsText = new PointsText(this)
  }

  update() {
    this.pointsText.update()
    this.paddle.update()
  }
}
