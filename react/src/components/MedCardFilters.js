import React from "react";
import { SelectInput } from "./Select";

export class MedCardFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.data.map((filter) => {
        var name = Object.keys(filter)[0];
        return { [name]: [] };
      }),
    };
  }

  handleChange = (index, value) => {
    let copySelected = this.state.selected;
    var name = Object.keys(this.props.data[index])[0];
    copySelected[index] = { [name]: value };
    this.setState({ selected: copySelected }, () => {
      //console.log(`State:`, this.state);
      this.props.onChange(this.state.selected);
    });
  };

  render() {
    return (
      <>
        <div class="container my-4 py-2">
          {this.props.data.map((filter, index) => {
            var name = Object.keys(filter)[0];
            //console.log("Filters", filter, name);
            return (
              <SelectInput
                selectedOption={this.state.selected[index][name]}
                options={filter[name]}
                placeholder={name}
                className="m-2 "
                onChange={this.handleChange}
                field_index={index}
              />
            );
          })}
        </div>
      </>
    );
  }
}
