import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
import { Vehicle } from "../services/vehicleService";

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<string>;
    logout: () => void;
    vehicles: Vehicle[];
    setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
    isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined >(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(authService.getToken());
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username: string, password: string): Promise<string> => {
        const token = await authService.login({
            username,
            password
        });
        setIsLoggedIn(true);
        setToken(token)
        return token;
    }


    const logout = () => {
        authService.logout();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, vehicles, setVehicles, isLoggedIn }}>
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