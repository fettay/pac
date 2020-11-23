import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'
import Field from 'components/field';


class Step4 extends Component {
    constructor(props){
        super(props);
        this.state = {selected : -1, values: {household_nb : null}}
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    change(index, value){
      this.setState({selected: index, values: {household_nb: value}}, function(){
        this.props.updateForm(this.state.values);
        return this.props.nextStep();
      });
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render() {
        return (<Form>
          <div key={`inline-radio`} className="mb-3 field">
            <Field index={0} active={this.state.selected == 0} grid="col-md-6" image="/man.png" text="Je suis seul sur ma fiche d'imposition" value="1" onChange={this.change.bind(this)}></Field>
            <Field index={1} active={this.state.selected == 1} grid="col-md-6" image="/parents.png" text="Nous sommes 2 sur ma fiche d'imposition" value="2" onChange={this.change.bind(this)}></Field>
            <Field index={2} active={this.state.selected == 2} grid="col-md-6" image="/family3.png" text="Nous sommes 3 sur ma fiche d'imposition" value="3" onChange={this.change.bind(this)}></Field>
            <Field index={3} active={this.state.selected == 3} grid="col-md-6" image="/family4.png" text="Nous sommes 4 sur ma fiche d'imposition" value="4" onChange={this.change.bind(this)}></Field>
            <Field index={4} active={this.state.selected == 4} grid="col-md-12" image="/family5.png" text="Nous sommes 5 ou plus sur ma fiche d'imposition" value="5" onChange={this.change.bind(this)}></Field>
          </div>
          <NextButton updateForm={this.props.updateForm} value={this.state.values} {...this.props}/>
      </Form>)
    }
  }

export default Step4;