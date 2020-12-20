import React from "react";

import Base from "../../components/Main/Base";
import { Assignment } from "../../components/MedCard/Assignment.js";
import { Filters } from "../../components/MedCard/Filters";
import axiosInstance from "../../axiosApi";
import { Loading } from "../../components/loading";
import { BaseBar } from "../../components/Main/BaseBar";

const filters_names = ["specification", "name", "tag", "creator"];

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
        return {
          [field]: this.createFilters(field, data),
        };
      });
      console.log(filters);
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
      if (error.response.status === 401) {
        this.props.history.push("/login");
      }
      throw error;
    }
  }

  componentDidMount() {
    console.log(this.getData());
  }

  createFilters = (field, data) => {
    console.log(data, field);
    if (data.length < 1) return [];
    return [field] in data[0]
      ? [
          ...new Set(
            data.map((elem) => {
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
      data,
      filters,
      dateFilters
    );
    filters.forEach((filter_elem, index) => {
      data = data.filter((elem) => {
        // console.log("Filtering", elem[filters_names[index]], filter_elem);
        // // console.log("Data: ", data);
        // console.log(
        //   "result",
        //   elem[filters_names[index]] === undefined ||
        //     elem[filters_names[index]] === null
        //     ? true
        //     : filter_elem[filters_names[index]].includes(
        //         elem[filters_names[index]]
        //       )
        // );
        return elem[filters_names[index]] === undefined
          ? true
          : filter_elem[filters_names[index]].includes(
              elem[filters_names[index]]
            );
      });
      // console.log("Data: ", data);
    });

    var from = new Date(dateFilters.endTime);
    var till = new Date(dateFilters.startTime);

    data = data.filter((elem) => {
      var date = new Date(elem.create_date);
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

    console.log(dateFilter);

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
      <Loading />
    ) : (
      <>
        <Base
          sidebar={
            <BaseBar>
              <Filters
                filters={this.state.defaultFilters}
                onFilterChange={this.filterAssignments}
                onDateFilterChange={this.filterByDate}
                restoreDateFilter={this.restoreDefaultDateFilter}
              />
            </BaseBar>
          }
          main={
            <>
              <p className="h1 m-4 mt-5 text-center">Assignments</p>
              {this.state.filteredAssignments.length > 0 ? (
                this.state.filteredAssignments.map((assignment, i) => {
                  return <Assignment key={i} assignment={assignment} />;
                })
              ) : (
                <p className="h4 mt-5 pt-4 text-secondary text-center">
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
