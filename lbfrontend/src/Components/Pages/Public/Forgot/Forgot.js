import React, { Component } from "react";
import Page from "../../Page";

import { paxios } from "../../../Utilities/Utilities";
import Loading from "../../../Common/Loading/Loading";
import Input from "../../../Common/Input/Input";
import Button_F from "../../../Common/Button/Button";
import Mail from "../../../Common/Mail/Mail";
import { emailRegex, emptyRegex } from "../../../Common/Validators/Validators";
import img from "../Login/undraw_hacker_mindset_gjwq.svg";
import { Link } from "react-router-dom";
export default class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: null,
      emailSent: false,
      emailSending: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickForgot = this.onClickForgot.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate(state) {
    let nameErrors = false;
    let tmpErrors = [];
    const { email } = state;
    if (email !== undefined) {
      if (!emailRegex.test(email) || emptyRegex.test(email)) {
        tmpErrors.push("Ingrese un correo con un formato válido");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { emailError: tmpErrors });
      }
    }
    return nameErrors;
  }
  onChangeHandler(e) {
    const { name, value } = e.currentTarget;
    let errors = this.validate({ [name]: value });
    if (!errors) {
      errors = { [name + "Error"]: "" };
    }
    this.setState({
      ...this.state,
      [name]: value,
      ...errors,
    });
  }
  onClickForgot(e) {
    e.preventDefault();
    e.stopPropagation();
    const errors = this.validate(this.state);
    if (errors) {
      this.setState({ ...this.setState, ...errors });
    } else {
      const { email } = this.state;
      this.setState({ emailSending: true });
      paxios
        .post("/api/user/forgot", {
          to: email,
          subject: "Cambio de Contraseña",
          htmlBody:
            '<div style="background-color: #27b863; padding: 50px; color: #fff; font-size:50px; text-align: center;">' +
            '<h1 style="background-color: #fff; color:#27b863; padding: 50px">Learning Basics</h1>' +
            '<p style="background-color: #fff; color:#27b863; padding: 50px">Cambio de Contraseña</p>' +
            "</div>",
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.error) {
            alert(resp.data.error);
          } else {
            this.setState({
              ...this.state,
              emailSent: true,
              emailSending: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    
    if (this.state.emailSending) {
        return (
            <Page pageURL="forgot">
              <section className="page-login">
                <div className="login-data col-s-12 col-m-4 col-4 col-l-3">
                  <h1 className="center">Cambion de Contraseña</h1>
                  <br />
                  <div className="center">
                    <Loading />
                  </div>
                  <h1 className="center main-color">Enviando</h1>
                  
                </div>
              </section>
            </Page>
          );
    }
    if (this.state.emailSent) {
      return (
        <Page pageURL="forgot">
          <section className="page-login">
            <div className="login-data col-s-12 col-m-4 col-4 col-l-3">
              <h1 className="center">Cambion de Contraseña</h1>
              <Link className="black center" to="/login">Regresar</Link>
              <br />
              <h1 className="center main-color">
                Correo enviado para realizar el cambio de Contraseña
              </h1>
            </div>
            <div className="login-background col-m-8 col-6 col-offset-1 col-offset-l-2 hide-s">
              <img
                src={img}
                alt="Imagen de Fondo"
                className="col-m-12 no-padding"
              />
            </div>
          </section>
        </Page>
      );
    }

    return (
      <Page pageURL="forgot">
        <section className="page-login">
          <div className="login-data col-s-12 col-m-4 col-4 col-l-3">
            <h1 className="center">Cambion de Contraseña</h1>
            <Link className="black center" to="/login">Regresar</Link>
            <br />
            <Input
              name="email"
              caption="Correo Electónico"
              value={this.state.email}
              onChange={this.onChangeHandler}
              error={this.state.emailError}
              className="col-s-12 col-m-12 col-12 input-1"
            />
            <Button_F>
              <button
                className="button-3 col-s-12"
                onClick={this.onClickForgot}
              >
                Entrar
              </button>
            </Button_F>
          </div>
          <div className="login-background col-m-8 col-6 col-offset-1 col-offset-l-2 hide-s">
            <img
              src={img}
              alt="Imagen de Fondo"
              className="col-m-12 no-padding"
            />
          </div>
        </section>
      </Page>
    );
  }
}
