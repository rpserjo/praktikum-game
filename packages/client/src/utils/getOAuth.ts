import { MouseEventHandler, MouseEvent } from 'react';
import { oauthProviderUri } from '@/api/api';
import OAuthApi from '@/api/OAuthApi';

export const getOAuth: MouseEventHandler<HTMLButtonElement> = async (
    e: MouseEvent<HTMLButtonElement>
) => {
    e.preventDefault();
    const redirectUri = `${window.location.origin}/oauth`;
    const oAuthApi = new OAuthApi();
    const { serviceId, error } = await oAuthApi.getServiceId(`${redirectUri}`);

    if (!error) {
        window.location.href = `${oauthProviderUri}&client_id=${serviceId}&redirect_uri=${redirectUri}`;
    }
};
