export class CreateUserDto {
    name: string;
    email: string;
    role: "intern" | "admin";
}