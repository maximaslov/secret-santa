import React, { useState } from "react";
import { FriendList } from '../FriendsList/FriendList';
import styles from './NewCompany.module.css';

const NewCompany = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [firstPasswordInput, setFirstPasswordInput] = useState('');
    const [secondPasswordInput, setSecondPasswordInput] = useState('');

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    const updateInputText = (e) => {
        if(isNaN(e.target.value)) {
            alert('Введіть, будь ласка, кількість цифрою')
            e.target.value = '';
        }
        props.updateNewCompanyTotalMembers(Number(e.target.value))
    }

    const updateSecondPasswordInput = (e) => {
        setSecondPasswordInput(e.target.value)
        if(props.membersInputValue !== ''
        && firstPasswordInput !== ''
        && secondPasswordInput !== ''){
            props.setState({
                ...props.state, disabledNewCompanyBtn: false,
            })
        }
    }
    const createCompany = () => {
        if(firstPasswordInput === secondPasswordInput) {
            props.showMembersNamesInputs();
            props.setNewCompanyPassword(secondPasswordInput);
        } else {
            alert('Паролі не співпадають');
            setFirstPasswordInput('');
            setSecondPasswordInput('');
            props.setState({
                ...props.state, disabledNewCompanyBtn: true,
            })
        }
    }
    
    return (
        <>
            {props.state.showNewCompanyMembersInput && 
                <div className={styles.NewCompanyContainer}>
                    <h4 className={styles.firstText}>Введіть кількість участників</h4>
                    <input 
                        value={props.membersInputValue}
                        className={styles.firstInput} 
                        type="text"
                        onChange={updateInputText}/>

                    <h4 className={styles.secondText}>Придумайте пароль</h4>
                        <div className={styles.passwordInputs}>
                            <input 
                                className={styles.firstPasswordInput}
                                type={passwordShown ? "text" : "password"} 
                                value={firstPasswordInput}
                                onChange={(e) => setFirstPasswordInput(e.target.value)}
                                placeholder="Введіть пароль"/>

                            <input 
                                className={styles.secondPasswordInput}
                                type={passwordShown ? "text" : "password"} 
                                value={secondPasswordInput}
                                onChange={(e) => updateSecondPasswordInput(e)}
                                placeholder="Повторіть пароль"/>
                        </div>
                        
                        <form className={styles.checkboxForm}>
                            <input 
                                className={styles.checkbox}
                                onClick={togglePassword} 
                                type="checkbox"/>
                            <label>Показати пароль</label>
                        </form>
                    <button
                        disabled={props.state.disabledNewCompanyBtn ? true : false}
                        className={props.state.disabledNewCompanyBtn ? styles.disabledBtn : styles.button}
                        onClick={createCompany}>Далі</button>
                </div>}

            {props.state.showFriendsList &&
                <FriendList 
                    totalMembers={props.totalMembers}
                    setNewCompany={props.setNewCompany}
                    state={props.state}
                    getCurrentCompany={props.getCurrentCompany}
                    setCurrentCompanyOnServer={props.setCurrentCompanyOnServer}
                    newCompanyPassword={props.newCompanyPassword} />
                }
        </>
    )
}

export default NewCompany;