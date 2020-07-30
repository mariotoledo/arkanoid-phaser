import Paddle from "../objects/paddle";
import PointsText from "../objects/pointsText";
import BricksGroup from "../objects/bricksGroup";
import Ball from "../objects/ball";

const config = require("../../config/config.json");
const stagesConfig = require("../../config/stages.json");

export default class MainScene extends Phaser.Scene {
  pointsText: Phaser.GameObjects.Text;
  paddle: Phaser.Physics.Arcade.Sprite;
  bricksGroup: BricksGroup;
  ball: Ball;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.paddle = new Paddle(
      this,
      this.cameras.main.centerX,
      this.cameras.main.height + config.paddle.offset.y
    );
    this.ball = new Ball(this, this.cameras.main.centerX, this.paddle.y - 100);

    this.pointsText = new PointsText(this);

    this.bricksGroup = new BricksGroup(this);
    this.bricksGroup.buildFromStageConfig(stagesConfig[0]);

    this.physics.add.collider(this.paddle, this.ball, () => {
      let diff = 0;
      if (this.ball.x < this.paddle.x) {
        diff = this.paddle.x - this.ball.x;
        this.ball.body.velocity.x = -10 * diff;
      } else if (this.ball.x > this.paddle.x) {
        diff = this.ball.x - this.paddle.x;
        this.ball.body.velocity.x = 10 * diff;
      } else {
        this.ball.body.velocity.x = 2 + Math.random() * 8;
      }
    });
  }

  update() {
    this.pointsText.update();
    this.paddle.update();
  }
}
