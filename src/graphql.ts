
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
    firstname?: Nullable<NonEmptyString>;
    lastname?: Nullable<NonEmptyString>;
    username?: Nullable<NonEmptyString>;
    address?: Nullable<NonEmptyString>;
    bank?: Nullable<NonEmptyString>;
    refCenter?: Nullable<NonEmptyString>;
    idNumber?: Nullable<NonEmptyString>;
    cnamCode?: Nullable<NonEmptyString>;
    prestCode?: Nullable<number>;
    taxId?: Nullable<NonEmptyString>;
    rib?: Nullable<NonEmptyString>;
    phone?: Nullable<PhoneNumber>;
    email?: Nullable<EmailAddress>;
    password?: Nullable<NonEmptyString>;
    permissions?: Nullable<Nullable<NonEmptyString>[]>;
    isActive?: Nullable<boolean>;
    passwordReset?: Nullable<NonEmptyString>;
    passwordResetExp?: Nullable<DateTime>;
    activationToken?: Nullable<NonEmptyString>;
    activationTokenExp?: Nullable<DateTime>;
}

export class UpdateUserInput {
    firstname?: Nullable<NonEmptyString>;
    lastname?: Nullable<NonEmptyString>;
    email?: Nullable<EmailAddress>;
}

export class UpdatePasswordInput {
    oldPassword: NonEmptyString;
    password: NonEmptyString;
}

export abstract class IQuery {
    abstract refreshToken(): string | Promise<string>;

    abstract findByUsername(username: NonEmptyString): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract login(user: LoginUserInput): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract logout(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract signup(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: NonEmptyString, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract activateUserAccount(activationToken: NonEmptyString): User | Promise<User>;

    abstract forgotPassword(email: EmailAddress): User | Promise<User>;

    abstract resetPassword(token: NonEmptyString, password: NonEmptyString): User | Promise<User>;

    abstract updatePassword(updatePasswordInput?: Nullable<UpdatePasswordInput>): NonEmptyString | Promise<NonEmptyString>;
}

export class LoginResult {
    user: User;
    token: string;
}

export class User {
    id: string;
    firstname?: Nullable<NonEmptyString>;
    lastname?: Nullable<NonEmptyString>;
    username?: Nullable<NonEmptyString>;
    address?: Nullable<NonEmptyString>;
    bank?: Nullable<NonEmptyString>;
    refCenter?: Nullable<NonEmptyString>;
    idNumber?: Nullable<NonEmptyString>;
    cnamCode?: Nullable<NonEmptyString>;
    prestCode?: Nullable<number>;
    taxId?: Nullable<NonEmptyString>;
    rib?: Nullable<NonEmptyString>;
    phone?: Nullable<PhoneNumber>;
    email?: Nullable<EmailAddress>;
    password?: Nullable<NonEmptyString>;
    permissions?: Nullable<Nullable<NonEmptyString>[]>;
    isActive?: Nullable<boolean>;
    passwordReset?: Nullable<NonEmptyString>;
    passwordResetExp?: Nullable<DateTime>;
    activationToken?: Nullable<NonEmptyString>;
    activationTokenExp?: Nullable<DateTime>;
}

export type EmailAddress = any;
export type DateTime = any;
export type PhoneNumber = any;
export type NonEmptyString = any;
type Nullable<T> = T | null;
