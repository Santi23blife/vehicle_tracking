import { useEffect, useState } from 'react'
import './App.css'
import { VehicleMap } from './components/VehicleMap';
import { vehicleService } from './services/vehicleService';
import { authService } from './services/authService';
import { useAuth } from './context/AuthContext';

function App() {
  enum ModalTypes {
    CLOSE = "CLOSE",
    LOGIN = "LOGIN",
    REGISTER = "REGISTER"
  }
  const [openModal, setOpenModal] = useState<keyof typeof ModalTypes>("LOGIN");
  const { setVehicles, login, token, isLoggedIn } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { username, password } = e.target;
    try {
      const token = await login(username.value, password.value);
      if (token) {
        setOpenModal("CLOSE");
      }
      e.target.reset();
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const { username, password } = e.target;
    try {
      await authService.register({password: password.value, username: username.value});
      setOpenModal("CLOSE");
      login(username.value, password.value);
      e.target.reset();
    } catch (error) {
      console.error("Error registering: ", error);
    }
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
    <>
    <div className="App">
      <VehicleMap/>
      {openModal === "LOGIN" && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 className='modal-title'>Login</h2>
            <form className='modal-form' onSubmit={handleLogin}>
                <label>Username:
                  <input name='username' type='text' placeholder='Enter username' required/>
                </label>
                <label>
                  Password:
                  <input name='password' type='password' placeholder='Enter password' required/>
                </label>
              <span>Username or password is incorrect</span>
              <button type='submit' className='modal-button w-36'>Login</button>
              <div>or</div>
              <button className='modal-button-secondary w-48 mt-0' onClick={() => setOpenModal("REGISTER")}>Register</button>
            </form>
          </div>
        </div>
      )}

      {openModal === "REGISTER" && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 className='modal-title'>Register</h2>
            <form className='modal-form' onSubmit={handleRegister}>
                <label>
                  Username:
                  <input name='username' type='text' placeholder='Enter username' required/>
                </label>
                <label>
                  Password:
                  <input name='password' type='password' placeholder='Enter password' required/>
                </label>
              <button type='submit' className='modal-button w-36'>Register</button>
              <div>or</div>
              <button className='modal-button-secondary w-48 mt-0' onClick={() => setOpenModal("LOGIN")}>Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
    <div id='modal'></div>
    </>
  )
}

export default App
