import React from "react";
import styles from "./ResultPage.module.css";
import CompanyData from '../CompanyData/CompanyData';

const ResultPage = (props) => {
    
    return (
        <div className={styles.resultContainer}>
            <h3 className={styles.result}>Ви будете таємним Сантой у <span>{props.result}</span></h3>
            <div> 
                {props.state.showCurrentCompany && <CompanyData currentCompany={props.currentCompany} />}
            </div>
        </div>
    )
}

export default ResultPage;