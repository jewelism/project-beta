import { Exit } from "@/phaser/objects/Exit";
import { PixelAnimals } from "@/phaser/objects/PixelAnimals";
import { Player } from "@/phaser/objects/Player";
import { createMap, preloadBaseAssets } from "@/phaser/phaserUtils/getBaseMap";

export class Level4Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;
  ducks: Phaser.GameObjects.Group;

  constructor() {
    super("Level4Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map4",
      path: "assets/tiled/pastel3.json",
    });
    this.load.spritesheet("player", "assets/Char2/Char2_idle_16px.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("pixel_animals", "assets/pixel_animals.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { collision_layer, player, duckSpawnPoints } = this.createMap();

    this.ducks = this.add.group();
    duckSpawnPoints.forEach(({ x, y }, index) => {
      const animal = new PixelAnimals(this, {
        x,
        y,
        frameNo: index,
        moveMode: "random",
      });
      this.ducks.add(animal);
    });

    this.physics.add.collider(this.ducks, collision_layer);
    this.physics.add.collider(this.ducks, player, () => {
      console.log("restart");

      this.scene.restart();
    });
  }
  update() {}
  shutdown() {}
  createMap() {
    const { map, collision_layer, player } = createMap(this, {
      mapKey: "map4",
      nextSceneKey: "Level5Scene",
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
