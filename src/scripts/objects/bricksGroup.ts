import Brick from "./brick";

const config = require("../../config/config.json");

export default class BricksGroup extends Phaser.GameObjects. Group {
  scene: Phaser.Scene;

  constructor(scene) {
    super(scene)
    this.scene = scene;
  }

  public buildFromStageConfig(stageConfig) {
    //defines the area that the bricks will occupy on screen
    const bricksRelativeHeight =
      config.game.height * config.bricks.relativeHeight;
    const bricksRelativeWidth = config.game.width * config.bricks.relativeWidth;

    const brickHeight = bricksRelativeHeight / stageConfig.bricks.length;

    stageConfig.bricks.forEach((brickLineConfig, i) => {
      let brickWidth = bricksRelativeWidth / brickLineConfig.length;

      brickLineConfig.forEach((brickConfig, j) => {
        const brick = new Brick(
          this.scene,
          brickWidth * j,
          brickHeight * i,
          brickConfig,
          "brick" + brickConfig,
          brickWidth,
          brickHeight
        );

        this.add(brick);
      });
    });

    this.incY(config.bricks.offsetY);
  }
}
