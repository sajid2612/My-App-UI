import React, { Component } from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Anchor } from 'antd';
import { Menu, Icon } from 'antd';

const { Link } = Anchor;
const {
  Header, Footer, Sider, Content,
} = Layout;

export default class MainHeader extends Component {
    state = { 
    }
    render () {                                   
       return (
         <div>
            <Row gutter={24} style={{ background: '#fff' }}>
            <Col className="gutter-row" span={8}>
            <div className="gutter-box">
               
            </div>
            </Col>
            <Col className="gutter-row" span={8}>
            <div className="gutter-box"></div>
            </Col>
            <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Menu
               onClick={this.handleClick}
               selectedKeys={[this.state.current]}
               mode="horizontal"
               >
               <Menu.Item key="login">
               <a href="/signin">
                  <Icon type="login"/>
                  Login
                  </a>
               </Menu.Item>
               <Menu.Item key="create">
                  <a href="/signup">
                  <Icon type="user-add" />Create Account
                  </a>
               </Menu.Item>
            </Menu>
            </div>
            </Col>
         </Row>
         </div>
       )
    }
 }