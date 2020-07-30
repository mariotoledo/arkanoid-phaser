import Paddle from '../objects/paddle'
import Ball from '../objects/ball'
import BricksGroup from '../objects/bricksGroup'
import PointsText from '../objects/pointsText';
import LivesText from '../objects/livesText';

const stagesConfig = require("../../config/stages.json");

const config = require('../../config/config.json');

export default class GameController {
    scene: Phaser.Scene;
    paddle:Paddle;
    ball:Ball;
    brickGroup:BricksGroup;
    pointsText:PointsText;
    livesText:LivesText;

    points:number;
    lives:number;

    constructor(
        scene:Phaser.Scene,
        paddle:Paddle, 
        ball:Ball, 
        brickGroup:BricksGroup,
        pointsText:PointsText,
        livesText:LivesText)
    {
        this.scene = scene;
        this.paddle = paddle;
        this.ball = ball;
        this.brickGroup = brickGroup;
        this.pointsText = pointsText;
        this.livesText = livesText;

        this.createBallPaddleCollision(this.ball)
        this.createBallBrickCollision(this.ball)
        
        this.brickGroup.buildFromStageConfig(stagesConfig[0]);

        this.points = 0;
        this.lives = config.game.lives;
    }

    initGame() {
        this.ball.reset();
    }

    update() {
        if(this.hasLostBall()) {
            if(this.lives === 0) {
                //game over
            } else {
                this.ball.reset();   
            }

            this.lives--;
            this.livesText.setLives(this.lives);
        } 
    }

    hasLostBall() {
        return this.ball.body.y > this.scene.physics.world.bounds.height;
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
            this.points += config.game.pointsPerBrick;
            this.pointsText.setPoints(this.points)
        });
    }
}