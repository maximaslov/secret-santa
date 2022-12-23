import React from "react";
import styles from "./SecretSantaPage.module.css";

const SecretSantaPage = (props) => {
    const becameMysterySanta = () => {
        props.showRandomMember();
    }

    const updateInputText = (e) => {
        props.updateNameInputText(e.target.value)
    }

    return (
        <div className={styles.secretSantaContainer}>
            <h3>Введіть своє імʼя</h3>
            <input
                placeholder="Введіть своє імʼя"
                type="text"
                value={props.nameInputValue}
                autoFocus={true}
                onChange={updateInputText}
            />

            <button className={styles.santaBtn}
                onClick={becameMysterySanta}
            >Стати таємним Сантою</button>
        </div>
        
    )
}

export default SecretSantaPage;