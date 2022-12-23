import React, { useState } from "react";
import styles from "./StartPage.module.css";
import PasswordCheckbox from '../PasswordCheckbox/PasswordCheckbox';

const StartPage = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const showCompanyNumberErr = () => {
        props.setState({
            ...props.state, showCompanyNumberError: true,
        })
        setTimeout( () => {
            props.setState({
                ...props.state, showCompanyNumberError: false,
            })}, 3000)
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    const updateInputText = (e) => {
        if(isNaN(e.target.value)) {
            showCompanyNumberErr();
            e.target.value = '';
        }
        props.updateCompanyInputText(e.target.value);
    }

    const updateInputPassword = (e) => {
        props.updateCompanyInputPassword((e.target.value));
        console.log(props.passwordInputValue.length+1)

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
                    value={props.companyInputValue}
                    placeholder="Введіть номер вашої компанії"
                    onChange={updateInputText}/>
                <input className={styles.secondInput}
                    type={passwordShown ? "text" : "password"} 
                    value={props.passwordInputValue}
                    placeholder="Введіть пароль вашоі компанії"
                    onChange={updateInputPassword}/>
                <PasswordCheckbox
                    checkbox={styles.checkbox}
                    togglePassword={togglePassword}
                    checkboxInput={styles.checkboxInput} />
            </div>
            
            <button 
                disabled={props.state.disabled ? true : false}
                className={props.state.disabled ? styles.disabledBtn : styles.firstButton}
                onClick={onSantaBtnClick}
            >Cтати таємним Сантою</button>
            <h3 className={styles.secondText}>Aбо</h3>
            <button className={styles.secondButton}
                onClick={createNewCompany}
            >Створити нову компанію</button>
        </div>
    )
}

export default StartPage;