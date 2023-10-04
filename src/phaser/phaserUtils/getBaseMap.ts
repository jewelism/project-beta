import { Exit } from "@/phaser/objects/Exit";
import { Player } from "@/phaser/objects/Player";

export function createMap(
  scene: Phaser.Scene,
  { mapKey, nextSceneKey }: { mapKey: string; nextSceneKey: string }
) {
  const map = scene.make.tilemap({
    key: mapKey,
  });
  const jew_pastel_lineTiles = map.addTilesetImage(
    "jew_pastel_line",
    "jew_pastel_line"
  );
  const collision_layer = map.createLayer("bg_collision", [
    jew_pastel_lineTiles,
  ]);
  collision_layer.setCollisionByExclusion([-1]);

  const playerSpawnPoint = map.findObject("PlayerSpawn", ({ name }) => {
    return name === "PlayerSpawn";
  });
  const exitPoint = map.findObject("Exit", ({ name }) => {
    return name === "Exit";
  });

  const exit = new Exit(scene, {
    x: exitPoint.x,
    y: exitPoint.y,
  });
  const player = new Player(scene, {
    x: playerSpawnPoint.x,
    y: playerSpawnPoint.y,
  });

  scene.physics.add.collider(player, collision_layer);
  scene.physics.add.overlap(player, exit, () => {
    scene.scene.start(nextSceneKey);
  });
  scene.cameras.main
    .setBounds(0, 0, map.heightInPixels, map.widthInPixels)
    .startFollow(player)
    .setZoom(2);

  return { map, jew_pastel_lineTiles, collision_layer, player };
}

export function preloadBaseAssets(
  scene: Phaser.Scene,
  { mapName, path }: { mapName: string; path: string }
) {
  scene.load.tilemapTiledJSON(mapName, path);
  scene.load.image("jew_pastel_line", "assets/jew_pastel_line.png");
  scene.load.spritesheet("exit", "assets/jew_pastel_line.png", {
    frameWidth: 16,
    frameHeight: 16,
    startFrame: 51,
    endFrame: 51,
  });
  scene.load.spritesheet("player", "assets/Char2/Char2_idle_16px.png", {
    frameWidth: 16,
    frameHeight: 16,
  });
}
