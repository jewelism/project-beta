import { Exit } from "@/phaser/objects/Exit";
import { Player } from "@/phaser/objects/Player";
import { createMap, preloadBaseAssets } from "@/phaser/phaserUtils/getBaseMap";

export class Level2Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;

  constructor() {
    super("Level2Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map2",
      path: "assets/tiled/pastel2.json",
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    createMap(this, {
      mapKey: "map2",
      nextSceneKey: "Level3Scene",
    });
  }
  update() {}
  shutdown() {}
}
