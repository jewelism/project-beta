import { EnemyCounter } from "@/phaser/objects/counter/EnemyCounter";
import { MoneyCounter } from "@/phaser/objects/counter/MoneyCounter";
import { createUI } from "@/phaser/scenes/playScene/createUI";
import { PhaseCounter } from "@/phaser/objects/counter/PhaseCounter";
import { Player } from "@/phaser/objects/Player";
import { createEnemy } from "@/phaser/scenes/playScene/createEnemy";

export class PlayScene extends Phaser.Scene {
  player: Player;
  missiles: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  enemyCounter: EnemyCounter;
  moneyCounter: MoneyCounter;
  phaseCounter: PhaseCounter;
  money: number = 0;
  phase: number = 1;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  debugGraphics: Phaser.GameObjects.Graphics;

  constructor() {
    super("PlayScene");
  }
  preload() {
    // this.load.tilemapTiledJSON("map", "tiled/tiny.json");
    this.load.image(
      "tiles",
      "assets/tiled/TinyRanch_Assets/TinyFarm_Tiles.png"
    );
    this.load.image(
      "tileset_wall",
      "assets/tiled/TinyRanch_Assets/tileset_wall.png"
    );
    this.load.tilemapTiledJSON("map", "assets/tiled/tiny.json");
    this.load.spritesheet(
      "player",
      "assets/tiled/TinyRanch_Assets/TinyFarm_Characters.png",
      {
        frameWidth: 8,
        frameHeight: 8,
      }
    );
    this.load.spritesheet(
      "pixel_animals",
      "assets/tiled/TinyRanch_Assets/pixel_animals.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.spritesheet(
      "explosion",
      "assets/tiled/TinyRanch_Assets/explosion.png",
      {
        frameWidth: 425 / 5,
        frameHeight: 170 / 2,
        startFrame: 1,
        endFrame: 6,
      }
    );
    this.load.spritesheet("bomb", "assets/tiled/TinyRanch_Assets/bomb.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { map, spawnPoint } = this.createMap();
    console.log("spawnPoint", spawnPoint.x, spawnPoint.y);

    this.player = new Player(this, { x: spawnPoint.x, y: spawnPoint.y });
    this.cameras.main
      .setBounds(0, 0, map.heightInPixels, map.widthInPixels)
      .startFollow(this.player);

    this.enemies = this.physics.add.group({
      immovable: true,
    });
    // new Animal(this, { x: 200, y: 200, frameNo: 4, hp: 5 });
    // new Animal(this, { x: 300, y: 200, frameNo: 6, hp: 5 });
    // new Animal(this, { x: 400, y: 200, frameNo: 8, hp: 5 });
    // new Animal(this, { x: 500, y: 200, frameNo: 10, hp: 5 });
    // new Enemy(this, { hp: 5, spriteKey: "pixel_animals", frameNo: 12 });
    // this.physics.add.collider(this.player, wall_layer, () => {
    //   console.log("wall_layer collide");
    // });
    this.physics.add.collider(this.player, this.enemies, () => {
      console.log("this.player collide");
    });
    this.physics.add.collider(this.enemies, this.enemies, () => {
      console.log("this.enemies collide");
    });
    // new PixelAnimals(this, { x: 200, y: 100, frameNo: 3 });
    // new PixelAnimals(this, { x: 300, y: 100, frameNo: 5 });
    // new PixelAnimals(this, { x: 400, y: 100, frameNo: 7 });
    // new PixelAnimals(this, { x: 500, y: 100, frameNo: 9 });
    // 아래 생성 순서 중요
    createUI.bind(this)();
    createEnemy.bind(this)();
    // this.enemies.getChildren().forEach((enemy: Animal) => {
    //   enemy.setImmovable(true);
    // });
  }
  update() {
    const enemyCount = this.enemies.getChildren().length;
    // if (enemyCount >= EnemyCounter.TOTAL) {
    //   console.log("game over");
    //   return;
    // }
    this.enemyCounter.setValue(enemyCount);
  }
  shutdown() {}
  createMap() {
    const map = this.make.tilemap({
      key: "map",
    });
    const tiles = map.addTilesetImage("TinyFarm_Tiles", "tiles");
    // const wallTiles = map.addTilesetImage("tileset_wall", "tileset_wall");
    const bg_layer = map.createLayer("bg", tiles);
    const wall_layer = map.createLayer("wall", tiles);
    bg_layer.setScale(3);
    wall_layer.setScale(3);

    // wall_layer.setCollisionBetween(0, 10000);
    // wall_layer.forEachTile((tile) => {
    //   tile.setCollision(true, true, true, true);
    // });
    wall_layer.setCollisionByProperty({ collision: true });
    // console.log(wall_layer);

    // const collisionTiles = map.findTile((tile) => {
    //   console.log(tile.properties);
    //   // return tile.properties?.find((p) => p.name === "collision");
    // });

    const spawnPoint = map.findObject("player_spawn", (obj) => {
      return (obj as any)?.properties?.every((p) => p.value);
    });

    return { map, wall_layer, spawnPoint };
  }
}
