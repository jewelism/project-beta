import { Exit } from "@/phaser/objects/Exit";
import { Player } from "@/phaser/objects/Player";
import {
  createMap1to6,
  preloadBaseAssets,
} from "@/phaser/phaserUtils/getBaseMap";

export class Level1Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;

  constructor() {
    super("Level1Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map1",
      path: "assets/tiled/pastel1.json",
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    createMap1to6(this, {
      mapKey: "map1",
      nextSceneKey: "Level2Scene",
    });
  }
  update() {}
  shutdown() {}
}
