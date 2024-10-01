import { useMap } from "react-leaflet";
import { Vehicle, vehicleService } from "../services/vehicleService";
import { useRef, useState } from "react";
import { Modal } from "./Modal";
import { DeleteIcon } from "./DeleteIcon";
import { useAuth } from "../context/AuthContext";
import { UpdateIcon } from "./UpdateIcon";

export const MoveMapButtons = () => {
    const map = useMap();
    const { token, setVehicles, vehicles } = useAuth();

    const moveMap = ({ last_latitude, last_longitude }: { last_latitude: number, last_longitude: number}) => {
      map.flyTo([last_latitude, last_longitude], 12);
    };

    enum ModalTypes {
        CLOSE = "CLOSE",
        CREATE = "CREATE",
        UPDATE = "UPDATE"
    }

    const [selectedVehicle, setSelectedVehicle] = useState({} as Vehicle);
    const [modalOpen, setModalOpen] = useState<keyof typeof ModalTypes>("CLOSE");
    const openCreateModal = () => setModalOpen("CREATE");
    const openUpdateModal = (vehicle: Vehicle) => {
        setModalOpen("UPDATE");
        setSelectedVehicle(vehicle);
    }
    const closeModal = () => setModalOpen("CLOSE");

    const handleCallbackVehicles = async () => {
        const newVehicles = await vehicleService.getVehicles(token as string);
        setVehicles(newVehicles);
    }

    const handleDeleteVehicle = async (vehicle: Vehicle) => {
        try {
            await vehicleService.deleteVehicle(vehicle.id as number, token as string);
            await handleCallbackVehicles();
        } catch (error) {
            console.error("Error deleting vehicle: ", error);
        }
    }

    const formatCoords = ({ last_latitude, last_longitude }: { last_latitude: string, last_longitude: string}): { last_latitude: number, last_longitude: number } => {
        return { last_latitude: Number(last_latitude), last_longitude: Number(last_longitude) }
    }

    const hadleCreateVehicle = async (e: any) => {
        e.preventDefault();
        const { license_plate, last_latitude, last_longitude } = e.target;

        const { last_latitude: lat, last_longitude: lon } = formatCoords({ last_latitude: last_latitude.value, last_longitude: last_longitude.value });
        try {
            await vehicleService.createVehicle({ license_plate: license_plate.value, last_latitude: lat, last_longitude: lon }, token as string);
            moveMap({ last_latitude: lat, last_longitude: lon });
            await handleCallbackVehicles();
            e.target.reset();
            closeModal();
        } catch (error) {
            console.error("Error creating vehicle: ", error);
        }
    }

    const hadleUpdateVehicle = async (e: any) => {
        e.preventDefault();
        const { license_plate, last_latitude, last_longitude } = e.target;
        const { last_latitude: lat, last_longitude: lon } = formatCoords({ last_latitude: last_latitude.value, last_longitude: last_longitude.value });
        const vehicle = vehicles.find((vehicle) => vehicle.license_plate === license_plate.value)
        try {
            await vehicleService.updateVehicle(vehicle?.id as number, { license_plate: license_plate.value, last_latitude: lat, last_longitude: lon }, token as string);
            await handleCallbackVehicles();
            e.target.reset();
            closeModal();
        } catch (error) {
            console.error("Error updating vehicle: ", error);
        }
    }

    const latitudeInputRef = useRef<HTMLInputElement>(null);
    const longitudeInputRef = useRef<HTMLInputElement>(null);

    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                if (latitudeInputRef.current && longitudeInputRef.current) {
                    latitudeInputRef.current.value = latitude.toString();
                    longitudeInputRef.current.value = longitude.toString();
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    return (
        <div className='map-container'>
            <div className='map-container-header'>Vehicles</div>
            {vehicles.map((vehicle, index) => (
            <div className='map-items' key={index}>
                <p onClick={() => moveMap(vehicle)} className="coords-button">{vehicle.license_plate} - Lat: {vehicle.last_latitude}, Lon: {vehicle.last_longitude}</p>
                <UpdateIcon onClick={() => openUpdateModal(vehicle)} className="icon-update" />
                <DeleteIcon onClick={() => handleDeleteVehicle(vehicle)} className="icon-delete"/>
            </div>            
            ))}
            <button className="map-button" onClick={openCreateModal}>Create Vehicle</button>
            {modalOpen === "CREATE" && (
                <Modal onClose={closeModal}>
                    <h2 className="modal-title">Create Vehicle</h2>
                    <form className="modal-form" onSubmit={hadleCreateVehicle}>
                        <label>
                            License Plate:
                            <input type="text" name="license_plate" />
                        </label>
                        <label>
                            Last Latitude:
                            <input ref={latitudeInputRef} type="text" name="last_latitude" />
                        </label>
                        <label>
                            Last Longitude:
                            <input ref={longitudeInputRef} type="text" name="last_longitude" />
                        </label>
                        <button className="modal-button-secondary" type="button" onClick={getCurrentPosition}>Using current position</button>
                        <button className="modal-button" type="submit">Create</button>
                    </form>
                </Modal>
            )}
            {modalOpen === "UPDATE" && (
                <Modal onClose={closeModal}>
                    <h2 className="modal-title">Update Vehicle</h2>
                    <form className="modal-form" onSubmit={hadleUpdateVehicle}>
                        <label>
                            License Plate:
                            <input type="text" name="license_plate" defaultValue={selectedVehicle?.license_plate} />
                        </label>
                        <label>
                            Last Latitude:
                            <input type="text" name="last_latitude" defaultValue={selectedVehicle?.last_latitude} />
                        </label>
                        <label>
                            Last Longitude:
                            <input type="text" name="last_longitude" defaultValue={selectedVehicle?.last_longitude} />
                        </label>
                        <button className="modal-button" type="submit">Update</button>
                    </form>
                </Modal>
            )}
        </div>
    )
  };