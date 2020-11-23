import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import NextButton from 'components/nextbutton'
import Field from 'components/field';


class Step1 extends Component {
    constructor(props){
        super(props);
        this.state = {selected : -1, values: {is_owner: null}}
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    change(index, value){
        this.setState({selected: index, values: {is_owner: value}, valid: false}, function(){
          this.props.updateForm(this.state.values);
          return this.props.nextStep();
        });
    }
    render() {
        return (<Form>
          <div key={`inline-radio`} className="mb-3 field">
            <Field index={0} active={this.state.selected == 0} grid="col-md-6" image="/house.png" text="Je suis propriétaire" value={true} onChange={this.change.bind(this)}></Field>
            <Field index={1} active={this.state.selected == 1} grid="col-md-6" image="/rent.png" text="Je suis locataire" value={false} onChange={this.change.bind(this)}></Field>
          </div>
          
          <NextButton valid={this.state.valid} value={this.state.values} updateForm={this.props.updateForm} {...this.props}/>
      </Form>)
    }
  }

export default Step1;