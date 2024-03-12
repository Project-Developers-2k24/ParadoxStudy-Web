import "../../../../assets/css/ForgotPassword.css"
import forgot from "../../../../assets/images/auth/forgot1.png"
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <>
            <div className="main">
                <div className='designtop'>
                    <div className='design1'></div>
                    <div className='design2'></div>
                </div>
                <div className="container">

                    <div className='box'>
                        <h1>Forgot Password ?</h1>
                        <h3>Enter your registered email to reset your password.</h3>

                        <div className="wrapper">
                            <form>
                                <div className="input-data">
                                    <input type="email" name="email" id="user_email" placeholder="Enter your Registered Email ID"required />
                                    <div className="underline"></div>
                                    {/* <label htmlFor="user_email">Enter your Registered Email ID</label> */}
                                </div>
                                <button className='reset'>Reset Password</button>
                            </form>
                            <div className="footer">
                                <h5>New here? <Link to="/pages/register/register3">   Sign Up</Link></h5>
                                <h5>Already have an account? <Link to="/pages/login/login3">Sign In</Link></h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className="forgotimg" src={forgot} alt="forgotpassword" />
                    </div>
                </div>
                <div className='designbottom'>
                    <div className='design3'></div>
                    <div className='design4'></div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
