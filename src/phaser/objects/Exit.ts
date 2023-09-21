export class Exit extends Phaser.Physics.Arcade.Sprite {
  blocked = false;

  constructor(scene, { x, y }) {
    super(scene, x, y, "exit");

    // 왜 이런 보정이 필요한가?
    this.x += this.width / 2;
    this.y += this.height / 2;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
  }

  preUpdate() {}
}
