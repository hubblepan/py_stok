import { Table, Dropdown, Input, Card, Checkbox } from 'antd';
import style from './style.less'
import { InfoCircleTwoTone, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';



const DMenu = (props) => {
  const { data, columns, setName, onChange } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [selected, setSelected] = useState([]);

  // 搜索算法，考虑可扩展
  const dataFilter = (keyword) => {
    let ret = [];
    data.forEach((x) => {
      if (x.name.indexOf(keyword) > -1) {
        ret.push(x);
      }
    });
    return ret;
  };

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      setSelected(dataFilter(keyword).map((x) => x.id));
      setSelectedRows(dataFilter(keyword));
      setName(
        dataFilter(keyword)
          .map((x) => x.name)
          .join(),
      );
    } else {
      setSelected([]);
      setSelectedRows([]);
      dataFilter([]);
      setName('');
    }
  };

  const CardWidth = 300;

  return (
    <Card
      bodyStyle={{ padding: 0, margin: 0 }}
      title={
        <div style={{ display: 'flex' }}>
          <Checkbox onChange={onCheckAllChange} />
          &nbsp;
          <div>&nbsp;&nbsp;已选 {selectedRows.length} 项</div>
        </div>
      }
      style={{ width: CardWidth + 'px' }}
    >
      {/* 搜索框 */}
      <div style={{ padding: '10px 10px 0' }}>
        <Input
          onChange={(e) => {
            setKeyword(e.currentTarget.value);
            // 清理checkBox
          }}
          placeholder="请输入关键词搜索"
          prefix={<SearchOutlined />}
        />
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Table
          // style={{ width: '80%', margin: '4px' }}
          rowSelection={{
            selectedRowKeys: selected,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelected(selectedRowKeys);
              setName(selectedRows.map((row) => row.name).join(','));
              setSelectedRows(selectedRows);
              // 判断是否触发全选
              let isSelectAll = selectedRows.length !== 0 && (selectedRows.length === data.length);
              console.log(isSelectAll)

              onChange && onChange(selectedRows.map((row) => row.name));
            },
          }}
          rowKey="id"
          tableLayout="fixed"
          size="small"
          showHeader={false}
          scroll={{ y: 305 }}
          columns={columns}
          dataSource={dataFilter(keyword)}
          pagination={false}
        />
      </div>
    </Card>
  );
};

export default (props) => {
  const { value, data = [], columns = [], onChange } = props;
  const [name, setName] = useState(value);

  return (
    <div className={style.dropDownSelect}>
      <Dropdown
        trigger={['click']}
        overlay={<DMenu setName={setName} data={data} columns={columns} onChange={onChange} />}
      >
        <a

          style={{ display: 'flex', width: '100%' }}
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {name ? (
            <div
              className="text-center"
              style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </div>
          ) : (
              <span
                className="text-center"
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#888',
                }}
              >
                请选择
              </span>
            )}
          <div style={{ marginLeft: 'auto' }}>
            <small>
              <DownOutlined />
            </small>
          </div>
        </a>
      </Dropdown>
    </div>
  );
};
