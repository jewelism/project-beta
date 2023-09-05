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
    this.load.image("tiles", "assets/dungeon.png");
    this.load.tilemapTiledJSON("map", "assets/tiled/dungeon.json");
    this.load.spritesheet("player", "assets/dungeon.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 84,
      endFrame: 84,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { map, collision_layer, spawnPoint } = this.createMap();
    console.log("spawnPoint", spawnPoint.x, spawnPoint.y);

    this.player = new Player(this, {
      x: spawnPoint.x * 2,
      y: spawnPoint.y * 2,
    });
    this.cameras.main
      .setBounds(0, 0, map.heightInPixels * 2, map.widthInPixels * 2)
      .startFollow(this.player);

    // this.enemies = this.physics.add.group({
    //   immovable: true,
    // });
    // new Animal(this, { x: 200, y: 200, frameNo: 4, hp: 5 });
    // new Animal(this, { x: 300, y: 200, frameNo: 6, hp: 5 });
    // new Animal(this, { x: 400, y: 200, frameNo: 8, hp: 5 });
    // new Animal(this, { x: 500, y: 200, frameNo: 10, hp: 5 });
    // new Enemy(this, { hp: 5, spriteKey: "pixel_animals", frameNo: 12 });
    this.physics.add.collider(this.player, collision_layer, () => {
      console.log("collision_layer collide");
    });
    // this.physics.add.collider(this.player, this.enemies, () => {
    //   console.log("this.player collide");
    // });
    // this.physics.add.collider(this.enemies, this.enemies, () => {
    //   console.log("this.enemies collide");
    // });
    // new PixelAnimals(this, { x: 200, y: 100, frameNo: 3 });
    // new PixelAnimals(this, { x: 300, y: 100, frameNo: 5 });
    // new PixelAnimals(this, { x: 400, y: 100, frameNo: 7 });
    // new PixelAnimals(this, { x: 500, y: 100, frameNo: 9 });
    // 아래 생성 순서 중요
    // createUI.bind(this)();
    // createEnemy.bind(this)();
    // this.enemies.getChildren().forEach((enemy: Animal) => {
    //   enemy.setImmovable(true);
    // });
  }
  update() {
    // const enemyCount = this.enemies.getChildren().length;
    // if (enemyCount >= EnemyCounter.TOTAL) {
    //   console.log("game over");
    //   return;
    // }
    // this.enemyCounter.setValue(enemyCount);
  }
  shutdown() {}
  createMap() {
    const map = this.make.tilemap({
      key: "map",
    });
    const tiles = map.addTilesetImage("dungeon", "tiles");
    // const wallTiles = map.addTilesetImage("tileset_wall", "tileset_wall");
    const bg_layer = map.createLayer("dungeon", tiles);
    const collision_layer = map.createLayer("dungeon_collision", tiles);
    bg_layer.setScale(2);
    collision_layer.setScale(2);
    collision_layer.setCollisionByExclusion([-1]);
    // collision_layer.setCollisionByProperty({ collision: true });

    // wall_layer.setCollisionBetween(0, 10000);
    // wall_layer.forEachTile((tile) => {
    //   tile.setCollision(true, true, true, true);
    // });
    // wall_layer.setCollisionByProperty({ collision: true });
    // console.log(wall_layer);

    // const collisionTiles = map.findTile((tile) => {
    //   console.log(tile.properties);
    //   // return tile.properties?.find((p) => p.name === "collision");
    // });

    const spawnPoint = map.findObject("playerSpawn", ({ type }) => {
      return type === "playerSpawn";
    });

    return { map, collision_layer, spawnPoint };
  }
}
