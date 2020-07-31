import Brick from "./brick";

const config = require("../../config/config.json");

export default class BricksGroup extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Group;

  constructor(scene) {
    super(scene)
    this.scene = scene;
    this.group = this.scene.add.group();
  }

  public buildFromStrategyData(strategyData) {
    //defines the area that the bricks will occupy on screen
    const bricksRelativeHeight = config.game.height * config.bricks.relativeHeight;
    const bricksRelativeWidth = config.game.width * config.bricks.relativeWidth;

    const brickHeight = bricksRelativeHeight / strategyData.length;

    strategyData.forEach((brickLineConfig, i) => {
      let brickWidth = bricksRelativeWidth / brickLineConfig.length;

      brickLineConfig.forEach((brickConfig, j) => {
        const brick = new Brick(
          this.scene,
          brickWidth * j,
          brickHeight * i,
          brickConfig,
          "brick" + brickConfig,
          brickWidth,
        );

        this.group.add(brick);
        this.add(brick);
      });
    });

    this.scene.add.existing(this);
    
    this.setPosition(
      (config.game.width - this.getBounds().width) / 2,
      config.bricks.offsetY
    )
  }

  public setPowerUpCallback(powerUpCallback, context) {
    this.getAll().forEach(brick => {
      (<Brick> brick).powerUpCallback = powerUpCallback;
      (<Brick> brick).powerUpCallbackContext = context;
    })
  }
}
