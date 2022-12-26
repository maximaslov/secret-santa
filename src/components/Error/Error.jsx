import React from "react";
import styles from "./Error.module.css";

const Error = (props) => {
    return (
        <div className={styles.error}>
            {props.state.showConnectionError &&
            <p>Нажаль, немає звʼязку із сервером. Спробуйте, будь ласка, пізніше.</p>}

            {props.state.showMemberNumberInputError &&
            <p>Введіть, будь ласка, кількість участников цифрою.</p>}

            {props.state.showTotalMembersInputError &&
            <p>В компанії повинно бути щонайменше 3 учасника.</p>}

            {props.state.showPasswordInputError &&
            <p>Паролі не співпадають.</p>}

            {props.state.showAllhaveSantaError &&
            <p>У поточній компанії у всіх є таємний санта.</p>}

            {props.state.showIncorrectPasswordError &&
            <p>Невірний пароль.</p>}

            {props.state.showNameNotFoundError &&
            <p>Учасник з таким імʼям не знайден в поточній компанії.</p>}

            {props.state.showEmptyFieldError &&
            <p>Жодне поле не повинно бути пустим.</p>}

            {props.state.showCompanyNumberError &&
            <p>Номер компанії може бути тільки цифрою.</p>}

            {props.state.showCompanyNotFoundError &&
            <p>Компанія з таким номером не знайдена.</p>}  

            {props.state.showLanguageError &&
            <p className={styles.languageError}>Непогана реакція! Але у додатку доступна тільки українська мова.</p>} 
        </div>
    )
}

export default Error;