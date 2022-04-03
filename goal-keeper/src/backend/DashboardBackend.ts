import Axios, {AxiosError, AxiosResponse} from 'axios';
import {from, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import authHeader from "@/backend/AuthHeader";
import PlayerDataDto from "@/data/dto/PlayerDataDto";
import TeamSummaryDataDto from "@/data/dto/TeamSummaryDataDto";

export default class DashboardBackend {

    private static DASHBOARD_ENDPOINT = process.env.VUE_APP_BASE_URL + '/api/dashboard';

    public static retrieveTeamOverviewData({api = Axios} = {}): Observable<PlayerDataDto[]> {
        return from(
            api.get(
                DashboardBackend.DASHBOARD_ENDPOINT + '/overview',
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
        ).pipe(
            map((response: AxiosResponse) => {
                    const responseData = response.data;
                    // return serializer.deserialize(responseData);
                    return response.data;
                },
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );
    }

    public static retrieveSummaryData({api = Axios} = {}): Observable<TeamSummaryDataDto> {
        return from(
            api.get(
                DashboardBackend.DASHBOARD_ENDPOINT + '/summary',
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
        ).pipe(
            map((response: AxiosResponse) => {
                    const responseData = response.data;
                    // return serializer.deserialize(responseData);
                    return response.data;
                },
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );
    };

}
