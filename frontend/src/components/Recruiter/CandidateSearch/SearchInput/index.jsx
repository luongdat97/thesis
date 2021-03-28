import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;



const SearchInput = (props) => {
    const [keyword, setKeyword] = useState(["HTML", "CSS", "Javascript"])
    const [keywordInput, setKeywordInput] = useState("")
    function onChange(value) {
        console.log(`selected ${value}`);

    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);

    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setKeywordInput("")
    }

    function handleSearch(value) {
        setKeywordInput(value)
    }

    return (
        <>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                onSearch={handleSearch}
                size="large"
                style={{width: 500}}
            >
                {keywordInput && <Option value={keywordInput}>{keywordInput}</Option>}
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>

        </>

    )
};

export default SearchInput