type Profil = {
    birthDate: string | Date,
    email: string,
    id: string,
    lastName: string,
    name: string,
}

type OptionalProfil = {
    description?: string,
    phone?: string,
    city?: string,
    country?: string,
    gender?: string,
}

export type Account = Profil & OptionalProfil;

export type UpdateAccount = Omit<Account, 'email'>