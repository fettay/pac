import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton';


class Step3 extends Component {
    constructor(props){
        super(props);
        this.validations = {email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                            zip_code: /^\d{5}/};
        this.state = {values: {phone : "", zip_code: "", email: ""}, valid: false};
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    change(e){
        var values = this.state.values;
        var validations = this.validations;
        values[e.target.name] = e.target.value;
        this.setState({values: values});
        var hasEmpty = Object.keys(values).some(function(k) {
            if(k in validations)
                return !validations[k].test(values[k]);
            return values[k] == "";
        });
        if(!hasEmpty){
            this.setState({valid: true});
            this.props.updateForm(values);
            this.props.ga.event({
              category: 'User',
              action: 'User filled personal data'
            });
            // return this.props.nextStep();
        }
        else{
            this.setState({valid: false});
        }
    }
    componentDidUpdate(){
        if(this.props.isActive)
          this.props.ga.pageview("step3");
    }
    checkValid(e){
        var key = e.target.name;
        if(key in this.validations && !this.validations[key].test(e.target.value)){
            e.target.classList.add("invalid");
        }
        else{
            e.target.classList.remove("invalid");
        }
    }
    render() {
        return (<Form>
            <div class="input-wrapper">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" placeholder="contact@energie-durable.net" onBlur={this.checkValid.bind(this)} onChange={this.change.bind(this)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Numéro de mobile:</Form.Label>
                    <Form.Control type="phone" name="phone" placeholder="0612345678" onBlur={this.checkValid.bind(this)} onChange={this.change.bind(this)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Code postal:</Form.Label>
                    <Form.Control type="text" name="zip_code" placeholder="01234" onBlur={this.checkValid.bind(this)} onChange={this.change.bind(this)}/>
                </Form.Group>
            </div>
            <NextButton valid={this.state.valid} updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
      </Form>)
    }
  }

export default Step3;