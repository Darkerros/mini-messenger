

export interface CreateUserDto {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
}