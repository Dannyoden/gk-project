import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('SignupRequestDto')
export default class SignupRequestDto {

    @JsonProperty('username', String)
    public username: string | undefined = undefined;

    @JsonProperty('firstName', String)
    public firstName: string | undefined = undefined;

    @JsonProperty('lastName', String)
    public lastName: string | undefined = undefined;

    @JsonProperty('email', String)
    public email: string | undefined = undefined;

    @JsonProperty('password', String)
    public password: string | undefined = undefined;
}
