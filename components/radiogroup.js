import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'; 
import Image from 'next/image'
import Field from 'components/field';


class RadioGroup extends Component {
    constructor(props){
        super(props);
        this.fields = props.fields;
        this.state = {selected: -1};
        for(var i=0; i<this.fields.length; i++){
            this.fields[i].index = i;
        }
        // this.elements = {0: React.createRef(), 1: React.createRef()}
    }
    change(index){
        this.setState({selected: index});
    }
    render() {
        return (<Form>
          <div key={`inline-radio`} className="mb-3 field">
            {fields}
          </div>
      </Form>)
    }
  }

export default RadioGroup;