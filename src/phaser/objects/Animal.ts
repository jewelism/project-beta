import { PlayScene } from "@/phaser/scenes/playScene/PlayScene";
import { Missile } from "./Missile";
import { createHpBar, updateHpBar } from "@/phaser/phaserUtils/hpBar";

export class Animal extends Phaser.GameObjects.Container {
  maxHp: number;
  hp: number;
  frameNo: number;
  animalSprite: Phaser.Physics.Arcade.Sprite;
  moveTimer: any;
  moveSpeed: number = 100;
  hpBar: any;

  constructor(scene, { x, y, hp, frameNo }) {
    super(scene, x, y);
    this.animalSprite = new Phaser.Physics.Arcade.Sprite(
      scene,
      30,
      40,
      "pixel_animals",
      frameNo
    );

    this.animalSprite.setScale(2);
    this.frameNo = frameNo;

    this.animalSprite.anims.create({
      key: `pixel_animals_move${frameNo}`,
      frames: this.animalSprite.anims.generateFrameNames("pixel_animals", {
        frames: [frameNo, frameNo + 1],
      }),
      frameRate: 5,
    });

    this.hp = hp;
    this.maxHp = hp;

    this.hpBar = createHpBar(scene);

    this.hpBar.x += 25;
    this.hpBar.y += 25;
    this.add([this.hpBar, this.animalSprite]);

    scene.add.existing(this);
    scene.physics.add.existing(this.animalSprite);
    scene.physics.world.enableBody(this.animalSprite);
    scene.enemies.add(this);
    scene.physics.add.overlap(
      this,
      scene.missiles,
      this.handleOverlapStart,
      null,
      this
    );
  }
  public preUpdate(_time: number, _delta: number): void {
    // this.randomMove();
    this.moveToPlayer();
    updateHpBar({ hpBar: this.hpBar, maxHp: this.maxHp, hp: this.hp });
  }
  public isDestroyed() {
    return this.hp <= 0;
  }
  private handleOverlapStart(_animal: Animal, missile: Missile) {
    missile.destroy();
    this.hp -= missile.damage;

    if (this.hp <= 0) {
      (this.scene as PlayScene).money += 1;
      (this.scene as PlayScene).moneyCounter.setValue(
        (this.scene as PlayScene).money
      );
      this.destroy();
    }
  }
  moveToPlayer() {
    this.scene.physics.moveToObject(
      this,
      (this.scene as PlayScene).player,
      this.moveSpeed
    );
    if (this.body.velocity.x > 0) {
      this.animalSprite.setFlipX(true);
      this.animalSprite.anims.play(`pixel_animals_move${this.frameNo}`, true);
    } else {
      this.animalSprite.setFlipX(false);
      this.animalSprite.anims.play(`pixel_animals_move${this.frameNo}`, true);
    }
  }
  randomMove() {
    if (this.moveTimer) {
      return;
    }
    this.moveTimer = this.scene.time.delayedCall(1000, () => {
      this.moveTimer = null;
      if (this.isDestroyed()) {
        return;
      }
      const randomVelocity = Phaser.Math.RandomXY(
        new Phaser.Math.Vector2(),
        this.moveSpeed
      );
      this.body.velocity.x = randomVelocity.x;
      this.body.velocity.y = randomVelocity.y;
      if (randomVelocity.x > 0) {
        this.animalSprite.setFlipX(true);
        this.animalSprite.anims.play(`pixel_animals_move${this.frameNo}`, true);
      } else {
        this.animalSprite.setFlipX(false);
        this.animalSprite.anims.play(`pixel_animals_move${this.frameNo}`, true);
      }
    });
  }
}
