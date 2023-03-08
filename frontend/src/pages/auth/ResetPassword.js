import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { MdPassword } from "react-icons/md";
import { Link } from 'react-router-dom';

const ResetPassword = () =>{
    return(
        <div className={`container ${styles.auth}`}>
           <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color="#999" /> 
                    </div>
                    <h2>Reset Password Password</h2>
                    <form>
                        <input type="password" placeholder='New Password' required name='password' />
                        <input type="password" placeholder='Confirm New Password' required name='password' />
                        <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
                        <span className={styles.links}>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                    </span>
                    </form>
                   
                </div>
           </Card>
        </div>
    )
}
export default ResetPassword;