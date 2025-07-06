import React, { useState } from 'react';
import { Button } from "antd";
import styles from "./menu-levels.module.css";

const Menu = () => {
    return(
        <div className={styles.menu}>
            <Button type="primary">
                Врата в АД
            </Button>
            <Button type="primary">
                1 слой Авернус
            </Button>
            <Button type="primary">
                2 слой Дис
            </Button>
        </div>
    )
}

export default Menu;