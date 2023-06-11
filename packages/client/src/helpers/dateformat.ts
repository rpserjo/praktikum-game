export enum FormatType {
    DATE_TIME = '01 января 2023 01:01',
    DATE = '01 января 2023',
}

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

export function dateFormat(stringDate: string, format: FormatType): string | undefined {
    const date = new Date(stringDate);

    const dd = date.getDate();

    const monthName = monthNames[date.getMonth()];

    const yyyy = date.getFullYear();

    const hourStr = date.getHours().toString();
    const hh = hourStr.padStart(2, '0');

    const minuteStr = date.getMinutes().toString();
    const min = minuteStr.padStart(2, '0');

    if (format === FormatType.DATE_TIME) {
        return `${dd} ${monthName} ${yyyy} ${hh}:${min}`;
    }

    return `${dd} ${monthName} ${yyyy}`;
}
