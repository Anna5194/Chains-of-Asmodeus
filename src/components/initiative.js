import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber } from "antd";
import styles from "./initiative.module.css";

const Initiative = () => {
    return(
        <div className={styles.initiative}>
            <Button type="primary">
                Добавить игрока +
            </Button>
        </div>
    )
}

export default Initiative;