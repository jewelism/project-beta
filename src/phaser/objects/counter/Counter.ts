import { getUIStyle } from "@/phaser/constants";

export class Counter extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    {
      width,
      height,
      template,
    }: { width: number; height: number; template: string }
  ) {
    super(scene, width, height, template, getUIStyle());
    scene.add.existing(this);
  }
}
