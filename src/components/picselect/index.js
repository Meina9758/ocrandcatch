import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import axios from 'axios';

const TableComponent = (props) => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        axios.get(props.loadlink)
            .then(response => {
                setData(response.data.images);
                console.log(response.data.images);
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.loadlink]);

    const handleRowSelection = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        console.log(selectedRowKeys);
    };

    const columns = [
        // {
        //     title: '选择',
        //     dataIndex: 'select',
        //     render: (_, record) => (
        //         <Checkbox
        //             checked={selectedRowKeys.includes(record.uuid)}
        //             onChange={(e) =>
        //                 handleRowSelection(
        //                     e.target.checked
        //                         ? [...selectedRowKeys, record.uuid]
        //                         : selectedRowKeys.filter((key) => key !== record.uuid)
        //                 )
        //             }
        //         />
        //     ),
        // },
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img src={`data:image/jpeg;base64,${image}`} alt="图片" style={{width: '100px'}}/>
            ),
        },
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: handleRowSelection,
    };

    return (
        <Table
            rowKey={(record) => record.uuid}
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
        />
    );
};

export default TableComponent;
