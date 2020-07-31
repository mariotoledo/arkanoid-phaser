const config = require('../../config/config.json').powerups;

export default class PowerUp extends Phaser.GameObjects.Rectangle {
    powerUpType:number;

    constructor(scene, powerUpType, x, y) {
        super(scene, x, y, config.width, config.height, config.colors[powerUpType]);
        this.powerUpType = powerUpType;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.velocity.y = 150;
    }
}