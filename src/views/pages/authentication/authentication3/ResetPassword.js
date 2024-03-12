import React from "react";
import "../../../../assets/css/ResetPassword.css"
import reset from "../../../../assets/images/auth/reset.svg"

const ResetPassword = () => {
    return (
        <>
            <div className="resetContainer">
                <img src={reset} alt="" />
                <div className="form_div">
                    <form>
                        <div className="resetUtils">
                            <h1>Reset Your Password</h1>
                            <input type="password" placeholder="Password" required />
                            <input type="password" placeholder="Confirm Password" required />
                            <button>Set new password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;