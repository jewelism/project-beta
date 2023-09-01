export class PixelAnimals extends Phaser.Physics.Arcade.Sprite {
  attackTimer: Phaser.Time.TimerEvent;
  attackRange: number = 100;
  attackSpeed: number = 300;
  damage: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  moveSpeed: number = 100;
  frameNo: number;
  moveTimer: Phaser.Time.TimerEvent;

  constructor(scene, { x, y, frameNo }) {
    super(scene, x, y, "pixel_animals", frameNo);
    this.damage = 1;

    this.anims.create({
      key: `pixel_animals_move${frameNo}`,
      frames: this.anims.generateFrameNames("pixel_animals", {
        frames: [frameNo, frameNo + 1],
      }),
    });
    this.setScale(2);
    this.frameNo = frameNo;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }
  preUpdate() {
    this.randomMove();
  }
  randomMove() {
    if (this.moveTimer) {
      return;
    }
    this.moveTimer = this.scene.time.delayedCall(1000, () => {
      const randomVelocity = Phaser.Math.RandomXY(
        new Phaser.Math.Vector2(),
        this.moveSpeed
      );
      this.setVelocity(randomVelocity.x, randomVelocity.y);
      if (randomVelocity.x > 0) {
        this.setFlipX(true);
        this.anims.play(`pixel_animals_move${this.frameNo}`, true);
      } else {
        this.setFlipX(false);
        this.anims.play(`pixel_animals_move${this.frameNo}`, true);
      }
      this.moveTimer = null;
    });
  }
}
