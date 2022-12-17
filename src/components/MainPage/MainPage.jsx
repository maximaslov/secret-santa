import React, { useState } from "react";
import styles from "./MainPage.module.css"

const MainPage = (props) => {

    const [shownMobileRusBtn, setShownMobileRusBtn] = useState(true);

    const onBtnCkick = () => {
        props.hideMainPage()
        // props.play();
    }

    const onRusBtnClick = () => {
        alert('Нажаль додаток не працює на сєпорській мові')
        props.hideMainPage()
    }
    const onRusMobileBtnClick = () => {
        setShownMobileRusBtn(false)
        alert('Нажаль додаток не працює на сєпорській мові');
        // props.hideMainPage();
    }

    const random = (min,max) => {
        const rand = min + Math.random() * (max - min + 1);
        return Math.floor(rand)
    }

    const run = (e) => {
        e.target.style.left = `${random(0, 90)}%`
        e.target.style.top = `${random(0, 90)}%`
    }
    return (
        <div className={styles.MainPageContainer}>
            <h3>Оберіть мову</h3>
            <p className={styles.text}>Ти сєпор?</p>
            <div className={styles.buttons}>
                <button 
                    className={styles.button} 
                    onClick={onBtnCkick}>
                    UA
                </button>

                <button 
                    className={styles.rusButton}
                    onMouseEnter={run}
                    onClick={onRusBtnClick}
                    >
                    RUS
                </button>
                {shownMobileRusBtn && 
                <button 
                    className={styles.rusMobileButton}
                    onClick={onRusMobileBtnClick}
                    >
                    RUS
                </button>
                }
                
            </div>
            
            
            
        </div>
        
    )
}

export default MainPage;