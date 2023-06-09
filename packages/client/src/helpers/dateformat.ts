export enum FormatType {
    DATE_TIME = '01 января 2023 01:01',
    DATE = '01 января 2023',
}

export function dateFormat(stringDate: string, format: FormatType): string | undefined {
    const date = new Date(stringDate);

    const dd = date.getDate();

    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const monthName = monthNames[date.getMonth()];

    const yyyy = date.getFullYear();

    let hh: string;

    date.getHours() < 10
        ? (hh = `0${date.getHours().toString()}`)
        : (hh = date.getHours().toString());

    let min: string;
    date.getMinutes() < 10
        ? (min = `0${date.getMinutes().toString()}`)
        : (min = date.getMinutes().toString());

    if (format === FormatType.DATE_TIME) {
        return `${dd} ${monthName} ${yyyy} ${hh}:${min}`;
    }

    if (format === FormatType.DATE) {
        return `${dd} ${monthName} ${yyyy}`;
    }

    return undefined;
}
