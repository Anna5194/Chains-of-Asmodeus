import React, { useState } from 'react';
import { Divider, Table} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import styles from "./initiative.module.css";

const dataSource = [
  {
    initiative: '12',
    name: 'Mike',
    armorclass: 32,
    passivewisdom: 10,
    editanddelete: 
    "<EditOutlined />  <DeleteOutlined />",
  },
];

const columns = [
  {
    title: 'Инициатива',
    dataIndex: 'initiative',
    key: 'initiative',
    sorter: {
      compare: (a, b) => a.initiative - b.initiative,
    },
    width: "30px",
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    width: "70px",
  },
  {
    title: 'КБ',
    dataIndex: 'armorclass',
    key: 'armorclass',
    width: "15px",
  },
  {
    title: 'ПВ',
    dataIndex: 'passivewisdom',
    key: 'passivewisdom',
    width: "15px",
  },
  {
    title: '',
    dataIndex: 'editanddelete',
    key: 'editanddelete',
    width: "30px",
  },
  
];

const Initiative = () => {
    return (
        <div className="initiative">
            <Table dataSource={dataSource} columns={columns} scroll={{ y: 350 }} size='small' style={{ width: 400 }}/>;
        </div>
    )
}

export default Initiative;