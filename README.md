# Phaser 3 Arkanoid/Breakout TypeScript Example

An example of Arkanoid/Breakout game made using Phaser 3 and Typescript with Node.js. Different from the common Arkanoid, this game features the following items:

  - Power Ups when bricks are destroyed
  - Strategy Pattern for stage config

[>> Play the game by clicking here <<](https://mariotoledo.github.io/arkanoid-phaser/)

### Instalation
You must have [Node.js](https://nodejs.org/) instaled on your After cloning this project, run the following command on the terminal:

```sh
$ npm install
```

### Running
To execute this project, simply run the following command on the terminal:

```sh
$ npm start
```

### Gameplay
You can control the paddle on screen by dragging it to left or right. You must hit the ball with the paddle and destroy all bricks on screen. When the ball escapes screen from the bottom, the player loses a life. When a brick is destroyed, there is a chance do spawn a power up defined by the following colors:
- Red Square: creates a second ball to hit the bricks. The player only loses a life if all the balls on screen are escaped from the bottom;
- Green Square: allows the paddle to fire bullets for 3 seconds (tap on screen to shoot);
- Blue Square: the paddle enlarges for 10 seconds;

### Game Configuration
On the config folder, there are two files: `config.js` and `stages.js`. While the `config.js` contains all parameters used by the game, the `stages.js` contains configuration for the Algorithms used to create the bricks on the game (detailed in the next section).

Some useful configuration for `config.js` (most of them are just for positioning and styling):
| Property | Description |
| ------ | ------ |
| game.lives | Number of lives the player has each time the game is started |
| game.pointsPerBrick | Number of points the player wins each time a brick is destroyed |
| powerups.dropChance | Changes the drop rate of every power up each time a brick is destroyed |
| paddle.largeScale | Scaled paddle size when the player gets the wide paddle power up |
| powerups.velocity | Velocity of the drop of a power up |
| powerups.colors | Each power up is determined by a colorful rectangle. This object defines a color for each type of power up |
| bullets.velocity | Defines the velocity of a bullet (must be negative to go up)  |

### Stage Building
This projects uses the [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) to use a algorithm to generate the bricks of the stage. While all strategy files (and the bricks generation algorithms) are stored under the `strategy` folder, the configuration for the algorithms (such as what type of algorithm to use and number of bricks of each kind) are stored on `stages.json`. You can change the type of algorithm that is used to generate bricks by changing the value of `strategyType` propertyes on `stages.json`.

Currently, there are two kinds of algorithms to generate bricks:
- `ordered`: creates all bricks by the following order: red on first row, yellow on second row and blue on last row
- `random`: creates all bricks on random order