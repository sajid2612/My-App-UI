import React, { Component } from 'react';

export default class MainBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
        };
        console.log(props.id);
    }
    componentDidMount() {
        console.log(this.props.id);
    }

    componentDidUpdate() {
        console.log(this.props.id);

    }
    
    refresh = function(id) {
        console.log(id);
        console.log("MainBody refresh is called");
    }

    render () {
        const id = this.props.id;                                   
       return (
         <main>Body {id}</main>
       )
    }
 }