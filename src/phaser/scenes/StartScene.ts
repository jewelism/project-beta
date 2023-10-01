import { createTitleText } from "@/phaser/phaserUtils/titleText";

export class StartScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("StartScene");
  }
  preload() {}
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const title = createTitleText(this, "Escape from jewelry");

    const pressAnyKeyText = this.add
      .text(title.x, title.y + 500, "press any key", {
        fontSize: "20px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: pressAnyKeyText,
      alpha: 0,
      duration: 600,
      ease: "Power2",
      yoyo: true,
      repeat: -1,
    });
    this.input.keyboard.on("keydown", () => {
      // 키가 눌렸을 때 실행할 코드
      this.scene.start("SelectLevelScene");
    });
  }
}
