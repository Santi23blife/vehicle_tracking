import { useEffect, useState } from 'react'
import './App.css'
import { VehicleMap } from './components/VehicleMap';
import { Vehicle, vehicleService } from './services/vehicleService';
import { authService } from './services/auth';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    const { username, password } = e.target;
    const token = authService.login({password: password.value, username: username.value});
    console.log(token)
    // const fakeToken = 'fake-token';
    // setToken(fakeToken);
    // setIsLoggedIn(true);
    // setShowLogin(false);
  };

  const fetchVehicles = async () => {
    if (token) {
      try {
        const data = await vehicleService.getVehicles(token);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles: ", error);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchVehicles();
    }
  }, [isLoggedIn])
  

  return (
    <div className="App">
      <VehicleMap/>
      <div id='map-container'>
        {vehicles.map((vehicle, index) => (
          <div key={index}>
            <p>{vehicle.license_plate} - Lat: {vehicle.last_latitude}, Lon: {vehicle.last_longitude}</p>
          </div>            
        ))}
      </div>
      {showLogin && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 className='modal-title'>Login</h2>
            <form onSubmit={handleLogin}>
              <div className='form-group'>
                <label>Username</label>
                <input name='username' type='text' placeholder='Enter username' required/>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input name='password' type='password' placeholder='Enter password' required/>
              </div>
              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
