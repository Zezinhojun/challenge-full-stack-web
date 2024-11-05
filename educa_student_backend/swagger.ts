import 'reflect-metadata';
import type { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';
import { version } from './package.json';

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: 'Educa Students API',
        version,
        description: 'API documentation for my Educa Student backend',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT ?? 3000}/api`,
            description: 'Development server',
        },
    ],
    paths: {
        '/users/register': {
            post: {
                tags: ['Users'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    password: { type: 'string' },
                                    name: { type: 'string' },
                                },
                                required: ['email', 'password', 'name'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User successfully registered',
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid input data',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    409: {
                        description: 'User already exists',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        '/users/login': {
            post: {
                tags: ['Users'],
                summary: 'Log in an existing user',
                requestBody: {
                    name: 'body',
                    in: 'body',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    password: { type: 'string' },
                                },
                                required: ['email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful',
                        schema: {
                            type: 'object',
                            properties: {
                                token: { type: 'string' },
                                userId: { type: 'string' },
                            },
                        },
                    },
                    401: {
                        description: 'Invalid credentials',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid input data',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        '/students': {
            post: {
                tags: ['Students'],
                summary: 'Create a new student',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string', format: 'email' },
                                    ra: {
                                        type: 'string',
                                        pattern: '^[0-9]{7}$',
                                        example: '1234567'
                                    },
                                    cpf: {
                                        type: 'string',
                                        pattern: '^[0-9]{11}$',
                                        example: '12345678901'
                                    },
                                },
                                required: ['name', 'email', 'ra', 'cpf'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Student successfully created',
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid input data',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
            get: {
                tags: ['Students'],
                summary: 'Retrieve a list of students',
                responses: {
                    200: {
                        description: 'List of students',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    email: { type: 'string', format: 'email' },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        '/students/{id}': {
            get: {
                tags: ['Students'],
                summary: 'Retrieve a student by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'Student found',
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                            },
                        },
                    },
                    404: {
                        description: 'Student not found',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid ID format',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Students'],
                summary: 'Update a student by ID',
                description: 'Updates the data of an existing student',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                            format: 'int64'
                        },
                        description: 'ID of the student to be updated'
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Carlinhos brawl'
                                    },
                                    email: {
                                        type: 'string',
                                        format: 'email',
                                        example: 'email@email.com.br'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Student successfully updated',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            example: 21
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'Carlinhos brawl'
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'email@email.com.br'
                                        },
                                        ra: {
                                            type: 'string',
                                            example: '12312302'
                                        },
                                        cpf: {
                                            type: 'string',
                                            example: '39398013292'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        description: 'Student not found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Student not found'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Could not update student'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['Students'],
                summary: 'Delete a student by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    204: {
                        description: 'Student successfully deleted',
                    },
                    404: {
                        description: 'Student not found',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid ID format',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        '/students/populate': {
            post: {
                tags: ['Students'],
                summary: 'Populate students',
                responses: {
                    201: {
                        description: 'Students created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        studentId: { type: 'string' },
                                        message: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid input data',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                }
            },
        },
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    },
                },
            },
            Student: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                    },
                    ra: {
                        type: 'string',
                    },
                    cpf: {
                        type: 'string'
                    }
                },
            },

        },
    },
};

const options: OAS3Options = {
    swaggerDefinition,
    apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);