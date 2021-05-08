import React, { Component } from 'react';
import axios from 'axios';


import {
     Form,DatePicker, Modal,Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
   } from 'antd';

   const { Option } = Select;
   const AutoCompleteOption = AutoComplete.Option;
   const { TextArea, List} = Input;

   class UserData extends React.Component {
     state = {
       confirmDirty: false,
       email:"sak@gmail.com",
       user:{},
       autoCompleteResult: [],
     };


     updateUser = (e) => {

       e.preventDefault();
       this.props.form.validateFieldsAndScroll((err, values) => {
         const valuesFormatted = {
            ...values,
            'birthdate': values['birthdate'].format('YYYY-MM-DD'),
          };
         if (!err) {
           console.log('Received values of form and now sending to api for Updation: ', valuesFormatted);
           axios.post(`http://localhost:8080/update/${values.email}`,valuesFormatted)
             .then(function(response){
               console.log(response);
               const modalSuccess = Modal.success();
               modalSuccess.update({
                title: 'User Updation',
                content: 'User Updated Successfully!',
              });
               //Perform action based on response
           })
             .catch(function(error){
               console.log(error);
               const modalFailure = Modal.error();
               modalFailure.update({
                title: 'User Updation',
                content: 'User Updation Failed!',
              });
               //Perform action based on error
             });
         }
       });
     }

    componentDidMount() {
      axios.get(`http://localhost:8080/user/${this.state.email}`)
        .then(res => {
          const user = res.data;
          this.setState({ user });
          console.log(user);
        })
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
         <Form onSubmit={this.updateUser}>
           <Form.Item
             {...formItemLayout}
             label="Email">
             {getFieldDecorator('email', {
               initialValue:this.state.user.email,
               rules: [],
             })(
               <Input/>
             )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Personal Description"
           >
           {getFieldDecorator('description', {
             initialValue:this.state.user.personalDescription,
             rules: [],
           })(
            <TextArea rows={4}/>
           )}
         </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Country/Region"
           >
           {getFieldDecorator('country', {
             initialValue:this.state.user.country,
             rules: [],
           })(
             <Select>
              <Option value="1">India</Option>
              <Option value="2">Japan</Option>
              <Option value="3">Mongolia</Option>
            </Select>
           )}
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
              label="Birth Date"
            >
              {getFieldDecorator('birthdate', config)(
                <DatePicker style={{ width: '100%' }}/>
              )}
        </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Nickname"
           >
           {getFieldDecorator('nickname', {
             initialValue:this.state.user.nickName,
             rules: [{}],
           })(
          <Input/>
           )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Phone Number"
           >
           {getFieldDecorator('phone', {
             initialValue:this.state.user.phoneNumber,
             rules: [],
           })(
             <Input/>
           )}
           </Form.Item>
           <Form.Item
             {...formItemLayout}
             label="Website"
           >
           {getFieldDecorator('website', {
             initialValue:this.state.user.website,
             rules: [],
           })(
             <Input/>
           )}
           </Form.Item>
           <Form.Item {...tailFormItemLayout}>
             <Button type="primary" htmlType="submit">Update Information</Button>
           </Form.Item>
         </Form>

       );
     }
   }

   const user = Form.create({ name: 'userdata' })(UserData);

   export default user;
