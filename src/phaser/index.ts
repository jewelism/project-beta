import * as Phaser from "phaser";

import { StartScene } from "@/phaser/scenes/StartScene";
import { SelectLevelScene } from "@/phaser/scenes/SelectLevelScene";
import { Level1Scene } from "@/phaser/scenes/Level1Scene";
import { Level2Scene } from "@/phaser/scenes/Level2Scene";
import { Level3Scene } from "@/phaser/scenes/Level3Scene";
import { Level4Scene } from "@/phaser/scenes/Level4Scene";
import { Level5Scene } from "@/phaser/scenes/Level5Scene";

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
  scene: [
    StartScene,
    SelectLevelScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    Level4Scene,
    Level5Scene,
  ],
  // fps: {
  //   target: 10,
  //   forceSetTimeOut: true,
  // },
};

export const createPhaser = () => new Phaser.Game(config);
