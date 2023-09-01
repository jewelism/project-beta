import { GAME, getUIStyle } from "@/phaser/constants";
import { UpgradeLayer } from "@/phaser/layers/UpgradeLayer";
import { UpgradeButton } from "@/phaser/objects/UpgradeButton";
import { EnemyCounter } from "@/phaser/objects/counter/EnemyCounter";
import { MoneyCounter } from "@/phaser/objects/counter/MoneyCounter";
import { PhaseCounter } from "@/phaser/objects/counter/PhaseCounter";

const UI = {
  x: 150,
  yValue: -20,
  get y() {
    this.yValue += 30;
    return this.yValue;
  },
};
export function createUI() {
  const x = Number(this.game.config.width) - UI.x;
  this.phaseCounter = new PhaseCounter(this, x, UI.y).setScrollFactor(0);
  this.enemyCounter = new EnemyCounter(this, x, UI.y).setScrollFactor(0);
  this.moneyCounter = new MoneyCounter(this, x, UI.y).setScrollFactor(0);

  const upgradeButton = new UpgradeButton(this, {
    x,
    y: UI.y,
    template: "Up: ",
    onClick: () => {
      const upgradeLayer = new UpgradeLayer(this).setScrollFactor(0);
      this.add.existing(upgradeLayer);
    },
  }).setScrollFactor(0);
  this.add.existing(upgradeButton);
  const gameSpeedUpgradeButton = new UpgradeButton(this, {
    x,
    y: UI.y,
    template: "speed Up: ",
    onClick: () => {
      GAME.speed *= 2;
    },
  }).setScrollFactor(0);
  this.add.existing(gameSpeedUpgradeButton);

  this.add.existing(
    new Phaser.GameObjects.Text(
      this,
      x,
      UI.y,
      "",
      getUIStyle()
    ).setScrollFactor(0)
  );
  createUpgradeUI.bind(this)(x);
}
function createUpgradeUI(x) {
  this.add.existing(
    new Phaser.GameObjects.Text(
      this,
      x,
      UI.y,
      "Upgrade",
      getUIStyle()
    ).setScrollFactor(0)
  );
  [{ template: "☆↑: ", defender: this.player }].forEach(
    ({ template, defender }) => {
      const damageUpButton = new UpgradeButton(this, {
        x,
        y: UI.y,
        template,
        onClick: () => {
          const { upgradeCost } = defender;
          if (this.money < upgradeCost) {
            return;
          }
          this.money -= upgradeCost;
          this.moneyCounter.setValue(this.money);
          defender.damage += 1;
          damageUpButton.setValue(defender.damage, upgradeCost);
        },
      }).setScrollFactor(0);
    }
  );
}
