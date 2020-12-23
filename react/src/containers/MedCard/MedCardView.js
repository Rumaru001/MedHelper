import React from "react";
import { PaginationBar } from "../../components/MedCard/PaginationBar";
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

    const assignments_per_page = 5;

    this.state = {
      pages_number: 1,
      per_page: assignments_per_page,
      current_page: 1,
      page_slice: {
        start: 0,
        end: assignments_per_page,
      },
      loading: true,
    };
  }

  async getData(size = "") {
    try {
      let response = await axiosInstance.get(`assignment/list/${size}`);

      const data = response.data.assignments;

      var filters = filters_names.map((field) => {
        return {
          [field]: this.createFilters(field, data),
        };
      });

      var dateFilter = { startTime: "1900-01-01", endTime: new Date() };
      this.setState({
        ...this.state,
        pages_number: Math.ceil(data.length / this.state.per_page),
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
    this.getData(this.state.per_page);
    this.getData();
  }

  createFilters = (field, data) => {
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
    filters.forEach((filter_elem, index) => {
      data = data.filter((elem) => {
        return elem[filters_names[index]] === undefined
          ? true
          : filter_elem[filters_names[index]].includes(
              elem[filters_names[index]]
            );
      });
    });

    var from = new Date(dateFilters.endTime);
    var till = new Date(dateFilters.startTime);

    data = data.filter((elem) => {
      var date = new Date(elem.create_date);

      return !(from <= date) && !(date <= till);
    });

    const page_slice = {
      start: 0,
      end: this.state.per_page,
    };

    this.setState({
      ...this.state,
      filteredAssignments: data,
      pages_number: Math.ceil(data.length / this.state.per_page),
      current_page: 1,
      page_slice: page_slice,
    });

    return data;
  };

  filterAssignments = (newFilters) => {
    newFilters.forEach((filter, index) => {
      if (filter[filters_names[index]].length < 1) {
        newFilters[index] = this.state.defaultFilters[index];
      }
    });

    this.setState(
      {
        ...this.state,
        filters: newFilters,
      },
      () => {
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

  handlePageClick = (page_number) => {
    const page_slice = {
      start: (page_number - 1) * this.state.per_page,
      end: page_number * this.state.per_page,
    };
    this.setState({
      ...this.state,
      page_slice: page_slice,
      current_page: page_number,
    });
  };

  buildMain = () => {
    return (
      <>
        <PaginationBar
          className="child-center"
          number={this.state.pages_number}
          current={this.state.current_page}
          onClick={this.handlePageClick}
        />
        {this.state.filteredAssignments
          .slice(this.state.page_slice.start, this.state.page_slice.end)
          .map((assignment, i) => {
            return <Assignment key={i} assignment={assignment} />;
          })}
      </>
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
                this.buildMain()
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
