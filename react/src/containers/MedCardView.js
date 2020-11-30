import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Assignment from "../components/Assignment.js";
import { SideNavBar } from "../components/SideBar.js";

const data_hardcode = {
  assignments: [
    {
      name: "Name",
      specification: "specification",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "01/03/03",
      creator: "Name Surame",
    },
    {
      name: "Name",
      specification: "specification1",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "02/03/03",
      creator: "Name Surame",
    },
    {
      name: "Name1",
      specification: "specification",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "03/03/03",
      creator: "Name Surame",
    },
  ],
};

const filters_names = ["specification", "name", "tag"];

export default class MedCard extends React.Component {
  constructor(props) {
    super(props);

    var data = data_hardcode.assignments;

    this.state = {
      assignments: data,
      filteredAssignments: data,
      filters: filters_names.map((field) => {
        return { [field]: this.createFilters(field, data) };
      }),
    };
    console.log(this.state.filters);
  }

  createFilters = (field, data) => {
    //console.log(data, field);
    if (data.length < 1) return [];
    return [field] in data[0]
      ? [
          ...new Set(
            data.map((elem) => {
              //console.log(elem.field);
              return elem[field];
            })
          ),
        ]
      : [];
  };

  customFilter = (data, filters) => {
    console.log("Filtering assignments with next filters", filters);
    filters.forEach((filter_elem, index) => {
      data = data.filter((elem) => {
        // console.log("Filtering", elem[filters_names[index]], filter_elem);
        // console.log("Data: ", data);
        return elem[filters_names[index]] === undefined
          ? true
          : filter_elem[filters_names[index]].includes(
              elem[filters_names[index]]
            );
      });
    });
    return data;
  };

  filterAssignments = (newFilters) => {
    console.log(`New Filters`, newFilters);
    newFilters.forEach((filter, index) => {
      if (filter[filters_names[index]].length < 1) {
        newFilters[index] = this.state.filters[index];
        console.log(
          `All object is restore for filter type:`,
          filters_names[index]
        );
      }
    });

    this.setState(
      {
        ...this.state,
        filteredAssignments: this.customFilter(
          this.state.assignments,
          newFilters
        ),
      },
      () => {
        console.log(`Filtered state `, this.state.filteredAssignments);
      }
    );
  };

  render() {
    return (
      <>
        <SideNavBar
          filters={this.state.filters}
          onFilterChange={this.filterAssignments}
        />
        <Container fluid className="vh-100-c">
          <Row>
            <Col xs={3} id="sidebar-wrapper"></Col>
            <Col xs={9} id="page-content-wrapper">
              <p class="h1 m-4 mt-5">Assignments</p>
              {this.state.filteredAssignments.length > 0 ? (
                this.state.filteredAssignments.map((assignment, i) => {
                  return <Assignment key={i} assignment={assignment} />;
                })
              ) : (
                <p class="h4 mt-5 pt-4 text-secondary">
                  No assignments found 🙁
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
