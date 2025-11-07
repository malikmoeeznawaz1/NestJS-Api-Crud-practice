import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.to';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'intern'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'intern'
        },
        {
            id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'intern'
        },
        {
            id: '4',
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            role: 'intern'
        }
    ]

    findAll(role?: "intern" | "admin") {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user=> Number(user.id) === id);
        if(!user)
            throw new NotFoundException(`User ${id} not exist`);
        return user;
    }

    create(user: CreateUserDto) {
        const highestId = Math.max(...this.users.map(u => parseInt(u.id)), 0);
        const newUser = {
            id: (highestId + 1).toString(),
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: UpdateUserDto){
        const userIndex = this.users.findIndex(user => Number(user.id) === id);
        if(userIndex === -1){
            return null;
        }
        this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
        return this.users[userIndex];
    }

    delete(id:number){
        const userIndex = this.users.findIndex(user => Number(user.id) === id);
        if(userIndex === -1){
            return null;
        }
        const deletedUser = this.users.splice(userIndex, 1);
        return deletedUser[0];  
    }
}
