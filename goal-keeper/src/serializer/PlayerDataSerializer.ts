import JsonSerializer, {jsonConvert} from './JsonSerializer';
import ClubTeamDto from '@/data/dto/ClubTeamDto';
import PlayerDataDto from "@/data/dto/PlayerDataDto";

export default class PlayerDataSerializer implements JsonSerializer<PlayerDataDto> {

    serialize(input: PlayerDataDto) {
        return jsonConvert.serialize(input, PlayerDataDto);
    }
    
    deserialize(input: any): PlayerDataDto {
        return jsonConvert.deserializeObject(input, PlayerDataDto);
    }
}
