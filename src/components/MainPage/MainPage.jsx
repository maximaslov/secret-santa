import React, { useState } from "react";
import styles from "./MainPage.module.css"
import Instruction from '../Instruction/Instruction';

const MainPage = (props) => {

    const [activeInstructionBtn, setActivInstructionBtn] = useState(false);

    const toggleShowInstruction = () => {
        setActivInstructionBtn(!activeInstructionBtn);
        props.setState({
            ...props.state, 
            showInctruction: !props.state.showInctruction,
        })
      }
      
    const onBtnCkick = () => {
        props.hideMainPage()
    }

    const onRusBtnClick = (e) => {
        props.setState({
            ...props.state, showLanguageError: true,
        })
        e.target.classList.add(styles.rusButtonBoom)
        setTimeout(()=> {
            e.target.classList.add(styles.rusButtonHide)
        }, 2000)
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
        <div onClick={() => toggleShowInstruction()}>
            <button 
                className={activeInstructionBtn ? styles.instructionBtnActive : styles.instructionBtn}
                onClick={toggleShowInstruction}
                >Інструкція
            </button>
            {props.state.showInctruction && <Instruction 
                toggleShowInstruction={toggleShowInstruction}
                state={props.state}
                setState={props.setState}
                setActivInstructionBtn={setActivInstructionBtn} />}
            {!activeInstructionBtn 
            ? 
            <div className={styles.MainPageContainer}>
            <h3>Оберіть мову</h3>
            <div className={styles.buttons}>
                <button 
                    className={styles.button} 
                    onClick={onBtnCkick}>
                    UA
                </button>
                <button 
                    className={styles.mobileButton} 
                    onClick={onBtnCkick}>
                    Почати
                </button>
                    <button 
                        className={styles.rusButton}
                        onMouseEnter={run}
                        onClick={onRusBtnClick}>
                        RU
                    </button>
            </div>
        </div> 
        : null
        }
    </div>
    )
}

export default MainPage;