import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import getConfig from 'next/config';


const {publicRuntimeConfig, _} = getConfig();
const requiredFields = ["zip_code", "phone", "heat_system", "household_nb", "household_wage", "is_owner"];


class NextButton extends Component {
    constructor(props){
        super(props);
        this.state = {"disable_next": true};
    }
    componentDidUpdate(){
        var disable_next = false;
        for(var k in this.props.value)
            if(!this.props.value[k])
                disable_next = true;
        if (disable_next != this.state.disable_next)
            this.setState({"disable_next": disable_next});
    }
    nextStep(){
        this.props.updateForm(this.props.value);
        var toSend = {id: localStorage.getItem("uuid")}; 
    
        for(var val in this.props.value)
            if(requiredFields.includes(val))
                toSend[val] = this.props.value[val];
        
        if(Object.keys(toSend).length > 1)
            axios.post(publicRuntimeConfig.serverUrl + "/pac", toSend);

        return this.props.nextStep();
    }
    redirect(){
        window.location.replace("https://www.energie-durable.net");
    }
    render(){
        if (this.props.currentStep == 1 ){
            return (<div className="row next-button-wrapper">
                        <div className="col-md-12 text-center">
                            <Button className="next-button" variant="outline-primary" disabled={this.state.disable_next} onClick={this.nextStep.bind(this)}>Suivant</Button>
                        </div>
                    </div> )
        }
        else if(this.props.currentStep < this.props.totalSteps - 1){
                
            return ( <div className="row next-button-wrapper">
                        <div className="col-md-6 text-center">
                            <Button className="next-button" variant="outline-primary" onClick={this.props.previousStep}>Précédent</Button>
                        </div>
                        <div className="col-md-6 text-center">
                            <Button className="next-button" variant="outline-primary" disabled={this.state.disable_next} onClick={this.nextStep.bind(this)}>Suivant</Button>
                        </div>
                    </div>)
        }
        else if(this.props.currentStep == this.props.totalSteps - 1){
            return (<div className="row next-button-wrapper">
                <div className="col-md-6 text-center">
                    <Button className="next-button" variant="outline-primary" onClick={this.props.previousStep}>Précédent</Button>
                </div>
                <div className="col-md-6 text-center">
                    <Button className="next-button" variant="outline-primary" disabled={this.state.disable_next} onClick={this.nextStep.bind(this)}>Résultat</Button>
                </div>
            </div>)
        }
        else{
            return (<div className="row next-button-wrapper">
            <div className="col-md-6 text-center">
                <Button className="next-button" variant="outline-primary" onClick={this.redirect}>Retour vers notre site</Button>
            </div>
        </div>);
        }

    }
}

export default NextButton;