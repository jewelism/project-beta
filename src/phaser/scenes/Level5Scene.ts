import { Exit } from "@/phaser/objects/Exit";
import { PixelAnimals } from "@/phaser/objects/PixelAnimals";
import { Player } from "@/phaser/objects/Player";
import { createMap, preloadBaseAssets } from "@/phaser/phaserUtils/getBaseMap";
import { makeSafeArea } from "@/phaser/phaserUtils/safeArea";

export class Level5Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;
  ducks: Phaser.GameObjects.Group;
  safeAreas: Phaser.Geom.Rectangle[];

  constructor() {
    super("Level5Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map5",
      path: "assets/tiled/pastel5.json",
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
    const { collision_layer, duckSpawnPoints, safeAreaPoints } =
      this.createMap();

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
    this.safeAreas = makeSafeArea(this, safeAreaPoints);

    this.physics.add.collider(this.ducks, collision_layer);
    this.physics.add.overlap(this.ducks, this.player, () => {
      if (this.player.safe) {
        return;
      }
      this.scene.restart();
    });
  }
  update() {
    const isSafe = this.safeAreas.some((safeArea) => {
      const playerRect = new Phaser.Geom.Rectangle(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );

      return Phaser.Geom.Rectangle.ContainsRect(safeArea, playerRect);
    });
    this.player.safe = isSafe;
  }
  shutdown() {}
  createMap() {
    const { map, jew_pastel_lineTiles, collision_layer, player } = createMap(
      this,
      {
        mapKey: "map5",
        nextSceneKey: "Level6Scene",
      }
    );
    map.createLayer("bg", jew_pastel_lineTiles);
    this.player = player;

    const duckSpawnPoints = map.filterObjects("Duck", ({ name }) => {
      return name.includes("Duck");
    });
    const safeAreaPoints = map.filterObjects("SafeArea", ({ name }) => {
      return name.includes("SafeArea");
    });

    return {
      map,
      collision_layer,
      player,
      duckSpawnPoints,
      safeAreaPoints,
    };
  }
}
