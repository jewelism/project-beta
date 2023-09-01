import { GAME } from "@/phaser/constants";
import { getPhaseData } from "@/phaser/constants/phase";
import { EnemyCounter } from "@/phaser/objects/counter/EnemyCounter";
import { Enemy } from "@/phaser/objects/Enemy";

export function createEnemy() {
  const phaseData = getPhaseData();
  let index = 0;
  let count = 0;
  let phasePauseTimer: Phaser.Time.TimerEvent;

  this.timer = this.time.addEvent({
    delay: 1000 / GAME.speed,
    callback: () => {
      if (count < EnemyCounter.TOTAL) {
        const { phase, hp, spriteKey, frameNo } = phaseData[index];
        this.phaseCounter.setValue(phase);
        new Enemy(this, { hp, spriteKey, frameNo });
        this.enemyCounter.setValue(this.enemies.getChildren().length);
        count++;
      } else {
        if (phasePauseTimer) {
          return;
        }
        phasePauseTimer = this.time.addEvent({
          delay: 1500 / GAME.speed,
          callback: () => {
            count = 0;
            index++;
            if (index >= phaseData.length) {
              this.timer.remove(false);
            }
            phasePauseTimer.remove(false);
            phasePauseTimer = null;
          },
        });
      }
    },
    loop: true,
    callbackScope: this,
  });
}
