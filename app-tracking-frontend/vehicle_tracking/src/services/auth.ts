const SERVER_URL = import.meta.env.SERVER_URL

export const login = async (username: string, password: string) => {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
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
    return data.token
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const logout = () => {
    localStorage.removeItem('token')
}