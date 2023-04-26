export const validationFormPatterns = {
   identification:{
      pattern:  /^[0-9]+$/,
      message: "La identificacion debe ser de tipo numerico"
   },
   cellphone: {
      pattern: /^[0-9]+$/,
      message: "El numero de telefono deber ser de tipo numerico"
   },
   email: {
      pattern:   /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      message: "Debe de ingresar un correo valido"
   }
}

// Campos obligatorios
// Id de usuarios existentes
// Campo Id solo reciba números.