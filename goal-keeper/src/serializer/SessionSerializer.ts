import JsonSerializer, { jsonConvert } from './JsonSerializer';
import SessionDto from "@/data/dto/SessionDto";

export default class Session implements JsonSerializer<SessionDto> {

    serialize(input: SessionDto): string {
        return jsonConvert.serialize(input, SessionDto);
    }
    
    deserialize(input: any): SessionDto {
        return jsonConvert.deserializeObject(input, SessionDto);
    }
}
