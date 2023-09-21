import { Exit } from "@/phaser/objects/Exit";
import { Player } from "@/phaser/objects/Player";

export class PlayScene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  exit: Exit;

  constructor() {
    super("PlayScene");
  }
  preload() {
    this.load.tilemapTiledJSON("map1", "assets/tiled/1.json");
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
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const { map, collision_layer, playerSpawnPoint, exitPoint } =
      this.createMap();

    this.exit = new Exit(this, {
      x: exitPoint.x,
      y: exitPoint.y,
    });
    this.player = new Player(this, {
      x: playerSpawnPoint.x,
      y: playerSpawnPoint.y,
    });

    this.physics.add.collider(this.player, collision_layer);
    this.physics.add.overlap(this.player, this.exit, () => {
      console.log("take to next level2");
      // this.scene.remove("PlayScene");
      this.scene.start("Level2Scene");
    });
    this.cameras.main
      .setBounds(0, 0, map.heightInPixels, map.widthInPixels)
      .startFollow(this.player)
      .setZoom(2);
  }
  update() {}
  shutdown() {}
  createMap() {
    const map = this.make.tilemap({
      key: "map1",
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

    return { map, collision_layer, playerSpawnPoint, exitPoint };
  }
}
