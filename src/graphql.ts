
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Quality {
    HIMSELF = "HIMSELF",
    SPOUSE = "SPOUSE",
    SON = "SON",
    MOTHER = "MOTHER",
    FATHER = "FATHER"
}

export class LoginUserInput {
    username?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    password: string;
}

export class CreateInsuredInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    insuredNumber?: Nullable<string>;
}

export class UpdateInsuredInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    insuredNumber?: Nullable<string>;
}

export class CreatePatientInput {
    firstname: string;
    lastname: string;
    assured?: Nullable<boolean>;
    quality?: Nullable<Quality>;
    insuredId?: Nullable<string>;
}

export class UpdatePatientInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    assured?: Nullable<boolean>;
    quality?: Nullable<Quality>;
    insuredId?: Nullable<string>;
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
    phone?: Nullable<NonEmptyString>;
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

    abstract patient(id?: Nullable<string>): Nullable<Patient> | Promise<Nullable<Patient>>;

    abstract userPatients(): Nullable<Nullable<Patient>[]> | Promise<Nullable<Nullable<Patient>[]>>;

    abstract findByUsername(username: NonEmptyString): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract login(user: LoginUserInput): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract logout(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createInsured(createInsuredInput?: Nullable<CreateInsuredInput>): Insured | Promise<Insured>;

    abstract updateInsured(id?: Nullable<string>, updateInsuredInput?: Nullable<UpdateInsuredInput>): Insured | Promise<Insured>;

    abstract removeInsured(id?: Nullable<string>): Nullable<Insured> | Promise<Nullable<Insured>>;

    abstract createPatient(createPatientInput?: Nullable<CreatePatientInput>): Patient | Promise<Patient>;

    abstract updatePatient(id?: Nullable<string>, updatePatientInput?: Nullable<UpdatePatientInput>): Patient | Promise<Patient>;

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

export class Insured {
    id: string;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    insuredNumber?: Nullable<string>;
    patients?: Nullable<Nullable<Patient>[]>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
}

export class Patient {
    id: string;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    assured?: Nullable<boolean>;
    quality?: Nullable<Quality>;
    userId?: Nullable<string>;
    insuredId?: Nullable<string>;
    insured?: Nullable<Insured>;
    user?: Nullable<User>;
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
    phone?: Nullable<NonEmptyString>;
    email?: Nullable<EmailAddress>;
    password?: Nullable<NonEmptyString>;
    permissions?: Nullable<Nullable<NonEmptyString>[]>;
    isActive?: Nullable<boolean>;
    passwordReset?: Nullable<NonEmptyString>;
    passwordResetExp?: Nullable<DateTime>;
    activationToken?: Nullable<NonEmptyString>;
    activationTokenExp?: Nullable<DateTime>;
    insureds?: Nullable<Nullable<Insured>[]>;
    patients?: Nullable<Nullable<Patient>[]>;
}

export type EmailAddress = any;
export type DateTime = any;
export type PhoneNumber = any;
export type NonEmptyString = any;
type Nullable<T> = T | null;
