export class ApiEndpoints {
    static auth = {
        signIn: `/v1/login`,
        signUp: `/v1/signup`,
    };

    static user = {
        getUsers: '/v1/users',
        getSingleUser: (username: string) => `/v1/users/${username}`,
        createUser: '/v1/users',
        deleteUser: (username: string) => `/v1/users/${username}`,
        updateUser: '/v1/users',
    };

    static task = {
        createTask: '/v1/tasks',
        getTasks: '/v1/tasks',
        updateTask: '/v1/tasks',
        getTaskSummary: '/v1/tasks/summary',
        deleteTask: (id: number) => `/v1/tasks/${id}`,
    };
}

export const URLsWithoutAuthorization = [
    ApiEndpoints.auth.signIn,
    ApiEndpoints.auth.signUp,
];
