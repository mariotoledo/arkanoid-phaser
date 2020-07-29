import Paddle from '../objects/paddle'
import PointsText from '../objects/pointsText'
import BricksGroup from '../objects/bricksGroup';

const config = require('../../config/config.json');
const stagesConfig = require('../../config/stages.json')

export default class MainScene extends Phaser.Scene {
  pointsText: Phaser.GameObjects.Text
  paddle: Phaser.Physics.Arcade.Sprite
  bricksGroup: BricksGroup

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
    this.bricksGroup = new BricksGroup(this);
    this.bricksGroup.buildFromStageConfig(stagesConfig[0]);
  }

  update() {
    this.pointsText.update()
    this.paddle.update()
  }
}
