import * as yup from "yup";
const IPRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const URLRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const stringValid = yup
  .string("validation.string")
  .required("validation.require");

const emailValid = yup

  .string("validation.string")
  .required("validation.require")
  .email("validation.email");

const numValid = yup
  .number()
  .required("validation.require")
  .typeError("validation.number");

const urlValid = (reg ,ms)=>yup.string()
.required("validation.require")
.matches(reg, ms)

export const contactSchema = yup.object().shape({
  full_name: stringValid,
  email: emailValid,  
  body: stringValid,
  phone_number: numValid,
});

export const restrictionSchema =(type)=> yup.object().shape({
  restriction: type ==="ip" ? urlValid(IPRegex , "validation.ip") : urlValid(URLRegex ,  "validation.url")  ,
});