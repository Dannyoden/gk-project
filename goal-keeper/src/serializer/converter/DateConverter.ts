import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export default class DateConverter implements JsonCustomConvert<Date | undefined> {

    public serialize(date: Date): any {
        return date.toISOString();
    }

    public deserialize(dateString: any): Date | undefined {
        if (dateString === null) {
            return undefined;
        }
        return new Date(dateString);
    }

}
