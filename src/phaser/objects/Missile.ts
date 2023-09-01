import { GAME } from "@/phaser/constants";
import { PlayScene } from "../scenes/playScene/PlayScene";
import { Animal } from "@/phaser/objects/Animal";

export class Missile extends Phaser.Physics.Arcade.Sprite {
  static SPEED = 500;
  destroyed: boolean = false;
  damage: number;
  closestEnemy: Phaser.GameObjects.GameObject;

  constructor(scene, { shooter, damage }) {
    super(scene, shooter.x, shooter.y, "bomb");
    this.setScale(0.3);
    this.damage = damage;

    scene.missiles.add(this);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    // scene.m_beamSound.play();
    this.closestEnemy = this.scene.physics.closest(
      this,
      (this.scene as PlayScene).enemies.getChildren()
    );
  }
  protected preUpdate(_time: number, _delta: number): void {
    this.moveToClosestEnemy();
  }
  moveToClosestEnemy() {
    if (!this.closestEnemy || (this.closestEnemy as Animal).isDestroyed()) {
      this.destroy();
      return;
    }
    this.scene.physics.moveToObject(
      this,
      this.closestEnemy,
      GAME.speed * Missile.SPEED
    );
  }
}
