import Axios, {AxiosError, AxiosResponse} from 'axios';
import {from, Observable } from 'rxjs';
import authHeader from "@/backend/AuthHeader";
import PlayerDto from "@/data/dto/PlayerDto";
import ClubTeamDto from "@/data/dto/ClubTeamDto";

export default class PlayerBackend {
    private static PLAYER_ENDPOINT =  process.env.VUE_APP_BASE_URL + '/api/player';

    public static deletePlayer(player: PlayerDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        const URI = PlayerBackend.PLAYER_ENDPOINT;
        return from(
            api.delete(
                URI,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    },
                    data: player
                })
                .catch((error: AxiosError) => {
                        throw error;
                    }
                )
        );
    }

    public static upsertPlayer(player: PlayerDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        const URI = PlayerBackend.PLAYER_ENDPOINT;
        return from(
            api.post(
                URI,
                player,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
                .catch((error: AxiosError) => {
                        throw error;
                    }
                )
        );
    }
}
