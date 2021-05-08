import React, { Component } from 'react';
import MainHeader from '../Views/MainHeader'
import MainFooter from '../Views/MainFooter'
import MainBody from '../Views/MainBody'
import { Layout, Input, Row, Col, Icon, Select, Divider, Skeleton } from 'antd';
import { Tabs, Form, Button, Popover } from 'antd';
import { DatePicker } from 'antd';
import '../Views/Home.css';
import moment from 'moment';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';

const {
  Header, Footer, Sider, Content,
} = Layout;


class SearchForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
       id: 0,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

   handleClick = () => {
      this.setState({
         id : this.state.id + 1
      });
      // this.state = {
      //    id : this.state.id + 1,
      // }

      console.log(this.state);
   }

   handleChange = (date, dateString) => {
      console.log(date, dateString);
   }

   render () {
      const id = this.state.id;
      const today = new Date();
      const tomorrow = new Date();
      const threeDaysFromTomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      threeDaysFromTomorrow.setDate(today.getDate() + 4);
      const roomCount = 1;
      const adultCount = 1;
      const childCount = 0;
      const content =<div style={{ width: 250 }}>
                        <Row style={{margin: 0}}>
                           <Col xs={8} sm={12} md={12} lg={12} xl={12}>Room(s)</Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="minus" /></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><span align="center">{roomCount}</span></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="plus" /></Col>
                        </Row>
                        <Divider />
                        <Row style={{margin: 0}}>
                           <Col xs={8} sm={12} md={12} lg={12} xl={12}><Icon type="user" style={{ fontSize: '24px'}} /></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="minus" /></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><span align="center">{adultCount}</span></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="plus" /></Col>
                        </Row>
                        <Divider dashed/>
                        <Row style={{margin: 0}}>
                           <Col xs={8} sm={12} md={12} lg={12} xl={12}><Icon type="user" style={{ fontSize: '18px'}} /></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="minus" /></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><span align="center">{childCount}</span></Col>
                           <Col xs={8} sm={4} md={4} lg={4} xl={4}><Button size="small" icon="plus" /></Col>
                        </Row>
                     </div>

       return (
         <Layout>
         <MainHeader/>
           <Content>

              <Row gutter={24} style={{ background: '#fff' }}>
              <Col className="gutter-row" span={2}></Col>
              <Col className="gutter-row" >
              <Tabs defaultActiveKey="1">
                  <TabPane tab="Hotel" key="1">
                  <InputGroup compact>
                     <Input style={{ width: '40%' }} defaultValue="Hotel name"/>
                     <RangePicker style={{ width: '20%' }} onChange={this.handleChange}
                        defaultValue={[moment(tomorrow, dateFormat), moment(threeDaysFromTomorrow, dateFormat)]} />
                     <Popover placement="bottomLeft" content={content} trigger="click" span={10}>
                        <Row className="ant-input popover-center">
                           <Col xs={2} sm={4} md={10} lg={10} xl={10}>Room(s) x {roomCount}</Col>
                           <Col xs={2} sm={4} md={7} lg={7} xl={7}><Icon type="user" /> x {adultCount}</Col>
                           <Col xs={2} sm={4} md={7} lg={7} xl={7}><Icon type="user"/> x {childCount}</Col>
                        </Row>
                     </Popover>
                     <Button type="primary" onClick={this.handleClick}>Search</Button>
                  </InputGroup>

                  </TabPane>
                  <TabPane tab="Flights" key="2">

                  </TabPane>
               </Tabs>

               <MainBody id={id}/>

               </Col>
               <Col className="gutter-row" span={2}></Col>
               </Row>
           </Content>
         <MainFooter/>
         </Layout>
       )
    }
 }

 const Home = Form.create()(SearchForm);
 export default Home;
