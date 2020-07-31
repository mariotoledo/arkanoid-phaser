import Paddle from '../objects/paddle'
import Ball from '../objects/ball'
import BricksGroup from '../objects/bricksGroup'
import PointsText from '../objects/pointsText';
import LivesText from '../objects/livesText';
import PowerUp from '../objects/powerUp';
import PowerUpType from '../objects/powerUpType';

import StageStrategyInterface from '../strategies/stageStrategyInterface';
import StateStrategyInstanceLoader from '../strategies/stageStrategyInstanceLoader';
import Bullet from '../objects/bullet';

const stagesConfig = require("../../config/stages.json");

const config = require('../../config/config.json');

export default class GameController {
    [x: string]: any;
    scene: Phaser.Scene;
    paddle:Paddle;
    brickGroup:BricksGroup;
    pointsText:PointsText;
    livesText:LivesText;
    balls:Array<Ball>;
    bullets:Array<Bullet>;

    points:number;
    lives:number;

    shootingEnabled:boolean;

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
        this.brickGroup = brickGroup;
        this.pointsText = pointsText;
        this.livesText = livesText;

        this.createBallPaddleCollision(ball)
        this.createBallBrickCollision(ball)
        this.balls = [ball];

        this.createBulletInput();
        this.shootingEnabled = false;

        this.bullets = [];
        
        const strategyLoader = new StateStrategyInstanceLoader();

        //fetching the only stage in game, but we could iterate on array to make more stages available
        const stageConfig = stagesConfig[0];
        this.stageStrategy = strategyLoader.getInstance(stageConfig.strategyType);
        this.brickGroup.buildFromStrategyData(this.stageStrategy.generateStageData(stageConfig.strategyConfig));
        this.brickGroup.setPowerUpCallback(this.createPowerUp, this);

        this.points = 0;
        this.lives = config.game.lives;
    }

    initGame() {
        this.balls[0].reset();
    }

    update() {
        if(this.hasLostAllBalls()) {
            this.lives--;
            this.livesText.setLives(this.lives);
            
            if(this.lives == 0) {
                this.scene.scene.start('GameOverScene');
            } else {
                //removes and destroys all extra balls, keeps only first ball and reset
                if(this.balls.length > 1) {
                    const toRemoveBalls = this.balls.slice(1, this.balls.length);
                    toRemoveBalls.forEach(toRemoveBall => {
                        toRemoveBall.destroy();
                    })
                }
                this.balls = [this.balls[0]]
                this.balls[0].reset();
            }
        }

        if(this.hasNoMoreBricks()) {
            this.scene.scene.start('WonScene');
        }

        this.bullets.forEach((bullet) => {
            if(bullet.y < bullet.height) {
                bullet.destroy();
            }
        })
    }

    hasLostAllBalls() {
        let hasBallInGame = false;

        this.balls.forEach(ball => {
            if(ball.body.y < this.scene.physics.world.bounds.height) {
                hasBallInGame = true;
            }
        })
        return hasBallInGame == false;
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
            switch(powerUp.powerUpType) {
                case PowerUpType.ExtraBall:
                    const newBall = new Ball(
                        context.scene, 
                        context.balls[0].initialX, 
                        context.balls[0].initialY
                    );

                    context.balls.push(newBall);
                    context.createBallPaddleCollision(newBall);
                    context.createBallBrickCollision(newBall);

                    newBall.reset();

                    break;
                case PowerUpType.Shooting:
                    context.paddle.enableShooting();
                    context.shootingEnabled = true;

                    context.scene.time.addEvent({
                        delay: config.powerups.shootingDisableTimeMs,
                        callback: () => {
                            context.paddle.disableShooting();
                            context.shootingEnabled = false;
                        }
                    });
                    break;
                case PowerUpType.LargePaddle:
                    context.paddle.enlarge();
                    context.scene.time.addEvent({
                        delay: config.powerups.enlargePaddleTimeMs,
                        callback: () => {
                            context.paddle.shrink();
                        }
                    });

                    context.scene.time.addEvent({
                        delay: config.powerups.enlargePaddleTimeMs - config.paddle.blinkPaddleTimeMs,
                        callback: () => {
                            context.paddle.blink();
                        }
                    });
            }
            powerUp.destroy();
        });
    }

    createBallPaddleCollision(ball) {
        //checks the difference between the paddle and the ball to decide where the ball must go
        this.scene.physics.add.collider(this.paddle, ball, () => {
            let diff = 0;
            
            if (ball.x < this.paddle.x) {
                diff = this.paddle.x - ball.x;
                ball.body.velocity.x = -(config.ball.minVelocity + config.ball.maxVelocity) * diff;
            } else if (ball.x > this.paddle.x) {
                diff = ball.x - this.paddle.x;
                ball.body.velocity.x = (config.ball.minVelocity + config.ball.maxVelocity) * diff;
            } else {
                ball.body.velocity.x = config.ball.minVelocity + Math.random() * config.ball.maxVelocity;
            }
        });
    }

    createBulletInput() {
        this.scene.input.on('pointerdown', () => {
            if(this.shootingEnabled == true)  {
                const leftBullet = new Bullet(
                    this.scene, 
                    this.paddle.x - this.paddle.width / 2, 
                    this.paddle.y
                );
                const rightBullet = new Bullet(
                    this.scene, 
                    this.paddle.x + this.paddle.width / 2, 
                    this.paddle.y
                );

                this.createBulletBrickCollision(leftBullet);
                this.createBulletBrickCollision(rightBullet);
                
                this.bullets.push(leftBullet);
                this.bullets.push(rightBullet);
            }            
        });
    }

    destroyObject(obj) {
        obj.destroy();
    }

    createBallBrickCollision(ball) {
        this.scene.physics.add.collider(ball, this.brickGroup.group, (_ball, brick) => {
            this.destroyBrick(brick);
        });
    }

    createBulletBrickCollision(bullet) {
        this.scene.physics.add.collider(bullet, this.brickGroup.group, (bullet, brick) => {
            this.destroyBrick(brick);
            bullet.destroy();
        });
    }

    destroyBrick(brick) {
        brick.emit('hit', brick);
        this.points += config.game.pointsPerBrick;
        this.pointsText.setPoints(this.points)
    }
}