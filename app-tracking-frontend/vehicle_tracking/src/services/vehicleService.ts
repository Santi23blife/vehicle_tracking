// const SERVER_URL = import.meta.env.SERVER_URL
const SERVER_URL = "https://be25-3-21-40-187.ngrok-free.app"
export interface Vehicle {
    id?: number;
    license_plate: string;
    last_latitude: number;
    last_longitude: number;
}

export const vehicleService = {
    getVehicles: async (token: string): Promise<Vehicle[]> => {
        const response = await fetch(`${SERVER_URL}/api/vehicles/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })

        if (!response.ok) {
            throw new Error("Failed to get vehicles")
        }
        return await response.json()
    },

    createVehicle: async (vehicle: Vehicle, token: string): Promise<Vehicle[]> => {
        const response = await fetch(`${SERVER_URL}/api/vehicles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420'
            },
            body: JSON.stringify(vehicle)
        })

        if (!response.ok) {
            throw new Error("Failed to create vehicle")
        }
        return await response.json()
    },

    updateVehicle: async (id: number, vehicle: Vehicle, token: string): Promise<Vehicle[]> => {
        const response = await fetch(`${SERVER_URL}/api/vehicles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420'
            },
            body: JSON.stringify(vehicle)
        })

        if (!response.ok) {
            throw new Error("Failed to update vehicle")
        }
        return await response.json()
    },

    deleteVehicle: async (id: number, token: string): Promise<void> => {
        const response = await fetch(`${SERVER_URL}/api/vehicles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })

        if (!response.ok) {
            throw new Error("Failed to delete vehicle")
        }
    }
}