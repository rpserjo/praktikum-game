import GameStartSound from '@/assets/sound/game_start.mp3';
import GameLostSound from '@/assets/sound/game_failed.mp3';
import GameWinSound from '@/assets/sound/game_win.mp3';
import EnemyHitSound from '@/assets/sound/enemy_hit.mp3';
import MyShipHitSound from '@/assets/sound/my_ship_hit.mp3';
import SetShipSound from '@/assets/sound/set_ship.mp3';
import GameProcessSound from '@/assets/sound/game_process.mp3';
import TorpedoSound from '@/assets/sound/torpedo.mp3';

class SoundService {
    private startSound = new Audio(GameStartSound);

    private lostSound = new Audio(GameLostSound);

    private winnedSound = new Audio(GameWinSound);

    private setShipSound = new Audio(SetShipSound);

    private myShipHitSound = new Audio(MyShipHitSound);

    private enemyShipHitSound = new Audio(EnemyHitSound);

    private gameProcessSound = new Audio(GameProcessSound);

    private torpedoSound = new Audio(TorpedoSound);

    public playStartSound = () => {
        this.startSound.play();
    };

    public playLostSound = () => {
        this.lostSound.play();
    };

    public playWinnedSound = () => {
        this.winnedSound.play();
    };

    public playSetShipSound = () => {
        this.setShipSound.play();
    };

    public playMyShipHitSound = () => {
        this.myShipHitSound.play();
    };

    public playEnemyShipHitSound = () => {
        this.enemyShipHitSound.play();
    };

    public playGameProcessSound = () => {
        this.gameProcessSound.play();
    };

    public playTorpedoSound = () => {
        this.torpedoSound.play();
    };
}

export default SoundService;
