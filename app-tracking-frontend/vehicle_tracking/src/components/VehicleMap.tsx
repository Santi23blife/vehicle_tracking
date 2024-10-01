import { useAuth } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MoveMapButtons } from "./MoveMapButtons";
import 'leaflet/dist/leaflet.css';

export const VehicleMap: React.FC = () => {
    const { vehicles }  = useAuth();

    return (
            <MapContainer className="map" center={[19.4326, -99.1332]} zoom={12} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {vehicles.map((vehicle) => (
                    <Marker key={vehicle.id} position={[vehicle.last_latitude, vehicle.last_longitude]}>
                        <Popup>
                            <div className="map-popup">
                                <strong>Lat: {vehicle.last_latitude}, Lon: {vehicle.last_longitude}</strong>
                                <strong>License plate: {vehicle.license_plate}</strong>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <MoveMapButtons/>
            </MapContainer>
    )
    
}