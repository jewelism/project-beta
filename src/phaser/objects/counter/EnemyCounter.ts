import { Counter } from "@/phaser/objects/counter/Counter";

export class EnemyCounter extends Counter {
  static TOTAL = 30;
  static getTemplate(value: number) {
    return `E: ${value} / ${EnemyCounter.TOTAL}`;
  }

  constructor(scene: Phaser.Scene, width: number, height: number) {
    super(scene, { width, height, template: EnemyCounter.getTemplate(0) });
  }
  setValue(value: number) {
    this.setText(EnemyCounter.getTemplate(value));
  }
  setTotal(value: number) {
    EnemyCounter.TOTAL = value;
  }
}
