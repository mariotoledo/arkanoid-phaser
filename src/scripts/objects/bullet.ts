const config = require('../../config/config.json').bullets

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y){
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.y = config.velocity;
    }
}