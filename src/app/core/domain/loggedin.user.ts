export class LoggedInUser {
    private _id: string;
    private _access_token: string;
    private _username: string;
    private _fullName: string;
    private _email: string;
    private _avatar: string;
    private _roles: any;
    private _permissions: any;


    constructor(access_token: string, username: string, fullName: string, email: string, avatar: string, roles?: any, permissions?: any) {
        this._access_token = access_token;
        this._username = username;
        this._fullName = fullName;
        this._email = email;
        this._avatar = avatar;
        this._roles = roles;
        this._permissions = permissions;
    }


    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get access_token(): string {
        return this._access_token;
    }

    public set access_token(value: string) {
        this._access_token = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get fullName(): string {
        return this._fullName;
    }

    public set fullName(value: string) {
        this._fullName = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get avatar(): string {
        return this._avatar;
    }

    public set avatar(value: string) {
        this._avatar = value;
    }


    get roles(): any {
        return this._roles;
    }

    set roles(value: any) {
        this._roles = value;
    }

    get permissions(): any {
        return this._permissions;
    }

    set permissions(value: any) {
        this._permissions = value;
    }
}
