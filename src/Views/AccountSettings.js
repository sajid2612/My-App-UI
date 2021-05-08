import React from "react";
import SignUp from '../Views/SignUp';
import SecuritySetting from '../Views/SecuritySetting';
import { Layout, Menu, Icon, Form } from 'antd';

const {
  Header, Content, Footer, Sider,
} = Layout;

class AccountSettings1 extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);

  }

render() {
  return(
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">User Creation</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">Security Settings</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">Notification Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 40, background: '#fff', minHeight: 600 }}>
            <SignUp/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>
      </Layout>
    </Layout>
  );
}
}

const AccSettings1 = Form.create()(AccountSettings1);
export default AccSettings1;
