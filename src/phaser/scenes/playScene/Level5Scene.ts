import { Exit } from "@/phaser/objects/Exit";
import { PixelAnimals } from "@/phaser/objects/PixelAnimals";
import { Player } from "@/phaser/objects/Player";

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
    this.load.tilemapTiledJSON("map5", "assets/tiled/5.json");
    this.load.image("Terrian", "assets/tiled/Tile1.0.1/Terrian.png");
    this.load.image("vegetation", "assets/tiled/Tile1.0.1/vegetation.png");
    this.load.spritesheet("player", "assets/Char2/Char2_idle_16px.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("exit", "assets/tiled/Tile1.0.1/Dungeon.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 86,
      endFrame: 86,
    });
    this.load.spritesheet("pixel_animals", "assets/pixel_animals.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const {
      map,
      collision_layer,
      playerSpawnPoint,
      exitPoint,
      duckSpawnPoints,
      safeAreaPoints,
    } = this.createMap();

    this.exit = new Exit(this, {
      x: exitPoint.x,
      y: exitPoint.y,
    });
    this.player = new Player(this, {
      x: playerSpawnPoint.x,
      y: playerSpawnPoint.y,
    });

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
    this.safeAreas = safeAreaPoints.map(({ x, y, width, height }) => {
      const safeArea = this.add
        .rectangle(x - 1, y - 1, width + 2, height + 2)
        .setOrigin(0, 0);
      safeArea.setFillStyle(0x00ff00, 0.5);

      return new Phaser.Geom.Rectangle(
        safeArea.x,
        safeArea.y,
        safeArea.width,
        safeArea.height
      );
    });

    this.physics.add.collider(this.ducks, collision_layer);
    this.physics.add.overlap(this.ducks, this.player, () => {
      if (this.player.safe) {
        return;
      }
      this.scene.restart();
    });

    this.physics.add.collider(this.player, collision_layer);
    this.physics.add.overlap(this.player, this.exit, () => {
      console.log("take to next level5");
      // this.scene.start("Level5Scene");
    });
    this.cameras.main
      .setBounds(0, 0, map.heightInPixels, map.widthInPixels)
      .startFollow(this.player)
      .setZoom(2);
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
    const map = this.make.tilemap({
      key: "map5",
    });
    const vegetationTiles = map.addTilesetImage("vegetation", "vegetation");
    const terrianTiles = map.addTilesetImage("Terrian", "Terrian");
    map.createLayer("bg", terrianTiles);

    const collision_layer = map.createLayer("bg_collision", [
      terrianTiles,
      vegetationTiles,
    ]);
    collision_layer.setCollisionByExclusion([-1]);

    const playerSpawnPoint = map.findObject("PlayerSpawn", ({ name }) => {
      return name === "PlayerSpawn1";
    });
    const exitPoint = map.findObject("Exit", ({ name }) => {
      return name === "Exit";
    });
    const duckSpawnPoints = map.filterObjects("Duck", ({ name }) => {
      return name.includes("Duck");
    });
    const safeAreaPoints = map.filterObjects("SafeArea", ({ name }) => {
      return name.includes("SafeArea");
    });

    return {
      map,
      collision_layer,
      playerSpawnPoint,
      exitPoint,
      duckSpawnPoints,
      safeAreaPoints,
    };
  }
}
