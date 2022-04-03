import JsonSerializer, {jsonConvert} from './JsonSerializer';
import ClubTeamDto from '@/data/dto/ClubTeamDto';

export default class ClubTeamSerializer implements JsonSerializer<ClubTeamDto> {

    serialize(input: ClubTeamDto) {
        return jsonConvert.serialize(input, ClubTeamDto);
    }
    
    deserialize(input: any): ClubTeamDto {
        return jsonConvert.deserializeObject(input, ClubTeamDto);
    }
}
