import { Button } from "@/phaser/objects/Button";

export class UpgradeLayer extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene) {
    super(scene);

    this.fillStyle(0x000000, 0.5);
    this.fillRect(
      0,
      0,
      scene.game.config.width as number,
      scene.game.config.height as number
    );
    this.setDepth(1);

    const onClickClose = () => {
      this.destroy();
      XButton.destroy();
    };
    const XButton = new Button(scene, {
      x: (scene.game.config.width as number) - 50,
      y: 30,
      text: "X",
      onClick: onClickClose,
    })
      .setScrollFactor(0)
      .setDepth(2);

    (scene as any).cursors.space.on("down", onClickClose);

    scene.add.existing(XButton);
  }
}
