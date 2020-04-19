import React, { Component } from 'react';

class Memo extends Component {
    render() {
        return (
            <div>
                <div>{this.props.id}</div>
                <div><img src={this.props.image} alt={this.props.title}></img></div>
                <div type="text" value={this.props.title}>타이틀:{this.props.title}</div>
                <div type="textarea" value={this.props.content}>내용:{this.props.content}</div>
            </div>
        )
    }
}

export default Memo;