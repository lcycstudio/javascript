## Section 03: Authentication Module

#### Table of Contents

- Creating migrations
- Preparing register request
- What is DTO?
- Creating user entity
- Generating jwt token
- Validation pipes
- Login request
- Auth middleware
- User decorator
- Auth guard
- Updating current user

### Creating migrations

```ts
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '123',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
```

Database Drop/Create/Migrate

```json
{
  "scripts": {
    // ...
    "db:drop": "yarn typeorm schema:drop",
    "db:create": "yarn typeorm migration:generate -- -n",
    "db:migrate": "yarn typeorm migration:run"
  }
}
```

```bash
yarn db:drop
yarn db:create src/migrations/CreateTags
```

### Preparing register request

[User Registration](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#registration)

`user.controller.ts`

```ts
import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(): Promise<any> {
    return this.userService.createUser();
  }
}
```

`user.module.ts`

```ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

`user.service.ts`

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser() {
    return 'createUser';
  }
}
```

### What is DTO?

https://docs.nestjs.com/controllers

A DTO is an object that defines how the data will be sent over the network. We
could determine the DTO schema by using TypeScript interfaces, or by simple
classes. Interestingly, we recommend using classes here. Why? Classes are part
of the JavaScript ES6 standard, and therefore they are preserved as real
entities in the compiled JavaScript. On the other hand, since TypeScript
interfaces are removed during the transpilation, Nest can't refer to them at
runtime. This is important because features such as Pipes enable additional
possibilities when they have access to the metatype of the variable at runtime.

`createUser.dto.ts`

```ts
export class CreateUserDto {
  readonly username: string;

  readonly email: string;

  readonly password: string;
}
```

`user.controller.ts`

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
}
```

`user.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  async createUser(createDto: CreateUserDto) {
    return createDto;
  }
}
```

### Creating user entity

#### Single User

```json
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```

#### Registration:

`POST /api/users`

Example request body:

```json
{
  "user": {
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a `User`

Required fields: `email`, `username`, `password`

`user.entity.ts`

```ts
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
```

`user.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    return await this.userRepository.save(newUser);
  }
}
```

`user.module.ts`

```ts
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
```

### Generating jwt token

`user.service.ts`

```ts
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  // ...
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
```

`user.controller.ts`

```ts
import { UserResponseInterface } from './types/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    // UserResponseInterface implemented below
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
```

`user.entity.ts`

```ts
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
```

```bash
yarn db:create src/migrations/AddUsernameToUsers
yarn db:migrate
yarn db:drop
yarn db:migrate
```

`types/user.types.ts`

```ts
import { UserEntity } from '../user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
```

`types/userResponse.interface.ts`

```ts
import { UserType } from './user.types';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
```

### Validation pipes

A pipe is a class annotated with the `@Injectable()` decorator, which implements
the **PipeTransform** interface.

Pipes have two typical use cases:

- transformation: transform input data to the desired form (e.g., from string to
  integer)
- validation: evaluate input data and if valid, simply pass it through
  unchanged; otherwise, throw an exception

In both cases, pipes operate on the arguments being processed by a controller
route handler. Nest interposes a pipe just before a method is invoked, and the
pipe receives the arguments destined for the method and operates on them. Any
transformation or validation operation takes place at that time, after which the
route handler is invoked with any (potentially) transformed arguments.

Install `class-validator` and `class-transformer` packages

```bash
yarn add class-validator
yarn add class-transformer
```

`user.controller.ts`

```ts
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
```

`dt/createUser.dto`

```ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
```

Postman send a POST method to `http://localhost:3000/users` with

```json
{
  "user": {}
}
```

The API response is below

```json
{
  "statusCode": 400,
  "message": [
    "username should not be empty",
    "email must be an email",
    "email should not be empty",
    "password should not be empty"
  ],
  "error": "Bad Request"
}
```

Check user exists `user.service.ts`

```ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }
}
```

### Login request

#### Authentication:

`POST /api/users/login`

Example request body:

```json
{
  "user": {
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a `User`

Required fields: `email`, `password`

`user.controller.ts`

```ts
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    console.log('loginDto', loginDto);
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }
}
```

`dto/loginUser.dto.ts`

```ts
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
```

`user.service.ts`

```ts
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['id', 'username', 'email', 'bio', 'image', 'password'] }
    );
    /* In lastest Typeorm we pack condition in "where" key
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password']
    }); */
    if (!user) {
      throw new HttpException(
        "The user with this email doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    delete user.password; // delete the password key-value from the response
    return user;
  }
}
```

### Auth middleware

#### Get Current User

`GET /api/user`

Authentication required, returns a `User` that's the current user

`/middlewares/auth.middleware.ts`

```ts
import { JWT_SECRET } from '@app/config';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.findById({
        where: { id: decode.id },
      });
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
```

`expressRequest.interface.ts`

```ts
import { UserEntity } from '@app/user/user.entity';
import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}
```

`app.module.ts`

```ts
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
```

`user.controller.ts`

```ts
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //...
  @Get('user')
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
```

### User decorator

`decorators/user.decorator.ts`

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
```

### Auth guard

`guards/auth.guard.ts`

```ts
import { ExpressRequest } from '@app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (request.user) {
      return true;
    }

    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
```

`user.module.ts`

```ts
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
```

`user.controller.ts`

```ts
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //...
  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
```

### Updating current user

#### Update User

`PUT /api/user`

Example request body:

```json
{
  "user": {
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Authentication required, returns the `User`

Accepted fields: `email`, `username`, `password`, `image`, `bio`

`user.controller.ts`

```ts
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //...
  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto
    );
    return this.userService.buildUserResponse(user);
  }
}
```

```ts
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // ...
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
}
```
