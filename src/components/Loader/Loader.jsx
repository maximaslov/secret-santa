import React from "react";
import loader from "../../img/loader-santa.gif";
import styles from "./Loader.module.css";

const Loader = (props) => {
    return (
        <div className={styles.loader}>
            <img src={loader} alt="Loading..." />
        </div>
    )
}

export default Loader;