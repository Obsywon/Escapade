

export const lastNameRules = {
    required: true,
    minLength: {
      value: 3,
      message: 'Le nom doit faire au moins 3 caractères.',
    },
};

export const nameRules = {
    required: true,
    minLength: {
      value: 3,
      message: 'Le prénom doit faire au moins 3 caractères.',
    },
}

export const placeNameRules = {
  required: true,
  minLength: {
    value: 3,
    message: 'Le nom du lieu doit faire au moins 3 caractères',
  },
}

export const placeDescriptionRules = {
  minLength: {
    value: 3,
    message: 'La description du lieu doit faire au moins 3 caractères',
  },
}



export const cityRules = {
  required: true,
    minLength: {
        value: 2,
        message: 'La ville doit faire au moins 2 caractères.',
      },
}

export const countryRules = {
  required: true,
    minLength: {
        value: 2,
        message: 'Le pays doit faire au moins 2 caractères.',
      },
}

export const descriptionRules = {
  required: true,
    maxLength: {
        value: 150,
        message: 'Votre description doit faire moins de 150 caractères.',
    }
}