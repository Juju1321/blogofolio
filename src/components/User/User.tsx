import React, { FC } from "react";

import styles from "./User.module.scss";

type UserProps = {
    userName: string | undefined,
}
const User: FC<UserProps> = ({ userName }) => {
    const firstLetters = userName?.split('_').map(user => user[0].toUpperCase()).join('');

    return (
        <div className={styles.userBlock}>
            <div className={styles.userAbbreviation}>
                { firstLetters }
            </div>
            <span className={styles.userName}>{ userName }</span>
        </div>
    );
};

export default User


