import { Exit } from "@/phaser/objects/Exit";
import { PixelAnimals } from "@/phaser/objects/PixelAnimals";
import { Player } from "@/phaser/objects/Player";
import {
  createMap1to6,
  preloadBaseAssets,
} from "@/phaser/phaserUtils/getBaseMap";

export class Level3Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;
  ducks: Phaser.GameObjects.Group;

  constructor() {
    super("Level3Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map3",
      path: "assets/tiled/pastel3.json",
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { player, collision_layer, duckSpawnPoints } = this.createMap();

    this.ducks = this.add.group();
    duckSpawnPoints.forEach(({ x, y }, index) => {
      const animal = new PixelAnimals(this, { x, y, frameNo: index });
      this.ducks.add(animal);
    });
    this.physics.add.collider(this.ducks, collision_layer);
    this.physics.add.collider(this.ducks, player, () => {
      this.scene.restart();
    });
  }
  update() {}
  shutdown() {}
  createMap() {
    const { map, collision_layer, player } = createMap1to6(this, {
      mapKey: "map3",
      nextSceneKey: "Level4Scene",
    });
    const duckSpawnPoints = map.filterObjects("Duck", ({ name }) => {
      return name.includes("Duck");
    });

    return {
      map,
      collision_layer,
      player,
      duckSpawnPoints,
    };
  }
}
