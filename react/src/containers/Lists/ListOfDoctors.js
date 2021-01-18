import React from "react";
import Base from "../../components/Main/Base";
import { BaseBar } from "../../components/Main/BaseBar";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Main/loading";
import { links } from "../../components/Main/Links";
import { PaginationBar } from "../../components/Main/PaginationBar";

export class ListOfDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultFilters: {
        userDoctors: true,
        per_page: 10,
        current_page: 1,
        name: "",
        surname: "",
        userDoctors: true,
        pages_number: 1,
      },
      filters: {
        userDoctors: true,
        per_page: 10,
        current_page: 1,
        name: "",
        surname: "",
        userDoctors: true,
        pages_number: 1,
      },
      loading: true,
      list_loading: false,
      filters_dropable: false,
    };
  }

  async getDoctors() {
    try {
      let state = this.state;
      state.list_loading = true;
      this.setState(state);

      const filters = this.state.filters;
      console.log(filters);

      let response = await axiosInstance.get(`auth/doctors/`, {
        params: filters,
      });

      const data = response.data;

      state = this.state;

      state.doctors = data.obj_list;
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
    this.getDoctors();
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

  handleCheckBox = (e) => {
    const filters = this.state.filters;
    filters[e.target.name] = e.target.checked;
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

  async handldePageClick(current_page) {
    if (current_page !== this.state.filters.current_page) {
      const state = { ...this.state };
      state.filters.current_page = current_page;
      this.setState(state, () => {
        console.log(this.state);
        this.getDoctors();
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
    this.getDoctors();
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

              <div className="mb-2">
                <p className="h5">Doctors</p>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="onlyMyDoctors"
                    name="userDoctors"
                    onChange={(e) => {
                      this.handleCheckBox(e);
                    }}
                    defaultChecked={this.state.filters.userDoctors}
                  />
                  <label className="form-check-label" htmlFor="onlyMyDoctors">
                    Only my Doctors
                  </label>
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
                  this.getDoctors();
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
                        this.getDoctors();
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
            <p className="h1 m-4 mt-5 text-center">Doctors</p>
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
                ) : this.state.doctors.length > 0 ? (
                  this.state.doctors.map((doctor, index) => {
                    return (
                      <Col md={3} className="p-0" key={index}>
                        <div className="card m-3">
                          <Link
                            to={links.home}
                            className="text-decoration-none text-dark"
                          >
                            <img
                              className="card-img-top zoom-in"
                              src="https://cdn.searchenginejournal.com/wp-content/uploads/2020/08/white-american-doctor-google-5f30ffa223b8a-760x400.png"
                              alt="Card image cap"
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {doctor.name + " name " + doctor.surname}
                              </h5>
                              <p className="card-text">spec</p>
                            </div>
                          </Link>
                          {doctor.isRequested ? (
                            <Button
                              variant="warning"
                              type="button"
                              className="m-3"
                              disabled
                            >
                              Request sent
                            </Button>
                          ) : doctor.isAlreadyDoctorOfThisUser ? (
                            <Button
                              variant="danger"
                              type="button"
                              className="m-3"
                              onClick={() => {
                                this.handleAction(doctor.user.id, 2);
                              }}
                            >
                              Remove
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              type="button"
                              className="m-3"
                              onClick={() => {
                                this.handleAction(doctor.user.id, 1);
                              }}
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <p className="h4 w-100 mt-5 pt-4 text-secondary text-center">
                    No Doctors found 🙁
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
