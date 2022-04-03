import Axios, {AxiosError, AxiosResponse} from 'axios';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import SessionDto from '@/data/dto/SessionDto';
import SessionSerializer from '@/serializer/SessionSerializer';
import authHeader from './AuthHeader';

export default class SessionBackend {

    private static SESSIONS_ENDPOINT = process.env.VUE_APP_BASE_URL + '/api/sessions';
    private static ID_PATH = '/id';

    public static retrieveSessions( { api = Axios } = {}): Observable<SessionDto[]> {
        const serializer = new SessionSerializer();

        return from(
            api.get(
                SessionBackend.SESSIONS_ENDPOINT,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
            ).pipe(
                map((response: AxiosResponse) => {
                    if(response.data === null) {
                        return [];
                    }
                    let sessions: SessionDto[] = [];
                    for(let data in response.data){
                        const session = serializer.deserialize(response.data[data]);
                        sessions.push(session);
                    }
                    return sessions;
                },
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );
    }

    public static retrieveSession(id: string, { api = Axios} = {}): Observable<SessionDto> {
        const URI = SessionBackend.SESSIONS_ENDPOINT + SessionBackend.ID_PATH + '/' + id;
        const URL = encodeURI(URI);

        const serializer = new SessionSerializer();
        return from(
            api.get(
                URL,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
            ).pipe(
                map((response: AxiosResponse) => {
                    return serializer.deserialize(response.data);
                },
                catchError((error: AxiosError) => {
                    throw error;
                })
            )
        )
    }

    public static createSession(newSession: SessionDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        return from(
            api.post(
                SessionBackend.SESSIONS_ENDPOINT,
                new SessionSerializer().serialize(newSession),
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: authHeader()
                    }
                })
            ).pipe(
                map((response: AxiosResponse) => {
                    return response;
                }, catchError((error: AxiosError) => {
                    throw error;
                })
            )
        );
    }

    public static updateSession(session: SessionDto, { api = Axios } = {} ): Observable<AxiosResponse> {
        const URI = SessionBackend.SESSIONS_ENDPOINT + SessionBackend.ID_PATH + '/' + session.id;
        const URL = encodeURI(URI);

        return from(
            api.put(
                URL,
                new SessionSerializer().serialize(session),
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
