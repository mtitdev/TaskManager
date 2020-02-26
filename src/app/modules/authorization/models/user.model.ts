export interface User {
    login: string;
    password: string;
    id?: string;
}

export type Users = Array<User>;