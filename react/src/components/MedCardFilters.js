import React from "react";
import { SelectInput } from "./Select";

export class MedCardFilters extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selected: {
        specification: [],
        name: [],
        tag: [],
      },
    };
  }

  handleChange = (field, value) => {
    let copySelected = { ...this.state.selected, [field]: value };
    this.setState({ selected: copySelected }, () => {
      console.log(`State:`, this.state);
      this.props.onChange(this.state.selected);
    });
  };

  render() {
    return (
      <>
        <div class="container my-4 py-2">
          <SelectInput
            selectedOption={this.state.selected.specification}
            options={this.props.data.specification}
            placeholder="Specification"
            className="m-2 "
            onChange={this.handleChange}
            fieldName="specification"
          />
          <SelectInput
            selectedOption={this.state.selected.name}
            options={this.props.data.name}
            placeholder="Name"
            className="my-2"
            onChange={this.handleChange}
            fieldName="name"
          />
          <SelectInput
            selectedOption={this.state.selected.tag}
            options={this.props.data.tag}
            placeholder="Tag"
            className="my-2"
            onChange={this.handleChange}
            fieldName="tag"
          />
        </div>
      </>
    );
  }
}
