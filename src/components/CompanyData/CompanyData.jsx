import React from "react";
import styles from "./CompanyData.module.css"

const CompanyData = (props) => {
    
 return (
    <div className={styles.companyDataContainer}>
        <p className={styles.text}>Передайте Вашим друзям данні для доступу до вашої компанії:</p>
        <p className={styles.number}>Номер компанії: <span>{props.currentCompany.id}</span></p>
        <p className={styles.password}>Пароль компанії: <span>{props.currentCompany.password}</span></p>
        <div className={styles.list}>
            <p>Список учасників вашої компанії:</p>
            {
            props.currentCompany.friends.map((e, i) => <p key={i}>{i+1}. {e.name}</p>
            )}
        </div>
        <p className={styles.warning}>Будь ласка, не пердавайте цю інформацію людям, які не мають відношення до вашої компанії.
        Доступ до компанії стороннім особам може призвести до некоректної роботи сервісу. І хтось може залишитися без подарунка.
        </p>
    </div>
 )
}

export default CompanyData;