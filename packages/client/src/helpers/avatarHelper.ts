import API from '@/api/api';
import defaultAvatar from '@/assets/images/user-sceleton.png';

export const calcAvatarUrl = (avatar: string | null) => {
    if (avatar) {
        return API.RESOURCES + avatar;
    }
    return defaultAvatar;
};
