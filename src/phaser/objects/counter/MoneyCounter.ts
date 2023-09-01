import { Counter } from "@/phaser/objects/counter/Counter";

export class MoneyCounter extends Counter {
  static getTemplate(value: number) {
    return `$: ${value}`;
  }

  constructor(scene: Phaser.Scene, width: number, height: number) {
    super(scene, { width, height, template: MoneyCounter.getTemplate(0) });
  }
  setValue(value: number) {
    this.setText(MoneyCounter.getTemplate(value));
  }
}
