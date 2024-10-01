import React, { createContext, useContext, useState } from "react";
import { getToken } from "../services/auth";
import { login as apiLogin, logout as apiLogout } from "../services/auth";

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined >(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(getToken());

    const login = async (username: string, password: string) => {
        const token = await apiLogin(username, password)
        setToken(token)
    }

    const logout = () => {
        apiLogout();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};