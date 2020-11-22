import Step1 from "pages/step1";
import Step2 from "pages/step2";
import Step3 from "pages/step3";
import Step4 from "pages/step4";
import Step5 from "pages/step5";
import Results from "pages/results";
import Nav from "components/nav";
import StepWizard from 'react-step-wizard';
import React, {Component} from 'react';


let custom = {
  enterRight: 'your custom css transition classes',
  enterLeft : 'your custom css transition classes',
  exitRight : 'your custom css transition classes',
  exitLeft  : 'your custom css transition classes'
}


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {formValues: {}};
  }
  uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )}
  componentDidMount(){
    if (localStorage.getItem("uuid") === null) {
        localStorage.setItem("uuid", this.uuidv4());
    }
  }
  updateFormValues(values){
    var newValues  = this.state.formValues;
    for(var k in values)
      newValues[k] = values[k];
    this.setState({formValues: newValues});
  }
  render(){    
    return (
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-title"><p>Testez votre éligibilité</p></div>
            <StepWizard nav={<Nav />} transitions={custom}>
              <Step1 updateForm={this.updateFormValues.bind(this)}/>
              <Step2 updateForm={this.updateFormValues.bind(this)}/>
              <Step3 updateForm={this.updateFormValues.bind(this)}/>
              <Step4 updateForm={this.updateFormValues.bind(this)}/>
              <Step5 values={this.state.formValues} updateForm={this.updateFormValues.bind(this)}/>
              <Results values={this.state.formValues}/>
            </StepWizard>
        </div>
      </div>
    )
  }
}

export default Home;
