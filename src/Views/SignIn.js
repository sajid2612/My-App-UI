import React, { Component } from 'react';
import {
     Form, Icon, Input, Button, Checkbox,
   } from 'antd';

  class NormalLoginForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: null,
        password: null
      }
    };
    this.setUserInfo = this.setUserInfo.bind(this);
  }
  setUserInfo(payload) {
    this.setState({
      userInfo: {
        email: payload.email,
        password: payload.password
      }
    });
  }
     handleSubmit = (e) => {
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values);
         }
       });
     }

     render() {
       const { getFieldDecorator } = this.props.form;
       return (
         <Form onSubmit={this.handleSubmit} className="login-form">
           <Form.Item>
             {getFieldDecorator('userName', {
               rules: [{ required: true, message: 'Please input your username!' }],
             })(
               <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
             )}
           </Form.Item>
           <Form.Item>
             {getFieldDecorator('password', {
               rules: [{ required: true, message: 'Please input your Password!' }],
             })(
               <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
             )}
           </Form.Item>
           <Form.Item>
             {getFieldDecorator('remember', {
               valuePropName: 'checked',
               initialValue: true,
             })(
               <Checkbox>Remember me</Checkbox>
             )}
             <a className="login-form-forgot" href="/forgotpassword">Forgot password</a>
             <Button type="primary" htmlType="submit" className="login-form-button" href = "/userdata">
               Log in
             </Button>
             Or <a href="/signup">register now!</a>
           </Form.Item>
         </Form>
       );
     }
   }

   const SignIn = Form.create()(NormalLoginForm);

export default SignIn;
