import GameStartSound from '@/assets/sound/game_start.mp3';
import GameFailedSound from '@/assets/sound/game_failed.mp3';
import GameWinSound from '@/assets/sound/game_win.mp3';
import EnemyHitSound from '@/assets/sound/enemy_hit.mp3';
import MyShipHitSound from '@/assets/sound/my_ship_hit.mp3';
import SetShipSound from '@/assets/sound/set_ship.mp3';
import GameProcessSound from '@/assets/sound/game_process.mp3';
import TorpedoFliesSound from '@/assets/sound/torpedo.mp3';

class SoundService {
    public static startSound = () => {
        const mySound = new Audio(GameStartSound);
        mySound.play();
    };

    public static failedSound = () => {
        const mySound = new Audio(GameFailedSound);
        mySound.play();
    };

    public static winSound = () => {
        const mySound = new Audio(GameWinSound);
        mySound.play();
    };

    public static setShip = () => {
        const mySound = new Audio(SetShipSound);
        mySound.play();
    };

    public static myShipHit = () => {
        const mySound = new Audio(MyShipHitSound);
        mySound.play();
    };

    public static enemyShipHit = () => {
        const mySound = new Audio(EnemyHitSound);
        mySound.play();
    };

    public static gameProcess = () => {
        const mySound = new Audio(GameProcessSound);
        mySound.play();
    };

    public static torpedoFlies = () => {
        const mySound = new Audio(TorpedoFliesSound);
        mySound.play();
    };
}

export default SoundService;
