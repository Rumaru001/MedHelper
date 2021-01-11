import React from "react";
import Base from "../../components/Main/Base";
import { BaseBar } from "../../components/Main/BaseBar";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Main/loading";
import { links } from "../../components/Main/Links";

export class ListOfDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultFilters: {
        userDoctors: true,
      },
      filters: {
        userDoctors: true,
      },
      loading: true,
    };
  }

  async getDoctors() {
    try {
      const filters = this.state.filters;

      let response = await axiosInstance.get(`auth/doctors/`, {
        params: filters,
      });

      const data = response.data;

      const state = this.state;
      state.doctors = data;
      console.log(data);
      state.loading = false;
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
      },
      () => {
        console.log(this.state.filters);
      }
    );
  };

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
        sidebar={
          <BaseBar>
            <Form className="mt-4">
              <div className="form-group">
                <label htmlFor="nameID">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameID"
                  placeholder="John"
                  name="name"
                  defaultValue=""
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
                  defaultValue=""
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              <p className="h5">Doctors</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlyMyDoctors"
                  name="userDoctors"
                  onChange={(e) => {
                    this.handleCheckBox(e);
                  }}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="onlyMyDoctors">
                  Only my Doctors
                </label>
              </div>
              <p className="h5">Sex</p>
              <div className="form-check">
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
              </div>
              <div className="form-check">
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
              </div>
              <Button
                color="info"
                type="button"
                onClick={() => {
                  this.getDoctors();
                }}
              >
                Search
              </Button>
            </Form>
          </BaseBar>
        }
        main={
          <>
            <p className="h1 m-4 mt-5 text-center">Doctors</p>

            {this.state.doctors.length > 0 ? (
              this.state.doctors.map((doctor, index) => {
                return (
                  <div className="card " key={index}>
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
                        <p className="card-text">
                          spec {console.log(this.state.filters)}
                        </p>
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
                );
              })
            ) : (
              <p className="h4 mt-5 pt-4 text-secondary text-center">
                No Doctors found 🙁
              </p>
            )}
          </>
        }
      ></Base>
    );
  }
}
