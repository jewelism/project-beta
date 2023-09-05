import { Player } from "@/phaser/objects/Player";
import { Waterfall } from "@/phaser/objects/Waterfall";

export class PlayScene extends Phaser.Scene {
  player: Player;
  missiles: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  money: number = 0;
  phase: number = 1;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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
    this.load.spritesheet("waterfall_empty", "assets/dungeon.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 31,
      endFrame: 31,
    });
    this.load.spritesheet("waterfall_head", "assets/dungeon.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 20,
      endFrame: 20,
    });
    this.load.spritesheet("waterfall", "assets/dungeon.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 32,
      endFrame: 32,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { map, collision_layer, playerSpawnPoint } = this.createMap();

    this.player = new Player(this, {
      x: playerSpawnPoint.x,
      y: playerSpawnPoint.y,
    });

    // this.enemies = this.physics.add.group({
    //   immovable: true,
    // });
    // new Animal(this, { x: 200, y: 200, frameNo: 4, hp: 5 });
    // new Animal(this, { x: 300, y: 200, frameNo: 6, hp: 5 });
    // new Animal(this, { x: 400, y: 200, frameNo: 8, hp: 5 });
    // new Animal(this, { x: 500, y: 200, frameNo: 10, hp: 5 });
    // new Enemy(this, { hp: 5, spriteKey: "pixel_animals", frameNo: 12 });
    // this.physics.add.collider(this.player, waterfalls, () => {
    //   console.log("collision_layer collide");
    // });
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
    this.cameras.main
      .setBounds(0, 0, map.heightInPixels, map.widthInPixels)
      .startFollow(this.player)
      .setZoom(2);
  }
  update() {}
  shutdown() {}
  createMap() {
    const map = this.make.tilemap({
      key: "map",
    });
    const tiles = map.addTilesetImage("dungeon", "tiles");
    map.createLayer("dungeon", tiles);
    const collision_layer = map.createLayer("dungeon_collision", tiles);
    collision_layer.setCollisionByExclusion([-1]);

    const playerSpawnPoint = map.findObject("playerSpawn", ({ name }) => {
      return name === "playerSpawn1";
    });
    map
      .filterObjects("waterfall", (obj) => {
        return obj.type === "waterfall";
      })
      .forEach((waterfall) => {
        console.log("waterfall", waterfall.x, waterfall.y, waterfall.name);

        const waterfall1 = new Waterfall(this, {
          x: waterfall.x + waterfall.width / 2,
          y: waterfall.y - waterfall.height / 2,
        });
      });

    // console.log(
    //   "waterfall",
    //   waterfall1.x,
    //   waterfall1.y,
    //   waterfall1.name,
    //   waterfall2
    // );

    return { map, collision_layer, playerSpawnPoint };
  }
}
