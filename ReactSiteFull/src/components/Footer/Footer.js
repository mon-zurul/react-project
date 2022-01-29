import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faYoutube} from "@fortawesome/free-brands-svg-icons";
import {Link, NavLink} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
class Footer extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            email:"",
            phone:"",
            facebook:"",
            youtube:"",
            footer_credit:"",
            loaderClass:"text-center",
            mainDivClass:"d-none",
            error:false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Footer).then(result=>{
            if(result==null){
                this.setState({ error:true})
            }
            else{
                this.setState({
                    address:result[0]['address'],
                    email:result[0]['email'],
                    phone:result[0]['phone'],
                    facebook:result[0]['facebook'],
                    youtube:result[0]['youtube'],
                    footer_credit:result[0]['footer_credit'],
                    loaderClass:"d-none",
                    mainDivClass:"p-2 text-justify"
                })
            }
        }).catch(error=>{
            this.setState({ error:true})
        })
    }

    render() {
              if(this.state.error==false){
                  return (
                      <Fragment>
                          <Container fluid={true} className="text-center p-4 footerSection">
                              <Container>
                              <Row>
                                  <Col lg={3} md={6} sm={12} className="p-2 text-justify">
                                      <h1 className="serviceName">Follow Me</h1>
                                      <a className="socialLink" target="_blank" href={"//"+this.state.facebook}><FontAwesomeIcon  icon={faFacebook} /> Facebook</a><br/>
                                      <a className="socialLink" target="_blank" href={"//"+this.state.youtube}><FontAwesomeIcon  icon={faYoutube} /> YouTube</a>
                                  </Col>


                                  <Col lg={3} md={6} sm={12} className={this.state.loaderClass}>
                                      <h1 className="serviceName">Address</h1>
                                      <Loading/>
                                  </Col>

                                  <Col lg={3} md={6} sm={12} className={this.state.mainDivClass}>
                                      <h1 className="serviceName">Address</h1>
                                      <p className="serviceDescription" >{this.state.address}</p>
                                      <p className="serviceDescription" > <FontAwesomeIcon  icon={faEnvelope} /> {this.state.email}</p>
                                      <p className="serviceDescription" > <FontAwesomeIcon  icon={faPhone} /> {this.state.phone}</p>
                                  </Col>

                                  <Col lg={3} md={6} sm={12} className="p-2 text-justify">
                                      <h1 className="serviceName">Information</h1>
                                      <Link className="footerLink" to="/about">About Me</Link><br/>
                                      <Link className="footerLink" to="/contact">Contact Me</Link>
                                  </Col>
                                  <Col lg={3} md={6} sm={12} className="p-2 text-justify">
                                      <h1 className="serviceName">Legal</h1>
                                      <Link className="footerLink" to="/Refund">Refund Policy</Link><br/>
                                      <Link className="footerLink" to="/Terms">Terms And Condition</Link><br/>
                                      <Link  className="footerLink" to="/Privacy">Privacy Policy</Link >
                                  </Col>
                              </Row>

                              </Container>

                          </Container>

                          <Container fluid={true} className="text-center copyrightSection">
                              <a className="copyrightLink" href="#"> {this.state.footer_credit}</a>
                          </Container>
                      </Fragment>
                  );

              }
              else if(this.state.error==true){
                  return <WentWrong/>
              }

        }


}

export default Footer;