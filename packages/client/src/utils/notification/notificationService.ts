import Logo from '@/assets/logo.svg';

export class NotificationService {
    private static notify = (title: string, body: string) => {
        /* eslint-disable no-new */
        new Notification(title, { body, icon: Logo });
    };

    public static gameStart = () => {
        NotificationService.notify('Начинаем', 'Приготовьтесь к увлекательной игре');
    };

    public static shipHit = () => {
        NotificationService.notify('Ваш корабль ранен', 'Соберите все силы, чтобы отыграться');
    };

    public static gameLost = () => {
        NotificationService.notify('Вы проиграли', 'Повезет в другой раз');
    };

    public static gameWinned = () => {
        NotificationService.notify('Вы выиграли', 'Ура, поздравляем!!!');
    };

    public static promptNotification = () => {
        Notification.requestPermission();
    };
}
