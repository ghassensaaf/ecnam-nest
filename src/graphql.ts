
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUserInput {
    username?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    password: string;
}

export class CreateUserInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    username?: Nullable<string>;
    address?: Nullable<string>;
    bank?: Nullable<string>;
    refCenter?: Nullable<string>;
    idNumber?: Nullable<string>;
    cnamCode?: Nullable<string>;
    prestCode?: Nullable<number>;
    taxId?: Nullable<string>;
    rib?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    permissions?: Nullable<Nullable<string>[]>;
    isActive?: Nullable<boolean>;
    passwordReset?: Nullable<string>;
    passwordResetExp?: Nullable<DateTime>;
    activationToken?: Nullable<string>;
    activationTokenExp?: Nullable<DateTime>;
}

export class UpdateUserInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IQuery {
    abstract refreshToken(): string | Promise<string>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract login(user: LoginUserInput): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract logout(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract signup(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class LoginResult {
    user: User;
    token: string;
}

export class User {
    id: string;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    username?: Nullable<string>;
    address?: Nullable<string>;
    bank?: Nullable<string>;
    refCenter?: Nullable<string>;
    idNumber?: Nullable<string>;
    cnamCode?: Nullable<string>;
    prestCode?: Nullable<number>;
    taxId?: Nullable<string>;
    rib?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    permissions?: Nullable<Nullable<string>[]>;
    isActive?: Nullable<boolean>;
    passwordReset?: Nullable<string>;
    passwordResetExp?: Nullable<DateTime>;
    activationToken?: Nullable<string>;
    activationTokenExp?: Nullable<DateTime>;
}

export type EmailAddress = any;
export type DateTime = any;
type Nullable<T> = T | null;
