const config = require('../../config/config.json')

export default class PressStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "PressStartScene" });
    }

    create() {
        let pressStartText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "press on screen to start",
            config.pressStartText.style
        )

        pressStartText.setOrigin(
            config.pressStartText.origin.x,
            config.pressStartText.origin.y
        )

        this.add.existing(pressStartText);

        this.input.on('pointerdown', () => {
           this.scene.start('MainScene');
        });
    }
}