import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const config = require('../config/config.json');

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.game.width,
    height: config.game.height
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
      checkCollision: {
        up: true,
        right: true,
        left: true,
        down: false
      }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig)
})
