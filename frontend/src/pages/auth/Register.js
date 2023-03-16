import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { TiUserAddOutline } from "react-icons/ti";
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {toast} from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService';
import {useDispatch} from "react-redux"
import {SET_LOGIN , SET_NAME} from "../../redux/features/auth/authSlice"
const initialState = {
    name : "" ,
    email : "",
    password : "" ,
    confirmPassword : ""
}
const Register =  () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData , setFormData ] = useState(initialState);
    const {name, email, password, confirmPassword} = formData;
    const [isLoading , setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    };
    const register = async (e) => {
        e.preventDefault();

        if(!name || !email || !password ){
            return toast.error("All toast require");
        }

        if(password.length < 6){
            return toast.error("Password must be at least 6 characters");
        }
        if(!validateEmail(email)){
            return toast.error("Please Invalid email");
        }
        if( password !== confirmPassword ){
            return toast.error("Passwords do not match");
        }
        const userData = { name ,email , password };
        setIsLoading(true);
        console.log("before loading")
        try {
            const data = await registerUser(userData)
            setIsLoading(false);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
        }


    };

    return(
        <div className={`container ${styles.auth}`}>
           <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <TiUserAddOutline size={35} color="#999" /> 
                    </div>
                    <h2>Register</h2>
                    <form onSubmit={register}>
                        <input type="text" placeholder='name' required name='name' value={name} onChange={handleInputChange} />
                        <input type="email" placeholder='Email' required name='email'  value={email} onChange={handleInputChange} />
                        <input type="password" placeholder='password' required name='password'  value={password} onChange={handleInputChange} />
                        <input type="password" placeholder='Confirm password' required name='confirmPassword' value={confirmPassword} onChange={handleInputChange} />
                        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                    </form>
                    <span className={styles.register}>
                        <Link to="/">Home</Link>
                      <p>  &nbsp;  Already have an account? &nbsp; </p> <Link to="/login">Register</Link>
                    </span>
                </div>
           </Card>
        </div>
    )
}
export default Register;