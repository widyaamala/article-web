
import React from 'react'
import { Layout as AntLayout, Image, Menu } from 'antd'
import { Link, Outlet, useLocation } from "react-router-dom"
import { menuItems } from '../../utils/menuUtils'
import "./Layout.scss"

const Layout: React.FC = () => {
  const { Header, Content, Footer } = AntLayout
  const location = useLocation()

  return (
    <AntLayout className='layout'>
      <Header className='header'>
        <Menu
          className='menu'
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
        >
          <Link to="/" className='logo'>
            <Image
              height='2em'
              alt="brand-logo"
              preview={false}
              src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
            />
          </Link>
          <div className='list-menu'>
            {menuItems.map((item: any) => (
              <Menu.Item
                key={item.key}
                className={`ant-menu-item ${item.key === location.pathname ? 'active' : ''}`}
              >
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </div>
        </Menu>
      </Header>
      <Content className='content'>
        <Outlet />
      </Content>
      <Footer className='footer'>
        Ant Design ©{new Date().getFullYear()} Created by Widya Amala
      </Footer>
    </AntLayout>
  )
}

export default Layout