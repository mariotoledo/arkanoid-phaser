const config = require('../../config/config.json').pointsText;

export default class PointsText extends Phaser.GameObjects.Text {
  points:number;

  constructor(scene: Phaser.Scene) {
    super(scene, config.position.x, config.position.y, '', config.style)
    this.points = 0;
    scene.add.existing(this)
    this.setOrigin(config.origin)
  }

  public addPoints(points:number) {
    this.points += points;
  }

  public update() {
    this.setText(`Points: ${this.points}`);
  }
}
