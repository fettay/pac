import Image from 'next/image'
import React, {Component} from 'react'

class Field extends Component {
    constructor(props) {
        super(props);
        this.grid = props.grid;
        this.radio = React.createRef();
        this.onChangeValue = this.onChangeValue.bind(this);
        this.state = {activeClass: "", value:props.value, text: props.text, image: props.image};
    }
    onChangeValue() {
        this.props.onChange(this.props.index, this.props.value);
    }
    componentDidUpdate(prevProps){
        if(JSON.stringify(this.props) != JSON.stringify(prevProps)){
            this.setState({activeClass: this.props.active ? " active" : "",
                           value: this.props.value,
                           text: this.props.text,
                           image: this.props.image});
        }
    }
    render() { 
        return(
            <label className={this.grid + this.state.activeClass}>
            <input ref={this.radio} className="radio-field" type="radio" name="test" value={this.state.value}  onChangeCapture={this.onChangeValue}/>
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                }}
            >
                <Image src={this.state.image} width="128" height="128" />
            </div>
            <p>{this.state.text}</p>
            </label>
        );  
    }
}

export default Field;