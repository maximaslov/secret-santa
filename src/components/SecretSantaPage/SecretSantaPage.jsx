import React from "react";

const SecretSantaPage = (props) => {
    const becameMysterySanta = () => {
        props.showRandomMember();
    }

    const updateInputText = (e) => {
        props.updateNameInputText(e.target.value)
    }

    return (
        <>
            <h3>Введіть своє імʼя</h3>
            <input 
                type="text"
                value={props.nameInputValue}
                autoFocus={true}
                onChange={updateInputText}
            />

            <button
                onClick={becameMysterySanta}
            >Стати таємним сантой</button>
        </>
        
    )
}

export default SecretSantaPage;