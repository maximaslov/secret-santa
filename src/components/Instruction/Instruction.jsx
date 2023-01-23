import React from "react";
import styles from "./Instruction.module.css";

const Instruction = (props) => {

    return (
        <div>
            <div 
                className={styles.instructionContainer} 
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.closeBtnContainer}>
                    <button 
                        className={styles.closeBtn}
                        onClick={props.toggleShowInstruction}
                        >х</button>
                </div>
                <div 
                    className={styles.description}>
                    
                    <h3 className={styles.firstText}>Про додаток</h3>
                    <p> <span className={styles.secondText}>Таємний санта - це безкоштовний онлайн-сервіс для
                        анонімного обміну подарунками серед друзів, коллег і родичів. </span>
                        <span className={styles.secondTextTwo}>
                        Створивши список ваших друзів, та передавши їм номер та пароль
                        вашої компанії, додаток швидко визначить для кого кожен з участників
                        буде таємним Cантою. </span>
                        <span className={styles.secondTextThree}>
                        Для кожного учасника підбирається інший участник
                        методом випадкового підбору.
                        Додаток повністю безкоштовний, та не вимагає жодної реєстрації.
                        </span>
                    </p>
                    
                    <h3 className={styles.thirdText}>Як користуватись</h3>
                    <h4 className={styles.fourthText}>Якщо компанія ще не свторена</h4>
                    <p className={styles.fifthText}>1. Натисніть на кнопку "Створити нову компанію".</p>
                    <p className={styles.sixText}>2. Введіть кількість учасників, придуймайте пароль та натисніть кнопку "Далі".</p>
                    <p className={styles.seventhText}>3. В кожному полі введіть імʼя кожного з учасників.</p>
                    <p className={styles.eightText}>Зверніть увагу, імена не повинні повторюватися, та не мають містити помилок.
                        Якщо у вашому списку є учасники з однаковими іменами,
                        домовтесь з ними, що один буде зареєстрований, наприклад, як Діма, а інший як Дмитро.
                    </p>
                    <p className={styles.ninethText}>4. Введіть своє імʼя і натисніть кнопку "Стати таємним Сантою".</p>
                    <p className={styles.tenText}>5. Після цього ви побачете імʼя людини, якої ви будете дарувати подарунок, список учасників,
                        а також номер та пароль вашої компанії.
                    </p>
                    <p className={styles.elevenText}>6. Передайте номер і пароль вашої компанії усім учасникам зі списку.</p>
                    <p className={styles.twelveText}>Зверніть увагу, учасник має заходити саме под таким імʼям, яким його зазначили у списку.
                        Якщо учасник зареєстрований під імʼям "Дмитро", він має вводити саме таке імʼя,
                        а не "Діма", "Дімон", "дмитро", тощо.
                    </p>
                    <h4 className={styles.thirteenText}>Якщо компанія вже свторена</h4>
                    <p className={styles.fourteenText}>1. Введіть номер і пароль вашої компнаії та натисніть кнопку "Далі".</p>
                    <p className={styles.seventeenText}>2. Введіть своє імʼя саме так, як було вказано людиною, яка створювала список учасників, та натисніть кнопку "Стати таємним Сантою".</p>
                    <p className={styles.eighteenText}>3. Після цього ви побачете імʼя людини, якої ви будете дарувати подарунок.</p>
                    <p className={styles.nineteenText}>Увага! Ви можете стати таємним Сантою тільки один раз в рамках однієї компанії.
                    Повторна спроба однозначно призведе до некоректної роботи сервісу і хтось залишиться без подарунка, можливо навіть ви. </p>
                    <h3 className={styles.twentyText}>З Новим Роком!</h3>
                    <button 
                        className={styles.closeBottomBtn}
                        onClick={props.toggleShowInstruction}
                        >Закрити</button>
                </div>
            </div>
        </div>
    )
}

export default Instruction;