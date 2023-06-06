export interface User {
    id: string,
    apiToken: string
    phone: string
}

export interface UserSchema {
    authData?: User
}
