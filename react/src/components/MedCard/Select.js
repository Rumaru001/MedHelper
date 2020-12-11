import React from "react";
import Select from "react-select";
import { Convert_to, Convert_from } from "../../adapters/SelectAdatper";

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#6c757d" : null,
      color: isFocused ? "#f8f9fa" : "#6c757d",
    };
  },
};

export class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.selectedOption,
      options: Convert_to(props.options),
    };
  }

  handleChange = (selectedOption) => {
    this.props.onChange(this.props.field_index, Convert_from(selectedOption));
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
          isMulti={true}
          isClearable={true}
          placeholder={this.props.placeholder}
          className={`w-75 mx-auto text-dark ${this.props.className}`}
          isSearchable={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary25: "grey",
              primary: "black",
            },
          })}
          styles={colourStyles}
        />
      </>
    );
  }
}
