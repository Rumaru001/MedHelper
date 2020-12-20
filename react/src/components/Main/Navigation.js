import React from "react";
import { Link } from "react-router-dom";

const links = [`/personal_account`, `/medical_card`, `/tag`];
const names = ["Personal Account", "Medical Card", "Tags"];

export class Navigation extends React.Component {
  render() {
    return (
      <>
        <div className="w-100 text-center h4">
          {links.map((link, index) => {
            return (
              <Link to={link} className="text-decoration-none" key={index}>
                <div className="text-light my-2 font-weight-bold logo">
                  {names[index]}
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}
