import React, { Component } from 'react';
import axios from 'axios';


import {
     Form, Modal,Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
   } from 'antd';

   const { Option } = Select;
   const AutoCompleteOption = AutoComplete.Option;
   const { TextArea, List} = Input;

   class RecoverPassword extends React.Component {
     state = {
       confirmDirty: false,
       email:"sak@gmail.com",
       user:{},
       autoCompleteResult: [],
     };

     handleConfirmBlur = (e) => {
       const value = e.target.value;
       this.setState({ confirmDirty: this.state.confirmDirty || !!value });
     }

     compareToFirstPassword = (rule, value, callback) => {
       const form = this.props.form;
       if (value && value !== form.getFieldValue('password')) {
         callback('Passwords that you entered is inconsistent!');
       } else {
         callback();
       }
     }

     validateToNextPassword = (rule, value, callback) => {
       const form = this.props.form;
       if (value && this.state.confirmDirty) {
         form.validateFields(['confirmpassword'], { force: true });
       }
       callback();
     }
     recoverPassword = (e) => {
       e.preventDefault();
       this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
           const valuesFormatted = {
              ...values,
              'password': values['password'],
              'confirmpassword':values['confirmpassword'],
            };
            if(valuesFormatted.password = valuesFormatted.confirmpassword){
              /*
                Call API to change the Password against the email id.
              */
              const modalSuccess1 = Modal.success();
              modalSuccess1.update({
               title: 'Password Reset',
               content: 'Password Changed successfully',
             });
            }
          }
       });
     }


     render() {
       const { getFieldDecorator } = this.props.form;
       const { autoCompleteResult } = this.state;
       const formItemLayout = {
         labelCol: {
           xs: { span: 24 },
           sm: { span: 8 },
         },
         wrapperCol: {
           xs: { span: 24 },
           sm: { span: 16 },
         },
       };

       const tailFormItemLayout = {
         wrapperCol: {
           xs: {
             span: 24,
             offset: 0,
           },
           sm: {
             span: 16,
             offset: 8,
           },
         },
       };

       return (
         <Form onSubmit={this.recoverPassword}>
           <Form.Item
             {...formItemLayout}
             label="Password">
             {getFieldDecorator('password', {
               rules: [
                 {
                 required: true, message: 'Please input your new password',
                },{
                 validator: this.validateToNextPassword,
               }]
             })(
               <Input type="password" style={{ width: '60%' }}/>
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Confirm Password"
           >
           {getFieldDecorator('confirmpassword', {
             rules: [ {
               required: true, message: 'Please input your new password again',
             },{
               validator: this.compareToFirstPassword,
             }]
           })(

            <Input type = "password" style={{ width: '60%' }} onBlur={this.handleConfirmBlur}/>
           )}
         </Form.Item>
           <Form.Item {...tailFormItemLayout}>
            <Button  type="primary" htmlType="submit">Reset Password</Button>
           </Form.Item>
         </Form>

       );
     }
   }

   const recoverPassword = Form.create({ name: 'recoverPassword' })(RecoverPassword);

   export default recoverPassword;
