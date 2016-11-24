import React,{Component} from 'react';

class DemoComponent extends Component{

    //这样就不会报错了
    handleClick=()=>{
        console.log('----')
    }

    render(){
        return <h1 onClick={this.handleClick}>Hello World</h1>
    }
}