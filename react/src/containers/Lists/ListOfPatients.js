import React from "react";
import Base from "../../components/Main/Base";
import { BaseBar } from "../../components/Main/BaseBar";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import axiosInstance from "../../axiosApi";
import { Link, Redirect } from "react-router-dom";
import { Loading } from "../../components/Main/loading";
import { links } from "../../components/Main/Links";
import { PaginationBar } from "../../components/Main/PaginationBar";

export class ListOfPatients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultFilters: {
        per_page: 10,
        current_page: 1,
        name: "",
        surname: "",
        pages_number: 1,
      },
      filters: {
        per_page: 10,
        current_page: 1,
        name: "",
        surname: "",
        pages_number: 1,
      },
      loading: true,
      list_loading: false,
      filters_dropable: false,
    };
  }

  async getPatients() {
    try {
      let state = this.state;
      state.list_loading = true;
      this.setState(state);

      const filters = this.state.filters;
      console.log(filters);

      let response = await axiosInstance.get(`auth/patients/`, {
        params: filters,
      });

      const data = response.data;

      state = this.state;

      state.patients = data.obj_list;
      state.filters.pages_number = data.pages_number;
      state.filters.current_page = data.current_page;
      state.loading = false;
      state.list_loading = false;

      this.setState(state);

      console.log(data);
    } catch (error) {
      console.log("datail: ", error.response.data);
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    this.getPatients();
  }

  handleChange = (e) => {
    const filters = this.state.filters;
    filters[e.target.name] = e.target.value;
    this.setState(
      {
        ...this.state,
        filters: filters,
        filters_dropable: true,
      },
      () => {
        console.log(this.state.filters);
      }
    );
  };

  handleAddAssignmentButtonClick(user_id) {
    this.props.history.push(links.assignment.add, {
      user_id: user_id,
    });
  }

  async handldePageClick(current_page) {
    if (current_page !== this.state.filters.current_page) {
      const state = { ...this.state };
      state.filters.current_page = current_page;
      this.setState(state, () => {
        console.log(this.state);
        this.getPatients();
      });
    }
  }

  async handleAction(id, action) {
    try {
      let data = {
        reciever_id: id,
        type_of_request: action,
      };
      console.log(data);
      let response = await axiosInstance.post(`request/`, data);
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
    this.getPatients();
  }
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <Base
        className
        sidebar={
          <BaseBar>
            <Form className="mt-4 w-75 mx-auto" id="form-filter">
              <div className=" mb-2">
                <p className="h5 text-center">Patient</p>
                <div className="form-group">
                  <label htmlFor="nameID">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    placeholder="John"
                    name="name"
                    defaultValue={this.state.filters.name}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surnameID">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="surnameID"
                    placeholder="Smith"
                    name="surname"
                    defaultValue={this.state.filters.surname}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className=" mb-2">
                <p className="h5">Sex</p>
                <Container>
                  <Row className="w-100 mx-auto">
                    <Col className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="maleId"
                        value="M"
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                      <label className="form-check-label" htmlFor="maleId">
                        Male
                      </label>
                    </Col>
                    <Col className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="femaleID"
                        value="F"
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                      <label className="form-check-label" htmlFor="femaleID">
                        Female
                      </label>
                    </Col>
                  </Row>
                </Container>
              </div>

              <Button
                color="info"
                className="w-100 mt-4"
                type="button"
                onClick={() => {
                  this.getPatients();
                }}
              >
                Search
              </Button>
              {this.state.filters_dropable ? (
                <Button
                  className="w-100 mt-4 btn-danger"
                  type="button"
                  onClick={() => {
                    this.setState(
                      {
                        ...this.state,
                        filters: {
                          ...this.state.defaultFilters,
                        },
                        filters_dropable: false,
                      },
                      () => {
                        document.getElementById("form-filter").reset();
                        this.getPatients();
                      }
                    );
                  }}
                >
                  Drop all
                </Button>
              ) : (
                ""
              )}
            </Form>
          </BaseBar>
        }
        main={
          <div className="flex-column">
            <p className="h1 m-4 mt-5 text-center">Patients</p>
            <PaginationBar
              className="child-center"
              number={this.state.filters.pages_number}
              current={this.state.filters.current_page}
              onClick={(e) => {
                this.handldePageClick(e);
              }}
            />
            <Container className="p-0 h-100 max-free-height" fluid>
              <Row className="mx-auto h-100">
                {this.state.list_loading ? (
                  <Loading className="h-25" />
                ) : this.state.patients.length > 0 ? (
                  this.state.patients.map((patient, index) => {
                    return (
                      <Col md={3} className="p-0" key={index}>
                        <div className="card m-3">
                          <Link
                            to={links.home}
                            className="text-decoration-none text-dark"
                          >
                            <h1 className="aspect-ratio-box">
                              <img
                                className="card-img-top zoom-in aspect-ratio-box-inside"
                                src="https://www.todayshospitalist.com/wp-content/uploads/2010/06/drugseeking-300x350.jpg"
                                alt="Patient img"
                              />
                            </h1>
                            <div className="card-body pb-0">
                              <h5 className="card-title">
                                {patient.name + " name " + patient.surname}
                              </h5>
                              <p className="card-text">
                                b-day: {patient.birth_date}
                              </p>
                            </div>
                          </Link>
                          <Button
                            variant="info"
                            type="button"
                            className="m-3"
                            onClick={() => {
                              this.handleAddAssignmentButtonClick(
                                patient.user.id
                              );
                            }}
                          >
                            Add assignment
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            className="m-3 mt-0"
                            onClick={() => {
                              this.handleAction(patient.user.id, 2);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <p className="h4 w-100 mt-5 pt-4 text-secondary text-center">
                    No Patients found 🙁
                  </p>
                )}
              </Row>
            </Container>
          </div>
        }
      ></Base>
    );
  }
}
