import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { Button, Form, Input, Row, Col, message, Pagination, Dropdown } from 'antd';

const SearchPane = (props) => {
  const {
    formItems = [],
    toolbarDom,
    searchRender,
    // searchForm,
    // searchWord,
    // setSearchWord,
    handles,
  } = props;

  const { searchWord, setSearchWord } = handles;

  const [searchForm] = Form.useForm();

  if (searchRender) {
    return searchRender(formItems, colsNumber, labelWidth);
  }
  const [_searchWord, set_searchWord] = useState('');
  return (
    <div className="a-card-header">
      <Form form={searchForm} layout="inline" className="d-flex flex-fill">
        {formItems.map((component, index) => {
          const _component = React.cloneElement(component, {
            onChange: (e) => {
              set_searchWord(e.target.value);
              if (e.target.value === '') {
                setSearchWord(e.target.value);
              }
            },
            onKeyPress: (e) => {
              const keyCode = e.which;
              if (keyCode == 13) {
                setSearchWord(_searchWord);
              }
            },
            value: _searchWord,
          });

          return (
            <Form.Item
              label={component.props.label}
              name={component.props.name}
              key={index}
              style={{ margin: 0, flex: 1 }}
            >
              {_component}
            </Form.Item>
          );
        })}
      </Form>
      {toolbarDom}
    </div>
  );
};

export default SearchPane;
