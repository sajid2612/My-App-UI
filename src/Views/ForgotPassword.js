import React, { Component } from 'react';
import axios from 'axios';


import {
     Form,DatePicker, Modal,Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
   } from 'antd';

   const { Option } = Select;
   const AutoCompleteOption = AutoComplete.Option;
   const { TextArea, List} = Input;

   class ForgotPassword extends React.Component {
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

     compareToFirstEmail = (rule, value, callback) => {
       const form = this.props.form;
       if (value && value !== form.getFieldValue('email')) {
         callback('Emails  that you enter is inconsistent!');
       } else {
         callback();
       }
     }

     validateToNextEmail = (rule, value, callback) => {
       const form = this.props.form;
       if (value && this.state.confirmDirty) {
         form.validateFields(['confirmemail'], { force: true });
       }
       callback();
     }
     sendLink = (e) => {
       e.preventDefault();
       this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
           const valuesFormatted = {
              ...values,
              'email': values['email'],
              'confirmemail':values['confirmemail'],
            };
            if(valuesFormatted.email = valuesFormatted.confirmemail){
              const modalSuccess1 = Modal.success();
              modalSuccess1.update({
               title: 'Send Email',
               content: 'Email with passowrd reset link sent successfully',
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
       const config = {
         rules: [{ type: 'object', required: true, message: 'Please select birthdate!' }],
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
         <Form onSubmit={this.sendLink}>
           <Form.Item
             {...formItemLayout}
             label="Email">
             {getFieldDecorator('email', {
               rules: [{
                 type: 'email', message: 'The input is not valid E-mail!',
               }, {
                 required: true, message: 'Please input your E-mail!',
               },{
                 validator: this.validateToNextEmail,
               }]
             })(
               <Input style={{ width: '60%' }}/>
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Confirm Email"
           >
           {getFieldDecorator('confirmemail', {
             rules: [{
               type: 'email', message: 'The input is not valid E-mail!',
             }, {
               required: true, message: 'Please input your E-mail!',
             },{
               validator: this.compareToFirstEmail,
             }]
           })(

            <Input style={{ width: '60%' }} onBlur={this.handleConfirmBlur}/>
           )}
         </Form.Item>
           <Form.Item {...tailFormItemLayout}>
            <Button  type="primary" htmlType="submit">Send Link</Button>
           </Form.Item>
         </Form>

       );
     }
   }

   const forgotPassword = Form.create({ name: 'forgot' })(ForgotPassword);

   export default forgotPassword;
