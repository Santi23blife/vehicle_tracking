import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle, vehicleService } from "../services/vehicleService";



export const VehicleMap: React.FC = () => {
    const { token }  = useAuth();

    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    useEffect(() => {
        if (token) {
            vehicleService.getVehicles(token).then(setVehicles)
        }
    }, [token])

    return (
        <MapContainer style={{height: '100vh', width: '100%'}} center={[19.4326, -99.1332]} zoom={12} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {vehicles.map((vehicle) => (
                <Marker key={vehicle.id} position={[vehicle.last_latitude, vehicle.last_longitude]}>
                    <Popup>
                        <strong>{vehicle.license_plate}</strong>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
    
}