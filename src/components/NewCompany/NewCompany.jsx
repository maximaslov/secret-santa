import React, { useState } from "react";
import { FriendList } from '../FriendsList/FriendList';
import styles from './NewCompany.module.css';
import PasswordCheckbox from '../PasswordCheckbox/PasswordCheckbox';

const NewCompany = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [firstPasswordInput, setFirstPasswordInput] = useState('');
    const [secondPasswordInput, setSecondPasswordInput] = useState('');

    const showMemberNumberInputError = () => {
        props.setState({
            ...props.state, showMemberNumberInputError: true,
        })
        setTimeout( () => {
            props.setState({
                ...props.state, showMemberNumberInputError: false,
            })}, 3000)
    }

    const showTotalMembersInputError = () => {
        props.setState({
            ...props.state, showTotalMembersInputError: true,
        })
        setTimeout( () => {
            props.setState({
                ...props.state, showTotalMembersInputError: false,
            })}, 3000)
    }

    const showPasswordInputError = () => {
        props.setState({
            ...props.state, 
            showPasswordInputError: true,
            disabledNewCompanyBtn: true,
            showCurrentCompany: true,
        })
        setTimeout( () => {
            props.setState({
                ...props.state, showPasswordInputError: false,
            })}, 3000)
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    const updateInputText = (e) => {
        if(isNaN(e.target.value)) {
            showMemberNumberInputError();
            e.target.value = '';
        } else {
            props.updateNewCompanyTotalMembers(Number(e.target.value))
        }
    }
    
    const updateSecondPasswordInput = (e) => {
        setSecondPasswordInput(e.target.value);

        if(props.membersInputValue !== ''
            && firstPasswordInput !== ''
            && secondPasswordInput !== ''){
                props.setState({
                    ...props.state, disabledNewCompanyBtn: false,
                })
        }
    }

    const createCompany = () => {
        if(Number(props.membersInputValue) === 0 || Number(props.membersInputValue) < 3) {
            showTotalMembersInputError();
        } else {
            if(firstPasswordInput === secondPasswordInput) {
                props.showMembersNamesInputs();
                props.setNewCompanyPassword(secondPasswordInput);
            } else { 
                setFirstPasswordInput('');
                setSecondPasswordInput('');
                showPasswordInputError();
            }
        }
    }
    
    return (
        <>
            {props.state.showNewCompanyMembersInput && 
                <div className={styles.NewCompanyContainer}>
                    <h4 className={styles.firstText}>Введіть кількість участників</h4>
                    <input 
                        autoFocus={true}
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
                        <PasswordCheckbox
                            checkbox={styles.checkboxForm}
                            togglePassword={togglePassword}
                            checkboxInput={styles.checkbox} />
                    <button
                        disabled={props.state.disabledNewCompanyBtn ? true : false}
                        className={props.state.disabledNewCompanyBtn ? styles.disabledBtn : styles.button}
                        onClick={createCompany}>Далі</button>
                </div>}

            {props.state.showFriendsList &&
                <FriendList
                    setState={props.setState}
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