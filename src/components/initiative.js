import React, { useState } from 'react';
import { Divider, Table, Button, Modal, Form, Input} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import styles from "./initiative.module.css";

const dataSource = [
  {
    initiative: '12',
    name: 'Mike',
    armorclass: 32,
    passivewisdom: 10,
    editanddelete: () => (<EditOutlined />, <DeleteOutlined />),
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
    key: 'editanddelete',
    width: "30px",
  },
  
];

const Initiative = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    return (
        <div className="initiative">
            <Button type="primary" onClick={showModal}>
              Добавить +
            </Button>
            <Table dataSource={dataSource} columns={columns} scroll={{ y: 350 }} size='small' style={{ width: 400 }}/>
            <Modal
              title="Добавить игрока"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form>
                
                <Form.Item label="Инициатива">
                  <Input placeholder="Введите инициативу" />
                </Form.Item>
                <Form.Item label="Имя">
                  <Input placeholder="Введите имя персонажа" />
                </Form.Item>
                <Form.Item label="КД">
                  <Input placeholder="Введите класс брони" />
                </Form.Item>
                <Form.Item label="ПВ">
                  <Input placeholder="Введите значение пассивной внимательности" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">Добавить</Button>
                </Form.Item>
              </Form>
            </Modal>
        </div>
    )
}

export default Initiative;