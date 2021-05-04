export class CreateUserDto {
    phoneNumber: string;
    password: string;
    first_name: string;
    last_name: string;
    role ? : number;
}