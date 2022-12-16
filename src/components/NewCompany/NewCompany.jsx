import React, { useState } from "react";
import { FriendList } from '../FriendsList/FriendList';

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

    const createCompany = () => {
        if(firstPasswordInput === secondPasswordInput) {
            props.showMembersNamesInputs();
            props.setNewCompanyPassword(secondPasswordInput);
        } else {
            alert('Паролі не співпадають');
            setFirstPasswordInput('');
            setSecondPasswordInput('');
        }
    }
    
    return (
        <>
            {props.state.showNewCompanyMembersInput && 
                <div>
                    <p>Введіть кількість участників</p>
                    <input type="text"
                    onChange={updateInputText}/>

                    <p>Придумайте пароль</p>
                        <input
                        type={passwordShown ? "text" : "password"} 
                        value={firstPasswordInput}
                        onChange={(e) => setFirstPasswordInput(e.target.value)}
                        placeholder="Введіть пароль"/>

                        <input 
                        type={passwordShown ? "text" : "password"} 
                        value={secondPasswordInput}
                        onChange={(e) => setSecondPasswordInput(e.target.value)}
                        placeholder="Повторіть пароль"/>
                        <form >
                            <input onClick={togglePassword} type="checkbox"/>
                            <label>Показати пароль</label>
                        </form>
                    <button
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