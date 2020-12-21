import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import axios from 'axios'; //lo agregue yo
import loaderGif from "../../images/762.gif";



const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

const subheading = "Contact Us";
const heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>;
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const submitButtonText = "Send";
const buttonClick = "Sending";
//const formAction = "#", 
//const formMethod = "POST", //modificado, antes era get
const textOnLeft = true;
const email = " * el email esta vacio";
const name = " * el name esta vacio";
const subject = " * el subject esta vacio";
const message = " * el message esta vacio";
const Enviado = "su mensaje fue enviada exitosamente";
const Fallo = "ocurrio un error, y su mensaje no se pudo enviar";

export default class ContactFrom extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {  
      email: "",
      name: "",
      subject: "",
      message: "",
      loading: true,
      eEmail: false,
      eName: false,
      eSubject: false,
      eMessage: false,
      enviado: 0
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value,
    })
  
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({loading: false});
    this.setState({enviado: 0});
    var ContactForm = {
      email: this.state.email,
      name: this.state.name,
      subject: this.state.subject,
      message: this.state.message
    };

    try {
        if (ContactForm.email === "") {
        this.setState({eEmail: true});
        this.setState({loading: true});
      } else {
        this.setState({eEmail: false});
      }
      if (ContactForm.name === "") {
        this.setState({eName: true});
        this.setState({loading: true});
      } else {
        this.setState({eName: false});
      }
      if (ContactForm.subject === "") {
        this.setState({eSubject: true});
        this.setState({loading: true});
      } else {
        this.setState({eSubject: false});
      }
      if (ContactForm.message === "") {
        this.setState({eMessage: true});
        this.setState({loading: true});
      } else {
        this.setState({eMessage: false});
      }
      if (ContactForm.email !== "" && ContactForm.name !== "" && ContactForm.subject !== "" && ContactForm.message !== "") {
        axios.post(`http://localhost:1337/contact-forms`, ContactForm )
            .then(res => {
              console.log(res.data);
              document.getElementById("contactForm").reset();
              this.setState({email: ""});
              this.setState({name: ""});
              this.setState({subject: ""});
              this.setState({message: ""});
              this.setState({enviado: 1});
              this.setState({loading: true});
              setTimeout(()=>{this.setState({enviado: 0})}, 30000);
            })
      }
  } catch(error) {
    console.error(error);
    this.setState({loading: true});
    this.setState({enviado: 2});
    }
  }




  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  render() {
    //const loading = this.state.loading;
    const error = {
      email: this.state.eEmail,
      name: this.state.eName,
      subject: this.state.eSubject,
      message: this.state.eMessage
    };
    let button;
    let warning1;
    let warning2;
    let warning3;
    let warning4;
    let enviado;
    if (this.state.loading) {
      button = <SubmitButton onClick={this.handleSubmit}>
                  {submitButtonText}
                </SubmitButton>
    } else {
      button = <SubmitButton onClick={this.handleSubmit} disabled>
                  <div align="center" ><img src={loaderGif} alt="loading..." />{buttonClick}</div>
                </SubmitButton>
    }
    if (error.email === true) {
      warning1 =<div align="center" ><h2>{email}</h2></div>
    } 
    if (error.name === true) {
      warning2 = <div align="center" ><h2>{name}</h2></div>
    } 
    if(error.subject === true) {
      warning3 = <div align="center" ><h2>{subject}</h2></div>
    } 
    if (error.message === true) {
      warning4 = <div align="center" ><h2>{message}</h2></div>
    }
    if (this.state.enviado === 1) {
      enviado = <div align="center" ><h2>{Enviado}</h2></div>
    }
    if (this.state.enviado === 2) {
      enviado = <div align="center" ><h2>{Fallo}</h2></div>
    }
    return (
      <Container>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={EmailIllustrationSrc} />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>
                {heading}
              </Heading> 
              {description && <Description>
                  {description} 
                </Description>}
              <Form id="contactForm" /*onSubmit={this.handleSubmit}*/>
                <div>
                  {warning1}
                  {warning2}
                  {warning3}
                  {warning4}
                </div>
                <Input type="email" id="email" name="email" placeholder="Your Email Address" onChange={this.handleChange} />
                <Input type="text" id="name" name="name" placeholder="Full Name" onChange={this.handleChange}/>
                <Input type="text" id="subject" name="subject" placeholder="Subject" onChange={this.handleChange}/>
                <Textarea id="message" name="message" placeholder="Your Message Here" onChange={this.handleChange}/>
                {button}
                {enviado}
              </Form>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    )
  };
};
