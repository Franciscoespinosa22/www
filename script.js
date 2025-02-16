$(document).ready(function () {
    $("#generarRFC").click(function () {
        let nombre = $("#nombre").val().trim().toUpperCase();
        let apellidoPaterno = $("#apellidoPaterno").val().trim().toUpperCase();
        let apellidoMaterno = $("#apellidoMaterno").val().trim().toUpperCase();
        let fechaNacimiento = $("#fechaNacimiento").val();

        if (nombre === "" || apellidoPaterno === "" || fechaNacimiento === "") {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        let rfc = generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento);
        $("#resultadoRFC").val(rfc);
    });


    function generarRFC(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento) {
        let primeraLetra = apellidoPaterno.charAt(0);
        let primeraVocal = '';
        if (/[AEIOU]/i.test(apellidoPaterno.charAt(0))) {
          primeraVocal = apellidoPaterno.replace(apellidoPaterno.charAt(0), '').match(/[AEIOU]/i);
          primeraVocal = primeraVocal ? primeraVocal[0] : '';
        } else {
          primeraVocal = apellidoPaterno.match(/[AEIOU]/i);
          primeraVocal = primeraVocal ? primeraVocal[0] : '';
        }
        let primeraLetraMaterno = apellidoMaterno ? apellidoMaterno.charAt(0) : "";
        let primeraLetraNombre = nombre.charAt(0);
      
        let fecha = fechaNacimiento.split("-");
        let anio = fecha[0].substr(2, 2);
        let mes = fecha[1];
        let dia = fecha[2];
      
        // Validar fecha de nacimiento
        if (!validarFecha(fechaNacimiento)) {
          throw new Error("Fecha de nacimiento inválida");
        }
      
        let rfcBase = (primeraLetra + primeraVocal + primeraLetraMaterno + primeraLetraNombre + anio + mes + dia).toUpperCase();
        let homoclave = generarHomoclave(); 
      
        return rfcBase + homoclave;
    }
      
      function validarFecha(fecha) {
        let fechaParts = fecha.split("-");
        let anio = fechaParts[0];
        let mes = fechaParts[1];
        let dia = fechaParts[2];
      
        if (anio.length !== 4 || mes.length !== 2 || dia.length !== 2) {
          return false;
        }
      
        let fechaValida = new Date(anio, mes - 1, dia);
        return fechaValida.getFullYear() === parseInt(anio) && fechaValida.getMonth() === parseInt(mes) - 1 && fechaValida.getDate() === parseInt(dia);
      }
      
      function generarHomoclave() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let homoclave = "";
        for (let i = 0; i < 3; i++) {
          homoclave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return homoclave;
      }


    // Consulta de la API con ID dinámico
    $("#consultarAPI").click(function () {
        let apiId = $("#apiId").val().trim();

        if (apiId === "" || isNaN(apiId)) {
            alert("Por favor, ingrese un ID válido.");
            return;
        }

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/users/${apiId}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $("#apiNombre").val(data.name);
                $("#apiEmail").val(data.email);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un problema al consultar la API. Revisa la consola para más detalles.");
            }
        });
    });
});
