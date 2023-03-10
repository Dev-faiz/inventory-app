import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { TiUserAddOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Register = () =>{
    return(
        <div className={`container ${styles.auth}`}>
           <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <TiUserAddOutline size={35} color="#999" /> 
                    </div>
                    <h2>Register</h2>
                    <form>

                        <input type="text" placeholder='name' required name='name' />
                        <input type="email" placeholder='Email' required name='email' />
                        <input type="password" placeholder='password' required name='password' />
                        <input type="password" placeholder='Confirm password' required name='password' />
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