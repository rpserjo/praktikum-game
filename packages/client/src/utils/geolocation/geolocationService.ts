type GeoObject = {
    GeoObject: {
        description: string;
        name: string;
    };
};

type DataInfo = {
    featureMember: GeoObject[];
    metaDataProperty: unknown;
};

class GeolocationService {
    private checkCompatibility = () => {
        if ('geolocation' in navigator) {
            this.getCoordinates(this.getAddress);
        } else {
            console.log('Geolocation API not supported :(');
        }
    };

    private getCoordinates = (callback: (lat: number, long: number) => void) => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            callback(latitude, longitude);
        });
    };

    private getAddress = async (lat: number, long: number) => {
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=478d5bac-859d-4198-bef4-8584f0a09fea&geocode=
            ${long},${lat}&kind=house&format=json`
        );
        const addressData = await response.json();
        this.showAddress(addressData.response.GeoObjectCollection as DataInfo);
    };

    private showAddress = (data: DataInfo) => {
        if (data && data.featureMember.length > 0) {
            const address = data.featureMember[0].GeoObject.name;
            alert('Ваш адрес : ' + address);
        } else {
            console.log('Andress data is incorrect');
        }
    };

    public showAddressInfo = () => {
        this.checkCompatibility();
    };
}

export default new GeolocationService();
