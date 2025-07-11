import React, { useState } from 'react';
import { Button } from "antd";

import styles from "./monsters.module.css";


const Monsters = () => {
    return (
        <div className="monsters">
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

export default Monsters;