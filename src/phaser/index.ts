import * as Phaser from "phaser";
import { PlayScene } from "@/phaser/scenes/playScene/PlayScene";

const config: Phaser.Types.Core.GameConfig = {
  title: "project alpha",
  url: "jewelism.github.io",
  type: Phaser.WEBGL,
  // type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  // parent: "body",
  render: { pixelArt: true, antialias: false },
  scene: [PlayScene],
  // fps: {
  //   target: 5,
  //   forceSetTimeOut: true,
  // },
};

export const createPhaser = () => new Phaser.Game(config);
