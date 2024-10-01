// const SERVER_URL = import.meta.env.SERVER_URL
const SERVER_URL = "http://3.21.40.187"

export interface User {
    username: string;
    password: string;
}

export const authService = {
    login: async ({ username, password }: User) => {
        const response = await fetch(`${SERVER_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        if (!response.ok) {
            throw new Error("Login failed")
        }

        const data = await response.json()
        localStorage.setItem('token', data.access)
        return data.access;
    },

    register: async ({ username, password }: User) => {
        const response = await fetch(`${SERVER_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        if (!response.ok) {
            throw new Error("Register failed")
        }
    },

    getToken: () => {
        return localStorage.getItem('token')
    },

    logout: () => {
        localStorage.removeItem('token')
    }
}