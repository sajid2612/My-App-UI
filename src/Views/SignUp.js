import React, { Component } from 'react';
import axios from 'axios';


import {
     Form,DatePicker,Avatar, Input,Modal, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
   } from 'antd';

   const { Option } = Select;
   const AutoCompleteOption = AutoComplete.Option;
   const { TextArea, List} = Input;
   const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
   const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
   const config = {
     rules: [{ type: 'object', required: true, message: 'Please select birthdate!' }],
   };
   const residences = [{
     value: 'zhejiang',
     label: 'Zhejiang',
     children: [{
       value: 'hangzhou',
       label: 'Hangzhou',
       children: [{
         value: 'xihu',
         label: 'West Lake',
       }],
     }],
   }, {
     value: 'jiangsu',
     label: 'Jiangsu',
     children: [{
       value: 'nanjing',
       label: 'Nanjing',
       children: [{
         value: 'zhonghuamen',
         label: 'Zhong Hua Men',
       }],
     }],
   }];

   class RegistrationForm extends React.Component {
     state = {
       confirmDirty: false,
       autoCompleteResult: [],
       user: UserList[0],
       color: colorList[0],
     };

     changeUser = () => {
       const index = UserList.indexOf(this.state.user);
       this.setState({
         user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
         color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
       });
     }
     handleSubmit = (e) => {
       e.preventDefault();
       this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
           const valuesFormatted = {
              ...values,
              'birthdate': values['birthdate'].format('YYYY-MM-DD'),
            };
           console.log('Received values of form and now sending to api: ', valuesFormatted);
           axios.post('http://localhost:8080/user', valuesFormatted)
             .then(function(response){
               console.log(response);
               const modalSuccess = Modal.success();
               modalSuccess.update({
                title: 'User Registration',
                content: 'User Created Successfully!',
              });
               //Perform action based on response
           })
             .catch(function(error){
               console.log(error);
               const modalFailure = Modal.error();
               modalFailure.update({
                title: 'User Registration',
                content: 'User Creation Failed!',
              });
               //Perform action based on error
             });
         }
       });
     }

     handleConfirmBlur = (e) => {
       const value = e.target.value;
       this.setState({ confirmDirty: this.state.confirmDirty || !!value });
     }

     compareToFirstPassword = (rule, value, callback) => {
       const form = this.props.form;
       if (value && value !== form.getFieldValue('password')) {
         callback('Two passwords that you enter is inconsistent!');
       } else {
         callback();
       }
     }

     validateToNextPassword = (rule, value, callback) => {
       const form = this.props.form;
       if (value && this.state.confirmDirty) {
         form.validateFields(['confirm'], { force: true });
       }
       callback();
     }

     handleWebsiteChange = (value) => {
       let autoCompleteResult;
       if (!value) {
         autoCompleteResult = [];
       } else {
         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
       }
       this.setState({ autoCompleteResult });
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
       const prefixSelector = getFieldDecorator('prefix', {
         initialValue: '86',
       })(
         <Select style={{ width: 70 }}>
           <Option value="86">+86</Option>
           <Option value="87">+87</Option>
         </Select>
       );

       const websiteOptions = autoCompleteResult.map(website => (
         <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
       ));

       return (
         <Form onSubmit={this.handleSubmit}>
           <Form.Item {...formItemLayout}
           label="Upload Avatar">
           <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
             {this.state.user}
           </Avatar>
           <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} onClick={this.changeUser}>
             Change
           </Button>
          </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Email"
           >
             {getFieldDecorator('email', {
               rules: [{
                 type: 'email', message: 'The input is not valid E-mail!',
               }, {
                 required: true, message: 'Please input your E-mail!',
               }],
             })(
               <Input />
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Password"
           >
             {getFieldDecorator('password', {
               rules: [{
                 required: true, message: 'Please input your password!',
               }, {
                 validator: this.validateToNextPassword,
               }],
             })(
               <Input type="password" />
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Confirm Password"
           >
             {getFieldDecorator('confirm', {
               rules: [{
                 required: true, message: 'Please confirm your password!',
               }, {
                 validator: this.compareToFirstPassword,
               }],
             })(
               <Input type="password" onBlur={this.handleConfirmBlur} />
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Personal Description"
           >
           {getFieldDecorator('description', {
             rules: [{
               required: false, message: 'Please provide your personal description!',
             }],
           })(
             <TextArea rows={4} />
           )

         }

           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Country/Region"
           >
           {getFieldDecorator('country', {
             rules: [{
               required: false, message: 'Please provide your Country !',
             }],
           })(
             <Select d>
              <Option value="1">India</Option>
              <Option value="2">Japan</Option>
              <Option value="3">Mongolia</Option>
            </Select>
           )

         }

           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="City/Province"
           >
           {getFieldDecorator('city', {
             initialValue:this.state.user.city,
             rules: [{}],
           })(
          <Input/>
           )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Street Address"
           >
           {getFieldDecorator('street', {
             initialValue:this.state.user.street,
             rules: [{}],
           })(
          <Input/>
           )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label={(
               <span>
                 Nickname&nbsp;
                 <Tooltip title="What do you want others to call you?">
                   <Icon type="question-circle-o" />
                 </Tooltip>
               </span>
             )}
           >
             {getFieldDecorator('nickname', {
               rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
             })(
               <Input />
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Habitual Residence"
           >
             {getFieldDecorator('residence', {
               initialValue: ['zhejiang', 'hangzhou', 'xihu'],
               rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
             })(
               <Cascader options={residences} />
             )}
           </Form.Item>
           <Form.Item
              {...formItemLayout}
              label="Birth Date"
            >
              {getFieldDecorator('birthdate', config)(
                <DatePicker style={{ width: '100%' }}/>
              )}
        </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Phone Number"
           >
             {getFieldDecorator('phone', {
               rules: [{ required: true, message: 'Please input your phone number!' }],
             })(
               <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Website"
           >
             {getFieldDecorator('website', {
               rules: [{ required: true, message: 'Please input website!' }],
             })(
               <AutoComplete
                 dataSource={websiteOptions}
                 onChange={this.handleWebsiteChange}
                 placeholder="website"
               >
                 <Input />
               </AutoComplete>
             )}
           </Form.Item>

           <Form.Item {...tailFormItemLayout}>
             {getFieldDecorator('agreement', {
               valuePropName: 'checked',
             })(
               <Checkbox>I have read the <a href="">agreement</a></Checkbox>
             )}
           </Form.Item>
           <Form.Item {...tailFormItemLayout}>
             <Button type="primary" htmlType="submit">Register</Button>
           </Form.Item>
           <Form.Item {...tailFormItemLayout}>
             <Button  type="primary" htmlType="submit"  href = "/SignIn">Login</Button>
           </Form.Item>
         </Form>

       );
     }
   }

   const SignUp = Form.create({ name: 'register' })(RegistrationForm);

   export default SignUp;
