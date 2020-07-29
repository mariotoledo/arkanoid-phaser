import UnmovableSprite from './unmovableSprite';

export default class Paddle extends UnmovableSprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "paddle");    

    this.setInteractive({ draggable: true })
    .on('drag', (pointer, dragX, dragY) => {
        this.x = dragX
    })
  }

  public update() {}
}
