import React from "react";
import { Row, Col } from "react-bootstrap";
import { MedCardFilters } from "./MedCardFilters.js";
import { AddButton } from "../components/AddButton";
import { DatePicker } from "../components/DatePicker";

export function Filters(props) {
  const changeHandler = (selected) => {
    props.onFilterChange(selected);
  };

  const timeChangeHandler = (key, time) => {
    props.onDateFilterChange({ [key]: time });
  };

  return (
    <div class="container h-100 py-4">
      <div className="w-100">
        <div class="w-75 mx-auto d-flex">
          <div class="container m-0 p-0">
            <Row className="w-100 m-0">
              <Col className="mb-2 p-0">
                <DatePicker
                  placeholder="Start date"
                  label="From"
                  className="w-100"
                  onChange={timeChangeHandler}
                  keyFiled="startTime"
                  default="1900-01-01"
                />
              </Col>
            </Row>
            <Row className="w-100 m-0 pt-2">
              <Col className="mb-2 p-0">
                <DatePicker
                  placeholder="End date"
                  label="Till"
                  className="w-100"
                  onChange={timeChangeHandler}
                  keyFiled="endTime"
                  default={new Date()}
                />
              </Col>
            </Row>
          </div>
        </div>
        <MedCardFilters data={props.filters} onChange={changeHandler} />
      </div>

      <AddButton to="/assignment/add" className="addbtn-assignment text-light">
        <p class="text-center my-auto">+ Add Assignment</p>
      </AddButton>
      <AddButton to="/tag" className="addbtn-assignment text-light btn-info">
        <p class="text-center my-auto">Tags</p>
      </AddButton>
    </div>
  );
}
