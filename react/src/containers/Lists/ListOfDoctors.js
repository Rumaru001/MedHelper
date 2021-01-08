import React from "react";
import Base from "../../components/Main/Base";
import { BaseBar } from "../../components/Main/BaseBar";
import axiosInstance from "../../axiosApi";
import { dropdownIndicatorCSS } from "react-select/src/components/indicators";
import { Link } from "react-router-dom";

export class ListOfDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async getUserDoctors() {
    try {
      let response = await axiosInstance.get(`request/user_doctors/`);
      const data = response.data;
      this.setState({
        user_doctor: data,
        loading: false,
      });
      return data;
    } catch (error) {
      console.log("datail: ", error.response.data);
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  async getDoctors() {
    try {
      let response = await axiosInstance.get(`request/doctors/`);
      const data = response.data;
      this.setState({
        user_doctor: data,
        loading: false,
      });
      return data;
    } catch (error) {
      console.log("datail: ", error.response.data);
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <Base
        sidebar={<BaseBar></BaseBar>}
        main={this.state.user_doctor.map((doctor) => {
          return (
              <Link to={`url to docotor id`}>
            <div class="card text-decoration-none" style="width: 18rem;">
              <img class="card-img-top zoom-in" src="..." alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{doctor.name + " " +doctor.surname}</h5>
                <p class="card-text">
                  {doctor.specification}
                </p>
              </div>
            </div>
            </Link>
          );
        })}
      ></Base>
    );
  }
}
