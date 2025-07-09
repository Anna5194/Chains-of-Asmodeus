import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Modal, 
  Form, 
  InputNumber,
  message  
} from "antd";
import { 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import styles from "./initiative.module.css";

const { Column } = Table;

const Initiative = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState([]);

    const showModal = () => {
        form.resetFields(); // Очищаем форму
        setEditingKey(''); // Сбрасываем ключ редактирования
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                if (editingKey) {
                    // Редактирование существующей записи
                    setData(data.map(item => 
                        item.key === editingKey ? { ...values, key: editingKey } : item
                    ));
                    message.success('Запись обновлена');
                } else {
                    // Добавление новой записи
                    const newKey = Date.now().toString();
                    setData([...data, { ...values, key: newKey }]);
                    message.success('Запись добавлена');
                }
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
        message.success('Запись удалена');
    };

    return(
        <div className={styles.initiative}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" onClick={showModal}>
                Добавить игрока +
                </Button>
            </div>

            <Table bordered dataSource={data} pagination={false} scroll={{ y: 400 }}>
                <Column
                    title="Инициатива"
                    dataIndex="initiative"
                    key="initiative"
                    sorter={(a, b) => a.initiative - b.initiative}
                />
                <Column
                    title="Имя персонажа"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    title="КБ"
                    dataIndex="armorClass"
                    key="armorClass"
                />
                <Column
                    title="ПВ"
                    dataIndex="passivePerception"
                    key="passivePerception"
                />
                <Column
                    title=" "
                    key="action"
                    render={(_, record) => (
                        <div>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                form.resetFields(); // Очищаем форму перед заполнением
                                form.setFieldsValue({ // Заполняем данными выбранной записи
                                    name: record.name,
                                    initiative: record.initiative,
                                    armorClass: record.armorClass,
                                    passivePerception: record.passivePerception
                                });
                                setEditingKey(record.key); // Устанавливаем ключ редактирования
                                setIsModalVisible(true); // Открываем модальное окно
                            }}
                        />
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.key)}
                        />
                        </div>
                    )}
                />
            </Table>

            <Modal
                title={editingKey ? "Редактирование записи" : "Добавление записи"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingKey('');
                }}
            >
                <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                        name="initiative"
                        label="Инициатива"
                        rules={[{ required: true, message: 'Введите значение инициативы' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="armorClass"
                        label="Класс Брони"
                        rules={[{ required: true, message: 'Введите класс брони' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="passivePerception"
                        label="Пассивная Внимательность"
                        rules={[{ required: true, message: 'Введите значение пассивного внимания' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Initiative;