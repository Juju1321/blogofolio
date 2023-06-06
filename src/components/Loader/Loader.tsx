import React from "react";
import Lottie from "lottie-react";

import loader from "src/assets/loader.json";
import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.container}>
        <Lottie
            style={{ width: 200, height: 200}}
            // className={styles.loader}
            animationData={loader}
            loop={true}
        />
        </div>
    );
};

export default Loader;