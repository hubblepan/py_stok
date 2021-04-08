import React, { useEffect, useState } from 'react';
import { Drawer, Input, Menu } from 'antd';
import { CloseOutlined, SearchOutlined, MailOutlined } from '@ant-design/icons';
import { queryMenu } from '@/services/menuTree';
import { Link } from 'umi';
import SvgIcon from '@/components/SvgIcon/index';
import { query } from '../services/menuDrawer';

const ExpandDrawer = (props) => {
  const { visible, setVisible, menuItemData } = props;
  const onClose = () => {
    setVisible(false);
  };

  // console.log(menuItemData.id);

  // const [menuData, setMenuData] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await query();
  //     setMenuData(result.data);
  //   }
  //   fetchData();
  // }, []);
  // console.log(menuData);

  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await queryMenu();
      setMenuData(result.data);
    }
    fetchData();
  }, []);

  // console.log(menuData);

  const aaa = menuData.find(function (obj) {
    return obj.id === menuItemData.id;
  });
  // console.log(aaa);

  /**
   * 另一种情况
   * 不要删（备用参考）
   */

  // const menuItem = menuData.map((item) => {
  //   return (
  //     <Menu.ItemGroup key="g1" style={{ width: '230px', height: '350px' }}>
  //       <h3 style={{ color: '#DCDCDC', paddingBottom: '10px', paddingLeft: '28px' }}>
  //         {item.name}
  //       </h3>
  //       {item.children.map((item1) => {
  //         return (
  //           <Menu.Item key={item1.id} icon={<MailOutlined />}>
  //             {item1.name}
  //           </Menu.Item>
  //         );
  //       })}
  //     </Menu.ItemGroup>
  //   );
  // });
  const [isMouseIn, setIsMouseIn] = useState(false);

  const menuItem = (
    <Menu.ItemGroup key="g1" style={{ width: '230px' }}>
      <h3 style={{ color: '#DCDCDC', paddingBottom: '10px', paddingLeft: '28px' }}>
        {aaa ? aaa.name : null}
      </h3>
      {aaa === undefined
        ? null
        : aaa.children.map((item) => {
            return (
              <Menu.Item
                key={item.id}
                icon={<MailOutlined />}
                style={{ backgroundColor: '#262D48' }}
              >
                <Link
                  to={item.path}
                  style={{ color: '#DCDCDC' }}
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  <span
                    onMouseEnter={() => setIsMouseIn(true)}
                    onMouseLeave={() => setIsMouseIn(false)}
                  >
                    {isMouseIn ? (
                      <span>
                        {item.name}
                        <SvgIcon icon="collection" />
                      </span>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </span>

                  {/* {isMouseIn ? (
                    <div>
                      {item.name}
                      <SvgIcon icon="deleteHover" />
                    </div>
                  ) : (
                    <div>{item.name}</div>
                  )} */}
                </Link>
              </Menu.Item>
            );
          })}
    </Menu.ItemGroup>
  );

  return (
    <>
      <Drawer
        title={
          <Input placeholder="请输入关键字" prefix={<SearchOutlined />} style={{ width: '85%' }} />
        }
        // width={menuData.length === 1 ? '315' : menuData.length === 2 ? '545' : '775'}
        width={315}
        placement="left"
        headerStyle={{ backgroundColor: '#262D48', borderBottom: 'none' }}
        closable
        onClose={onClose}
        visible={visible}
        getContainer={false}
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        style={{ position: 'absolute', overflow: 'hidden', color: '#DCDCDC', cursor: 'pointer' }}
        drawerStyle={{
          backgroundColor: '#262D48',
        }}
      >
        <Menu
          style={{
            backgroundColor: '#262D48',
            color: 'white',
            display: 'flex',
            flexWrap: 'wrap',
            borderRight: 'none',
          }}
        >
          {menuItem}
          {/* <Menu.ItemGroup key="g1" style={{ width: '240px' }}>
            <h3 style={{ color: 'white', paddingBottom: '10px' }}>菜单项1</h3>
            <Menu.Item key="11" icon={<MailOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="12" icon={<MailOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="13" icon={<MailOutlined />}>
              Option 3
            </Menu.Item>
          </Menu.ItemGroup> */}
        </Menu>
      </Drawer>
    </>
  );
};

export default ExpandDrawer;
