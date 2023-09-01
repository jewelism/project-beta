import { Counter } from "@/phaser/objects/counter/Counter";

export class PhaseCounter extends Counter {
  private tween: Phaser.Tweens.Tween;
  currentValue: number;

  static getTemplate(value: number) {
    return `Phase ${value}`;
  }

  constructor(scene: Phaser.Scene, width: number, height: number) {
    super(scene, { width, height, template: PhaseCounter.getTemplate(1) });
    this.setScale(3);

    this.setX((scene.game.config.width as number) / 2 - this.width * 2);
    this.setY(this.height);
  }
  setValue(value: number) {
    if (this.currentValue === value) {
      return;
    }
    this.currentValue = value;
    if (this.tween) {
      this.tween.stop();
    }
    this.tween = this.scene.tweens.add({
      targets: this,
      scale: 2,
      duration: 1000,
      ease: "Linear",
      onStart: () => {
        this.setScale(3);
        this.setText(PhaseCounter.getTemplate(value));
      },
    });
  }
}
