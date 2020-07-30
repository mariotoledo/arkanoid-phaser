import Paddle from "../objects/paddle";
import PointsText from "../objects/pointsText";
import LivesText from "../objects/livesText";
import BricksGroup from "../objects/bricksGroup";
import Ball from "../objects/ball";

import GameController from "../controllers/gameController"

const config = require("../../config/config.json");

export default class MainScene extends Phaser.Scene {
  pointsText: PointsText;
  livesText: LivesText;
  paddle: Paddle;
  bricksGroup: BricksGroup;
  ball: Ball;
  gameController:GameController;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.paddle = new Paddle(
      this,
      this.cameras.main.centerX,
      this.cameras.main.height + config.paddle.offset.y
    );

    this.pointsText = new PointsText(this);

    this.livesText = new LivesText(this);

    this.bricksGroup = new BricksGroup(this);

    this.ball = new Ball(
      this,
      this.cameras.main.centerX, 
      this.paddle.y - this.paddle.height,
    );

    this.gameController = new GameController(
      this,
      this.paddle,
      this.ball,
      this.bricksGroup,
      this.pointsText,
      this.livesText
    )
    this.gameController.initGame();
  }

  update() {
    this.pointsText.update();
    this.livesText.update();
    this.paddle.update();
    this.gameController.update();
  }
}
