import { PlayScene } from "@/phaser/scenes/playScene/PlayScene";
import { Missile } from "./Missile";
import { createHpBar, updateHpBar } from "@/phaser/phaserUtils/hpBar";
import { GAME } from "@/phaser/constants";

// export class Enemy extends Phaser.Physics.Arcade.Sprite {
export class Enemy extends Phaser.GameObjects.Container {
  static SPEED = 0.5;
  static RADIUS = 100;
  static centre = new Phaser.Math.Vector2(450, 400);
  angle = 0;
  maxHp: number;
  hp: number;
  hpBar: Phaser.GameObjects.Graphics;
  animalSprite: Phaser.Physics.Arcade.Sprite;
  frameNo: any;
  spriteKey: any;

  constructor(scene, { hp, spriteKey, frameNo }) {
    super(scene, 400, 700);
    this.animalSprite = new Phaser.Physics.Arcade.Sprite(
      scene,
      30,
      40,
      spriteKey,
      frameNo
    );
    this.hp = hp;
    this.maxHp = hp;
    this.frameNo = frameNo;
    this.spriteKey = spriteKey;

    this.animalSprite.setScale(3);
    this.animalSprite.x -= 25;
    this.animalSprite.y -= 25;

    this.animalSprite.anims.create({
      key: `${spriteKey}_move${frameNo}`,
      frames: this.animalSprite.anims.generateFrameNames(spriteKey, {
        frames: [frameNo, frameNo + 1],
      }),
      frameRate: 5,
    });

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.physics.add.overlap(
      this,
      scene.missiles,
      this.handleOverlapStart,
      null,
      this
    );

    const radius = 7;
    (this.body as any).setCircle(radius, radius - 8, radius - 3);

    this.hpBar = createHpBar(scene);
    this.add([this.hpBar, this.animalSprite]);

    scene.enemies.add(this);
  }
  protected preUpdate(_time: number, delta: number): void {
    this.handleCircularMovement(delta);
    updateHpBar({ hpBar: this.hpBar, maxHp: this.maxHp, hp: this.hp });
  }
  public isDestroyed() {
    return this.hp <= 0;
  }
  private handleCircularMovement(delta: number) {
    this.angle += (Enemy.SPEED * GAME.speed * delta) / 1000;

    const offset = new Phaser.Math.Vector2(
      Math.sin(this.angle),
      Math.cos(this.angle)
    )
      .normalize()
      .scale(Enemy.RADIUS);
    this.x = Enemy.centre.x + offset.x;
    this.y = Enemy.centre.y + offset.y;

    if (this.body.velocity.x > 0) {
      this.animalSprite.setFlipX(true);
      this.animalSprite.anims.play(
        `${this.spriteKey}_move${this.frameNo}`,
        true
      );
    } else {
      this.animalSprite.setFlipX(false);
      this.animalSprite.anims.play(
        `${this.spriteKey}_move${this.frameNo}`,
        true
      );
    }
  }
  private handleOverlapStart(_enemy: Enemy, missile: Missile) {
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
}
