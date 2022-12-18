import React from "react";
import styles from "./PasswordCheckbox.module.css";

const PasswordCheckbox = (props) => {
    return (
        <form className={props.checkbox}>
            <input 
                className={props.checkboxInput}
                onClick={props.togglePassword} 
                type="checkbox"/>
            <label className={styles.label}>Показати пароль</label>
        </form>
    )
}

export default PasswordCheckbox;