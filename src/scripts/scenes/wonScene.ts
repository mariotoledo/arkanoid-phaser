const config = require('../../config/config.json')

export default class wonScene extends Phaser.Scene {
    constructor() {
        super({ key: "WonScene" });
    }

    create() {
        let wonText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "You Won!",
            config.gameOverText.style
        )

        wonText.setOrigin(
            config.wonText.origin.x,
            config.wonText.origin.y
        )

        this.add.existing(wonText);

        this.input.on('pointerdown', () => {
           this.scene.start('PressStartScene');
        });
    }
}