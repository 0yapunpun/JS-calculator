// Funcion que agrega datos al display y aplica la restricción de 1 coma
var string_comas = 0;
function append_number(number) {
  let string = document.getElementById("display_id").value;
  let string_length = string.length;

  if ( string_comas == 1 && number == ","){
    return;
  } else if (string.length >= 21 ){
    document.getElementById("display_id_span_up").textContent = "Max 20 digits";
    return;
  } else{
    document.getElementById("display_id").value += number;
  }

  let coma_check = document.getElementById("display_id").value;
  string_comas = coma_check.split(",").length -1;

  // En caso de que la linea de arriba del display tenga un valor este se borra
  document.getElementById("display_id_span_up").textContent = "";

}

// Se inicializa el Array donde se guardan Objetos con el numero y su respectiva operacion
var calc_elements = [];

//Funcion que guarda datos en array he imprime los valores en el display 
function save_array(state) {
  // Se toma el valor actual escrito en pantalla
  let string = document.getElementById("display_id").value;

  // Evita que se envien valores nulos 
  if (string != ""){

    //Elimina informacion de alerta del display en caso de que la contenga
    let display_up =  document.getElementById("display_id_span_up").textContent;
    if (display_up != "") {
      document.getElementById("display_id_span_up").textContent = "";
    }

    // Se borra la pantalla
    document.getElementById("display_id").value = '';
    // Se pasa de string a numero. Replace is necesary bc js not interpret , as a decimal
    var string_number = parseFloat(string.replace(",", "."));

    // para transformar valores a simbolos y pasar al display
    let simbolo = "";
    if (state == "suma"){
      simbolo = " + ";
    } else if (state == "resta"){
      simbolo = " - ";
    } else if (state == "division"){
      simbolo = " ÷ ";
    }else if (state == "mult"){
      simbolo = " * ";
    }

    // Imprime en pantalla el valor y su operador 
    document.getElementById("display_id_span").textContent += string_number + simbolo;
    
    // Se agregan objetos al array y se envia el dato
    calc_elements.push({operacion: state , number: string_number}); 
    console.log(calc_elements);
    return calc_elements;

  } else if (string == ""){
    document.getElementById("display_id_span_up").textContent = "";
    document.getElementById("display_id_span_up").textContent += "Invalid: null value";
    return;
  }
}

// Función encargada de realizar las operaciones
function resultado(result_state) {

  // Se llama de nuevo la funcion suma para guardar valor y limpiar pantalla 
  save_array(result_state)
  
  // La variable contador se inicializa con el primer valor ingresado
  let contador_resultado = calc_elements[0].number;
  console.log("Primer elemento: " + contador_resultado);
  for (let i = 0; i < calc_elements.length; i++){

        if (calc_elements[i].operacion === 'suma'){
          // Para llevar la cuenta en la consola
            console.log("Estoy sumando: " +calc_elements[i+1].number);
            contador_resultado +=  calc_elements[i+1].number  
            console.log(contador_resultado);

        } else if (calc_elements[i].operacion === 'resta'){
            console.log("Estoy restando: "+calc_elements[i+1].number);
            contador_resultado -=  calc_elements[i+1].number  
            console.log(contador_resultado);           

        } else if (calc_elements[i].operacion === 'division'){
            console.log("Estoy dividendo: "+calc_elements[i+1].number);
            contador_resultado /=  calc_elements[i+1].number  
            console.log(contador_resultado);

        } else if (calc_elements[i].operacion === 'mult'){
            console.log("Estoy multiplicando: " +calc_elements[i+1].number);
            contador_resultado *=  calc_elements[i+1].number  
            console.log(contador_resultado);

        } else if (calc_elements[i].operacion === 'result'){
            //Elimina informacion de alerta del display en caso de que la contenga
            let display_up =  document.getElementById("display_id_span_up").textContent;
            if (display_up != "") {
              document.getElementById("display_id_span_up").textContent = "";
            }

            document.getElementById("display_id").value += contador_resultado;
            document.getElementById("display_id_span").textContent += " = ";
            

            // Se limpia y se devuelve el array 
            calc_elements = []
            return calc_elements;

        }  
    }
}

// Función que reinicia la calculadora
function clear_all() {
  // Cada una con un método diferente xD
  document.getElementById("display_id").value = '';
  document.getElementById("display_id_span").innerHTML= '';
  document.getElementById("display_id_span_up").textContent = "";
  calc_elements = [];
  return calc_elements;
}

function clear_last() {
  let str = document.getElementById("display_id").value;
  let newStr = str.slice(0, -1); 
  document.getElementById("display_id").value = newStr;
  document.getElementById("display_id_span_up").textContent = "";

}
