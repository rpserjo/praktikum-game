import BaseApi from './BaseApi';
import API from '@/api/api';
import { TThemeData } from '@/models/models';

type TThemeRequestData = {
    theme: TThemeData | null;
    error: Error | null;
};

type TChangeThemeRequestData = {
    themeName: string;
    userId: number;
};

class ThemeApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.THEME.ENDPOINT, 'appHost');
    }

    public async getCurrentUserTheme(): Promise<TThemeRequestData> {
        try {
            const result = await this.http.get('');

            const { data } = result;

            return { theme: data, error: null };
        } catch (error: unknown) {
            console.debug(error);
            return { theme: null, error: error as Error };
        }
    }

    public async changeUserTheme(requestData: TChangeThemeRequestData): Promise<TThemeRequestData> {
        try {
            const result = await this.http.post('', {
                ...requestData,
            });

            const { data } = result;

            return { theme: data, error: null };
        } catch (error: unknown) {
            console.debug(error);
            return { theme: null, error: error as Error };
        }
    }
}

export default ThemeApi;
