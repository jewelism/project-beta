import { SelectLevelButton } from "@/phaser/objects/SelectLevelButton";
import { createTitleText } from "@/phaser/phaserUtils/titleText";

export class SelectLevelScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("SelectLevelScene");
  }
  preload() {}
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    createTitleText(this, "Select Level", 100);

    Array.from({ length: 6 }).forEach((_, index) => {
      new SelectLevelButton(this, {
        x: 100,
        y: 200 + index * 50,
        text: `Level ${index + 1}`,
        onClick: () => {
          // TODO: disabled 처리 - 레벨을 아직 선택할수없을때
          if (true) {
            this.scene.start(`Level${index + 1}Scene`);
          }
        },
      });
    });
  }
}
