import React, { useState } from "react";
import styles from "./StartPage.module.css";

const StartPage = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    const updateInputText = (e) => {
        if(isNaN(e.target.value)) {
            alert('Номер компанії може бути тільки цифрою')
            e.target.value = '';
        }
        props.updateCompanyInputText(e.target.value);
    }

    const updateInputPassword = (e) => {
        props.updateCompanyInputPassword((e.target.value));

        if(props.companyInputValue !== ''
        && props.passwordInputValue !== ''){
            props.setState({
                ...props.state, disabled: false,
            })
        }
    }

    const onSantaBtnClick = () => {
        props.getCurrentCompany();
    }

    const createNewCompany = () => {
        props.createNewCompany();
    }

    return (
        <div className={styles.StartPageContainer}>
            <h3 className={styles.firstText}>Якщо компанія вже створена</h3>
            <div className={styles.inputs}>
                <input className={styles.firstInput}
                    type="text" 
                    autoFocus={true}
                    value={props.companyInputValue}
                    placeholder="Введіть номер вашої компанії"
                    onChange={updateInputText}/>
                <input className={styles.secondInput}
                    type={passwordShown ? "text" : "password"} 
                    value={props.passwordInputValue}
                    placeholder="Введіть пароль вашоі компанії"
                    onChange={updateInputPassword}/>
                    <form className={styles.checkbox}>
                        <input 
                            className={styles.checkboxInput}
                            onClick={togglePassword} 
                            type="checkbox"/>
                        <label>Показати пароль</label>
                    </form>
            </div>
            
            <button 
                disabled={props.state.disabled ? true : false}
                className={props.state.disabled ? styles.disabledBtn : styles.firstButton}
                onClick={onSantaBtnClick}
            >Cтати таємним сантой</button>
            <h3 className={styles.secondText}>Aбо</h3>
            <button className={styles.secondButton}
                onClick={createNewCompany}
            >Створити нову компанію</button>
        </div>
    )
}

export default StartPage;