import Paddle from '../objects/paddle'
import Ball from '../objects/ball'
import BricksGroup from '../objects/bricksGroup'
import PointsText from '../objects/pointsText';
import LivesText from '../objects/livesText';
import PowerUp from '../objects/powerUp';

import StageStrategyInterface from '../strategies/stageStrategyInterface';
import StateStrategyInstanceLoader from '../strategies/stageStrategyInstanceLoader';

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

    stageStrategy: StageStrategyInterface;

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
        
        const strategyLoader = new StateStrategyInstanceLoader();

        //fetching the only stage in game, but we could iterage on array to make more stages available
        const stageConfig = stagesConfig[0];
        this.stageStrategy = strategyLoader.getInstance(stageConfig.strategyType);
        this.brickGroup.buildFromStrategyData(this.stageStrategy.generateStageData(stageConfig.strategyConfig));
        this.brickGroup.setPowerUpCallback(this.createPowerUp, this);

        this.points = 0;
        this.lives = config.game.lives;
    }

    initGame() {
        this.ball.reset();
    }

    update() {
        if(this.hasLostBall()) {
            this.lives--;
            this.livesText.setLives(this.lives);
            
            if(this.lives == 0) {
                this.scene.scene.start('GameOverScene');
            } else {
                this.ball.reset();   
            }
        }

        if(this.hasNoMoreBricks()) {
            this.scene.scene.start('WonScene');
        }
    }

    hasLostBall() {
        return this.ball.body.y > this.scene.physics.world.bounds.height;
    }

    hasNoMoreBricks() {
        return this.brickGroup.getAll().length == 0;
    }

    createPowerUp(x, y, powerUpType, context) {
        const powerUp = new PowerUp(
            this.scene, 
            powerUpType, 
            x,
            y
        )

        this.scene.physics.add.collider(context.paddle, powerUp, () => {
            powerUp.destroy();
        });
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