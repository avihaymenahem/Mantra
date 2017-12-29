export const AppConfig = {
  apiUrl: 'http://localhost:3000/api',
};

export const ErrorMap = {
  'Register': {
    'AlreadyExists': 'This email is already taken.',
    'InvalidPassword': 'The provided password is invalid.',
    'InvalidName': 'The provided name is invalid.',
    'InvalidEmail': 'The provided email is invalid.',
    'Unauthorized': 'Invalid credentials.',
    'Forbiden': 'Invalid credentials.',
  },
  'Login': {
    'InvalidEmail': 'The provided email is invalid.',
    'InvalidPassword': 'The provided password is invalid.',
    'Unauthorized': 'Invalid email and/or password.',
  },
  'CreateLocale': {
  },
  'AddProjectUser': {
    'NotFound': 'No user found.',
  },
  'UpdateProjectClient': {
    'AlreadyExists': 'The provided name is already in use for this project.',
  },
};
