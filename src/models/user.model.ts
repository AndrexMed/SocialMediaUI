export interface User {
    id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    DateOfBirth: string;
    Telephone: string;
    isActive: boolean;
}

export interface CreateUserAndSecurityDTO extends Omit<User, 'id'> { }