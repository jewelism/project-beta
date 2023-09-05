export class Waterfall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, { x, y }) {
    super(scene, x, y, "waterfall");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
  }
}
