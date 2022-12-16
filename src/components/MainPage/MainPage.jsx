import React from "react";
import styles from "./MainPage.module.css"

const MainPage = (props) => {
    const onBtnCkick = () => {
        props.hideMainPage()
    }
    return (
        <div className={styles.MainPageContainer}>
            <button className={styles.button} onClick={onBtnCkick}>
                Почати
            </button>
            
        </div>
        
    )
}

export default MainPage;