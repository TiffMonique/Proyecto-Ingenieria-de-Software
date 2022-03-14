//import React from "react";
import swal from "sweetalert"

//Aqui estabamos probando como hacer las ventanas eergentes,  borrar cuando se encuentre solucion
export const errorV = () => {
    if (typeof alert != "undefined") {
        swal({
            title: 'alertTitle',
            text: 'alertMessage ',
            icon: 'alertIcon',
            showConfirmButton: 'showConfirmButton',
            timer: 'timer',
        }).then(() => {
            window.location = 'ruta'
        })
    }

}

export const emailUsed = () => {
    swal({
        title: "HA OCURRIDO UN ERROR",
        text: "El correo ingresado ya esta en uso",
        icon: "error",
        button: "Aceptar",
        timer: "1500"

    })

}


export const successRegistration = () => {
    swal({
        title: "REGISTRO EXITOSO",
        text: "El correo ingresado ya esta en uso",
        icon: "success",
        button: "Aceptar",
        timer: "1500"

    })
}


