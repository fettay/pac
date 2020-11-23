import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'


class Step3 extends Component {
    constructor(props){
        super(props);
        this.state = {values: {phone : null, zip_code: null}}
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    change(e){
        var values = this.state.values;
        values[e.target.name] = e.target.value;
        this.setState({values: values});
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render() {
        return (<Form>
            <div class="input-wrapper">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Numéro de portable</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="0601123435" onChange={this.change.bind(this)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control type="number" name="zip_code" placeholder="75001" onChange={this.change.bind(this)}/>
                </Form.Group>
                <Form.Text className="text-muted">
                    Pour vérifier votre éligibilité    
                </Form.Text>
            </div>
            <NextButton updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
      </Form>)
    }
  }

export default Step3;