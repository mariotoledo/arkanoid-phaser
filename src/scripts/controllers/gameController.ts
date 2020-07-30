import Paddle from '../objects/paddle'
import Ball from '../objects/ball'
import BricksGroup from '../objects/bricksGroup'

const stagesConfig = require("../../config/stages.json");

export default class GameController {
    scene: Phaser.Scene;
    paddle:Paddle;
    ball:Ball;
    brickGroup:BricksGroup;

    constructor(
        scene:Phaser.Scene,
        paddle:Paddle, 
        ball:Ball, 
        brickGroup:BricksGroup)
    {
        this.scene = scene;
        this.paddle = paddle;
        this.ball = ball;
        this.brickGroup = brickGroup;

        this.createBallPaddleCollision(this.ball)
        this.createBallBrickCollision(this.ball)
        this.brickGroup.buildFromStageConfig(stagesConfig[0]);
    }

    initGame() {
        this.ball.body.velocity.y = -500;
        this.ball.body.velocity.x = -75;
    }

    createBallPaddleCollision(ball) {
        this.scene.physics.add.collider(this.paddle, ball, () => {
            let diff = 0;
            
            if (ball.x < this.paddle.x) {
                diff = this.paddle.x - ball.x;
                ball.body.velocity.x = -10 * diff;
            } else if (ball.x > this.paddle.x) {
                diff = ball.x - this.paddle.x;
                ball.body.velocity.x = 10 * diff;
            } else {
                ball.body.velocity.x = 2 + Math.random() * 8;
            }
        });
    }

    destroyObject(obj) {
        obj.destroy();
    }

    createBallBrickCollision(ball) {
        this.scene.physics.add.collider(ball, this.brickGroup.group, (_ball, brick) => {
            brick.emit('hit', brick);
        });
    }
}