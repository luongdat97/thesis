import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Search } = Input;
const { Header } = Layout;

export default function SearchBar(props) {
    const [textSearch, setTextSearch] = useState("")
    return (
        <Input
            style={{ width: 300, height: 45, borderRadius: 25 }}
            placeholder="Nhập việc làm bạn muốn tìm..."
            suffix={
                <Link className="text-dark" to={{
                    pathname: "/job-search",
                    state: { textSearch: textSearch }
                }}>
                    <i className="fas fa-search text-primary" style={{ fontSize: "1.7em", cursor: "pointer" }}></i>
                </Link>

            }
            onChange={(ev) => setTextSearch(ev.target.value)}
        />

    )
}