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

export default class MedCard extends React.Component {
  constructor(props) {
    super(props);

    var data = data_hardcode.assignments;

    this.state = {
      assignments: data,
      filteredAssignments: data,
      filters: {
        specification: [
          ...new Set(
            data.map((elem) => {
              return elem.specification;
            })
          ),
        ],
        name: [
          ...new Set(
            data.map((elem) => {
              return elem.name;
            })
          ),
        ],
        tag:
          "tag" in data
            ? [
                ...new Set(
                  data.map((elem) => {
                    return elem.tag;
                  })
                ),
              ]
            : [],
      },
    };
  }

  customFilter = (data, index, key, newFilters) => {
    if (index < 0) return data;
    return this.customFilter(
      data.filter((elem) => {
        console.log(newFilters[key[index]].includes(elem[key[index]]));
        console.log(elem[key[index]], newFilters[key[index]]);
        return elem[key[index]] === undefined
          ? true
          : newFilters[key[index]].includes(elem[key[index]]);
      }),
      index - 1,
      key,
      newFilters
    );
  };

  filterAssignments = (newFilters) => {
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key].length < 1) {
        newFilters[key] = this.state.filters[key];
        console.log(`All object is added to filter type:`, key);
      }
    });

    console.log(`New Filters`, newFilters);

    this.setState(
      {
        ...this.state,
        filteredAssignments: this.customFilter(
          this.state.assignments,
          Object.keys(newFilters).length - 1,
          Object.keys(newFilters),
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
