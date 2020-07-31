const config = require('../../config/config.json')

export default class PressStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    create() {
        let gameOverText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "Game Over",
            config.gameOverText.style
        )

        gameOverText.setOrigin(
            config.gameOverText.origin.x,
            config.gameOverText.origin.y
        )

        this.add.existing(gameOverText);

        this.input.on('pointerdown', () => {
           this.scene.start('PressStartScene');
        });
    }
}