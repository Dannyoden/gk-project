import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export default class DateUtils {

    private static readonly DATE_FORMAT_OPTIONS: DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    private static readonly LOCALE_LOCATION = 'nl-nl';

    public static formatDateToString(date: Date): string {
        if (!date) {
            return '';
        }
        return Intl.DateTimeFormat(
            this.LOCALE_LOCATION,
            this.DATE_FORMAT_OPTIONS
        ).format(date);
    }
}