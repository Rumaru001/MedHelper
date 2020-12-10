import React from "react";
import Base from "../../components/Main/Base";
import {Container, Row, Col, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {AddButton} from "../../components/MedCard/AddButton";


const side_bar_text = {
    text:
        {
            email: "Email",
            phone: "Phone",
            address: "Address",
            weight: "Weight",
            height: "Height",
            blood: "Blood Type",
        },
    urls:
        {
            avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
            sex: "https://www.flaticon.com/svg/static/icons/svg/3813/3813981.svg",
            email: "https://www.flaticon.com/svg/static/icons/svg/893/893292.svg",
            phone: "https://www.flaticon.com/svg/static/icons/svg/901/901120.svg",
            address: "https://www.flaticon.com/svg/static/icons/svg/3595/3595598.svg",
            weight: "https://www.flaticon.com/premium-icon/icons/svg/2343/2343398.svg",
            height: "https://www.flaticon.com/premium-icon/icons/svg/3251/3251160.svg",
            blood: "https://www.flaticon.com/svg/static/icons/svg/1188/1188130.svg",
        },
    sex:
        {
            Male: "https://www.flaticon.com/svg/static/icons/svg/893/893292.svg",
            Female: "https://www.flaticon.com/svg/static/icons/svg/893/893292.sv"
        }
}
const data_temp = {
    blocks:
        {
            name: "Oleksandr",
            surname: "Duda",
            email: "duda@gmail.com",
            phone: "+380956353464",
            address: "Stepana Bogdana 2",
            weight: "54 kg",
            height: "156 cm",
            blood: "O(I)Rh+",
            sex: "Male"
        }

};


const DisplayList = Object.keys(side_bar_text.text).map((key, index) => (
    <Row className=" d-flex justify-content-left child-left cursor-help" key={index}>

        <InputGroup.Text id="TitleAssignment" className="bg-transparent border-0 w-22 m-1 p-1 text-center">
            <img title={side_bar_text.text[key]} alt={side_bar_text.text[key]} style={{width: "40px", height: "40px"}}
                 src={side_bar_text.urls[key]}/>
        </InputGroup.Text>

        <Row className="ml-2 justify-content-left child-left">
            <div className="container rounded bg-transparent text-dark font-weight-light">
                <h3 className="text-responsive"> {data_temp.blocks[key]}</h3>
            </div>
        </Row>

    </Row>
));

export function personalSideBar() {
    return (
        <>

            <h1 className="divider">
                <hr/>
            </h1>
            <Row className="p-3 my-lg-4 justify-content-center child-center">
                <Col className="ml-2 justify-content-center child-center">
                    <img title="Profile photo" alt="Profile photo"
                         style={{width: "110px", height: "110px", borderRadius: "80px"}}
                         src={side_bar_text.urls.avatar}/>
                </Col>
                <Col className="justify-content-left child-left">
                    <Col>
                        <Row className="justify-content-left child-left">
                            <Row className="">
                                <div className="d-flex">
                                    <div
                                        className="container rounded bg-transparent text-dark font-weight-light">
                                        <h3 className="justify-content-center child-center text-responsive">{data_temp.blocks.name} {data_temp.blocks.surname}</h3>
                                    </div>
                                </div>

                            </Row>
                        </Row>
                        <Row className="ml-1 justify-content-left child-left">
                            <Row className="">
                                <div className="d-flex">
                                    <div>
                                        <img className='flip_H' title="Sex" alt="Sex"
                                             style={{width: "40px", height: "40px"}}
                                             src={side_bar_text.urls.sex}/>
                                    </div>
                                    <div
                                        className="container rounded bg-transparent text-dark font-weight-light">
                                        <h3 className="text-responsive">{data_temp.blocks.sex}</h3>
                                    </div>
                                </div>
                            </Row>
                        </Row>
                    </Col>
                </Col>
            </Row>
            <Row className="ml-2 mb-3 p-3 my-lg-4 ">
                <Col>
                    <h1 className="divider">
                        <hr/>
                    </h1>
                </Col>
            </Row>
            <Row className="ml-2 mb-3 p-3 my-lg-4 ">
                <Col>
                    {DisplayList}
                </Col>
            </Row>


        </>
    )

}

export default class PersonalAccount extends React.Component {

    constructor(props) {

        super(props);
        this.state = {blocks: data_temp.blocks}
    }

    manageTextLenght = (text) => {
        return text.length < 40 ? text : `${text.slice(0, 40 - 5)}...`;
    };

    render() {
        return (
            <>

                <Base
                    sidebar={
                        <>
                            <Container className="justify-content-left child-left">
                                <Col className="mb-5 justify-content-left child-left">
                                    {personalSideBar()}
                                    <Row>
                                        <AddButton to="/personal_account/settings"
                                                   className="addbtn-assignment text-light">
                                            <p className="text-center my-auto">Settings</p>
                                        </AddButton>
                                    </Row>
                                </Col>


                            </Container>

                        </>
                    }
                    main={
                        <>
                            <Container>

                                <div className="mt-5 d-flex justify-content-center">
                                    <h1> Personal Account</h1>
                                </div>

                                <Row className="p-5-c">
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" className="btn-lg" variant="warning">
                                            <h3>MedCard</h3>
                                            <h5 className="text-left">{this.manageTextLenght("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/0/reminders" variant="danger" size="lg">
                                            <h3>Reminders</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" variant="info" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className=" m-2 p-2">
                                        <Button href="/medical_card" variant="success" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                    <Col className="mr-1 m-2 p-2">
                                        <Button href="/medical_card" variant="primary" size="lg">
                                            <h3>MedCard</h3>
                                            <h5>Visit to a doctor on a 01-12-2020</h5>
                                        </Button>{' '}
                                    </Col>
                                </Row>

                            </Container>
                        </>
                    }
                />
            </>
        );
    }
}
