import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'
import Field from 'components/field';


class Step5 extends Component {
    constructor(props){
        super(props);
        this.targetMap = {1: "19074€", 2: "27896€", 3: "33547€", 4: "39192€", 5: "44860€"}
        this.state = {selected : -1, values: {household_wage: null}, targetNumber: this.targetMap[1]};
    }
    change(index, value){
        this.setState({selected: index, values: {household_wage: value}, valid: false}, function(){
            this.props.updateForm(this.state.values);
            return this.props.nextStep();  
        });
    }
    componentDidUpdate(){
        if(!("household_nb" in this.props.values)){
            return;
        }
        var newTarget = this.targetMap[this.props.values["household_nb"]];
        if(this.state.targetNumber != newTarget){
            this.setState({targetNumber: newTarget});
        }
    }
    render() {
        return (<Form>
          <div key={`inline-radio`} className="mb-3 field">
            <Field index={0} active={this.state.selected == 0} grid="col-md-6" image="/minus.png" text={"Je déclare moins de " + this.state.targetNumber} value={"-" + this.state.targetNumber} onChange={this.change.bind(this)}></Field>
            <Field index={1} active={this.state.selected == 1} grid="col-md-6" image="/add.png" text={"Je déclare plus de " + this.state.targetNumber} value={"+" + this.state.targetNumber} onChange={this.change.bind(this)}></Field>
          </div>
          <NextButton valid={this.state.valid} updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
      </Form>)
    }
  }

export default Step5;