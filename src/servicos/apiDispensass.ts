import axios from "axios";

 const apiDispensas = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbw2wgOYgJ5s0BvcEaVXDWDChclWxVsPKJmR7wcAdO-NiiPHlKpjtpSgPAA0bsEMcB4/exec?"
})

export default apiDispensas