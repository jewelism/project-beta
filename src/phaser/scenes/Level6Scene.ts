import { Exit } from "@/phaser/objects/Exit";
import { PixelAnimals } from "@/phaser/objects/PixelAnimals";
import { Player } from "@/phaser/objects/Player";
import { Star } from "@/phaser/objects/Star";
import { StarCounter } from "@/phaser/objects/counter/StarCounter";
import {
  createMap1to6,
  preloadBaseAssets,
} from "@/phaser/phaserUtils/getBaseMap";
import { makeSafeArea } from "@/phaser/phaserUtils/safeArea";

export class Level6Scene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;
  ducks: Phaser.GameObjects.Group;
  safeAreas: Phaser.Geom.Rectangle[];
  stars: Phaser.GameObjects.Group;
  starCounter: StarCounter;

  constructor() {
    super("Level6Scene");
  }
  preload() {
    preloadBaseAssets(this, {
      mapName: "map6",
      path: "assets/tiled/pastel6.json",
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const {
      collision_layer,
      duckSpawnPoints,
      starSpawnPoints,
      safeAreaPoints,
    } = this.createMap();

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
    this.stars = this.add.group();
    starSpawnPoints.forEach(({ x, y }) => {
      const star = new Star(this, { x, y });
      this.stars.add(star);
    });

    this.starCounter = new StarCounter(
      this,
      Number(this.game.config.width) - 600,
      30,
      starSpawnPoints.length
    );

    this.safeAreas = makeSafeArea(this, safeAreaPoints);

    this.physics.add.collider(this.ducks, collision_layer);
    this.physics.add.overlap(this.ducks, this.player, () => {
      if (this.player.safe) {
        return;
      }
      this.scene.restart();
    });
    this.physics.add.overlap(this.stars, this.player, (star) => {
      this.starCounter.decrease();
      star.destroy();
      if (this.starCounter.value <= 0) {
        this.exit.open();
      }
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
    const { map, jew_pastel_lineTiles, collision_layer, player, exit } =
      createMap1to6(this, {
        mapKey: "map6",
        nextSceneKey: "Level7Scene",
      });
    map.createLayer("bg", jew_pastel_lineTiles);
    this.player = player;
    this.exit = exit;
    exit.block();

    const duckSpawnPoints = map.filterObjects("Duck", ({ name }) => {
      return name.includes("Duck");
    });
    const starSpawnPoints = map.filterObjects("Star", ({ name }) => {
      return name.includes("Star");
    });
    const safeAreaPoints = map.filterObjects("SafeArea", ({ name }) => {
      return name.includes("SafeArea");
    });

    return {
      map,
      collision_layer,
      player,
      duckSpawnPoints,
      starSpawnPoints,
      safeAreaPoints,
    };
  }
}
