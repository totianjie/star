import React, { Component } from 'react';

class Address extends Component {
    render(){
        const {address,color} = this.props;
        const style = {
            color
        };
        return (
            <section>
                <p style={style}>地址:{ address}</p>
            </section>
        );
    }
}

export default Address;