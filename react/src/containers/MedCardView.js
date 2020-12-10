import React from "react";
import Base from "../components/Base";
import { Assignment } from "../components/Assignment.js";
import { Filters } from "../components/Filters";
import axiosInstance from "../axiosApi";

const data_hardcode = {
  assignments: [
    {
      id: 0,
      name: "Name",
      specification: "specification",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "01-12-2020",
      creator: "Name Surame",
    },
    {
      id: 1,
      name: "Name",
      specification: "specification1",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "05-11-2020",
      creator: "Name Surame",
    },
    {
      id: 2,
      name: "Name1",
      specification: "specification",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "04-12-2019",
      creator: "Name Surame1",
    },
  ],
};

const filters_names = ["specification", "name", "tag", "creator", "editor"];

export default class MedCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async getData() {
    try {
      console.log(localStorage);

      let response = await axiosInstance.get("assignment/");

      const data = response.data.assignments;

      var filters = filters_names.map((field) => {
        return { [field]: this.createFilters(field, data) };
      });
      var dateFilter = { startTime: "1900-01-01", endTime: new Date() };
      this.setState({
        loading: false,
        assignments: data,
        filteredAssignments: data,
        filters: [...filters],
        defaultFilters: [...filters],
        dateFilters: { ...dateFilter },
        defaultDateFilters: { ...dateFilter },
      });
      return data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }
  componentDidMount() {
    console.log(this.getData());
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

  customFilter = (
    data = this.state.assignments,
    filters = this.state.filters,
    dateFilters = this.state.dateFilters
  ) => {
    console.log(
      "Filtering assignments with next filters",
      filters,
      dateFilters
    );
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

    var from = new Date(dateFilters.endTime);
    var till = new Date(dateFilters.startTime);

    console.log(from, till);

    data = data.filter((elem) => {
      var date = new Date(elem.date);
      console.log(date, from <= date, date <= till);
      return !(from <= date) && !(date <= till);
    });

    this.setState(
      {
        ...this.state,
        filteredAssignments: data,
      },
      () => {
        console.log(`Assignments updated`, this.state.filteredAssignments);
      }
    );

    return data;
  };

  filterAssignments = (newFilters) => {
    console.log(`New Filters`, newFilters);
    newFilters.forEach((filter, index) => {
      if (filter[filters_names[index]].length < 1) {
        newFilters[index] = this.state.defaultFilters[index];
        console.log(
          `All object is restore for filter type:`,
          filters_names[index]
        );
      }
    });

    this.setState(
      {
        ...this.state,
        filters: newFilters,
      },
      () => {
        console.log(`FiltersUpdated`, this.state.filters);
        this.customFilter();
      }
    );
  };

  filterByDate = (dateFilter) => {
    var key = Object.keys(dateFilter);
    var dateFromState = this.state.dateFilters;
    dateFromState[key] = dateFilter[key];

    this.setState(
      {
        ...this.state,
        dateFilters: dateFromState,
      },
      () => {
        console.log(`DateFilterUpdated`, this.state.dateFilters);
        this.customFilter();
      }
    );
  };

  restoreDefaultDateFilter = () => {
    this.setState(
      {
        ...this.state,
        dateFilters: { ...this.state.defaultDateFilters },
      },
      () => {
        this.customFilter();
      }
    );
  };

  render() {
    return this.state.loading ? (
      "Loading...."
    ) : (
      <>
        <Base
          sidebar={
            <Filters
              filters={this.state.defaultFilters}
              onFilterChange={this.filterAssignments}
              onDateFilterChange={this.filterByDate}
              restoreDateFilter={this.restoreDefaultDateFilter}
            />
          }
          main={
            <>
              <p class="h1 m-4 mt-5 text-center">Assignments</p>
              {this.state.filteredAssignments.length > 0 ? (
                this.state.filteredAssignments.map((assignment, i) => {
                  return <Assignment key={i} assignment={assignment} />;
                })
              ) : (
                <p class="h4 mt-5 pt-4 text-secondary text-center">
                  No assignments found 🙁
                </p>
              )}
            </>
          }
        />
      </>
    );
  }
}
