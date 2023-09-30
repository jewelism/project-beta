export class Exit extends Phaser.Physics.Arcade.Sprite {
  blocked = false;

  constructor(scene, { x, y }) {
    super(scene, x, y, "exit");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setOrigin(0, 0);
  }

  preUpdate() {}
}
