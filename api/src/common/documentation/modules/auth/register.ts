import { ApiDocumentationParams } from '../../types/api-documentation-params.type';

export const Register: ApiDocumentationParams = {
  created: 'default',
  badRequest: {
    description: `\n
    InvalidBodyException:
      First name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      First name cannot be empty
      First name must be string
      Last name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      Last name must be string
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username must be a string
      Username cannot be empty
      Email must be an email
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      Password cannot be empty
      Password must be string`,
  },
};
