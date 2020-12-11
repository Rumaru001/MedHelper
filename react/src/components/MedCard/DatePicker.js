import React from "react";
import { Button } from "react-bootstrap";

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
    };
  }
  dateConverter(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  handleClick(e) {
    this.setState(
      {
        date: e.target.value,
      },

      () => {
        this.props.onChange(this.props.keyFiled, this.state.date);
      }
    );
  }

  render() {
    return (
      <>
        <div className={`${this.props.className}`}>
          <label className="w-100 text-center">{this.props.label}</label>
          <div className="d-flex">
            <input
              type="date"
              name="date"
              className="form-control datePicker"
              value={this.state.date}
              placeholder="yyyy-mm-dd"
              onChange={(e) => {
                this.handleClick(e);
              }}
            ></input>
            <Button
              variant="light"
              className="w-20"
              onClick={() => {
                this.setState(
                  {
                    date: "",
                  },

                  () => {
                    this.props.onChange(
                      this.props.keyFiled,
                      this.props.default
                    );
                  }
                );
              }}
            >
              x
            </Button>
          </div>
        </div>
      </>
    );
  }
}
