import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'
import Field from 'components/field';
import axios from 'axios';
import getConfig from 'next/config';


const {publicRuntimeConfig, _} = getConfig()


class Results extends Component {
    constructor(props){
        super(props);
        this.state = {isEligible: null};
    }
    change(){
        return;
    }
    isEligible(){
        var eligible = false;
        if(this.props.values["household_wage"].startsWith("-"))
            eligible = true;
        return eligible;
    }
    componentDidUpdate(){
        if (!this.props.isActive)
            return 
        var eligible = this.isEligible();
        if(this.state.isEligible != eligible){
            this.setState({isEligible: eligible});
            axios.post(publicRuntimeConfig.serverUrl + "/pac", {
                eligible: eligible,
                id: localStorage.getItem("uuid")
            });
        }
    }
    render() {
        if(this.state.isEligible === null){
            return (<Form>
                <div key={`inline-radio`} className="mb-3 field">
                  <Field index={10} active={this.state.selected == 0} grid="col-md-12" image="/confetti.png" text="Félicitations, vous êtes éligible. Nos équipes vous contacterons dans les plus brefs délais." value="" onChange={this.change}></Field>
                </div>
                <NextButton updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
            </Form>)
        }
        else if(this.state.isEligible){
            return (<Form>
                <div key={`inline-radio`} className="mb-3 field">
                  <Field index={10} active={this.state.selected == 0} grid="col-md-12" image="/confetti.png" text="Félicitations, vous êtes éligible. Nos équipes vous contacterons dans les plus brefs délais." value="" onChange={this.change}></Field>
                </div>
                <NextButton updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
            </Form>)
        }
        else{
            return (<Form>
                <div key={`inline-radio`} className="mb-3 field">
                  <Field index={10} active={this.state.selected == 0} grid="col-md-12" image="/sad.png" text="Malheureusement vous n'êtes pas éligibles. N'hésitez pas à envoyer vos questions à contact@energie-durable.net ." value="" onChange={this.change}></Field>
                </div>
                <NextButton updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
            </Form>)
        }
 
    }
  }

export default Results;
