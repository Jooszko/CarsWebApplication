export interface User {
    displayName: string;
    userName: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;  
}