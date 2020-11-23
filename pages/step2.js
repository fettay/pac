import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'
import Field from 'components/field';


class Step2 extends Component {
    constructor(props){
        super(props);
        this.state = {selected : -1, values: {heat_system : null}, valid: false}
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    componentDidUpdate(){
      if(this.props.isActive)
        this.props.ga.pageview("step2");
    }
    change(index, value){
      this.setState({selected: index, values: {heat_system: value}, valid: true}, function(){
        this.props.updateForm(this.state.values);
        return this.props.nextStep();
      });
    }
    render() {
        return (<Form>
          <div key={`inline-radio`} className="mb-3 field">
            <Field index={0} active={this.state.selected == 0} grid="col-md-6" image="/jerrycan.png" text="Je me chauffe au fioul" value="fioul" onChange={this.change.bind(this)}></Field>
            <Field index={1} active={this.state.selected == 1} grid="col-md-6" image="/gas.png" text="Je me chauffe au gaz" value="gaz" onChange={this.change.bind(this)}></Field>
            <Field index={2} active={this.state.selected == 2} grid="col-md-6" image="/wood.png" text="Je me chauffe au bois" value="bois" onChange={this.change.bind(this)}></Field>
            <Field index={3} active={this.state.selected == 3} grid="col-md-6" image="/lightning.png" text="Je me chauffe à l'éléctrique" value="electrique" onChange={this.change.bind(this)}></Field>
            <Field index={4} active={this.state.selected == 4} grid="col-md-12" image="/question-mark.png" text="Je ne sais pas" value="nsp" onChange={this.change.bind(this)}></Field>
          </div>
          <NextButton valid={this.state.valid} updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
      </Form>)
    }
  }

export default Step2;