import Axios, {AxiosError, AxiosResponse} from 'axios';
import {from, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import ClubTeamSerializer from '@/serializer/ClubTeamSerializer';
import ClubTeamDto from "@/data/dto/ClubTeamDto";
import authHeader from "@/backend/AuthHeader";

export default class ClubTeamBackend {
    private static CLUB_TEAM_ENDPOINT =  process.env.VUE_APP_BASE_URL + '/api/team';

    public static retrieveTeam({ api = Axios } = {} ): Observable<ClubTeamDto> {
        const serializer = new ClubTeamSerializer();
        return from(
            api.get(
                ClubTeamBackend.CLUB_TEAM_ENDPOINT,
                {
                    headers: {  Accept: 'application/json',
                                Authorization: authHeader() }
                })
            ).pipe(
                map((response: AxiosResponse) => {
                    const responseData = response.data;
                    return serializer.deserialize(responseData);
                },
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );
    }

    public static updateClubTeam(clubTeam: ClubTeamDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        const URI = ClubTeamBackend.CLUB_TEAM_ENDPOINT;
        return from(
            api.put(
                URI,
                clubTeam,
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

    public static createClubTeam(clubTeam: ClubTeamDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        const URI = ClubTeamBackend.CLUB_TEAM_ENDPOINT;
        return from(
            api.post(
                URI,
                clubTeam,
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
