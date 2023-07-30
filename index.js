
let IPC = 1.076;
const opcionSalir=4;
const bancos=[
    {
    id: 1,
    nombre: "HSBC",
    tasa: 120
    },
    {
    id: 2,
    nombre: "Superville",
    tasa: 130,
    },
    {
    id: 3,
    nombre: "Galicia",
    tasa: 110,
    },
    {
    id: 4,
    nombre: "Piano",
    tasa: 115,
    },
];
const desarrolloCuotas=[];

alert("Bienvenido a Tarjetealo");
let opcion = parseInt( prompt ("Ingrese el valor que desea: \n 1-Comparador Cuotas\n 2-Calculadora Plazo Fijo \n 4-Salir"));
console.log(opcion);
while(opcion!=opcionSalir){
    switch(opcion){
        case 1: menuCuotas();
                  break;
        case 2: menuPlazoFijo();
                  break;
        default: alert("Opcion Invalida");
    }
        opcion = parseInt(prompt ("Ingrese el valor que desea: \n 1-Comparador Cuotas\n 2-Calculadora Plazo Fijo \n 4-Salir"));
}
salir();

function menuCuotas() {
     let opcion = parseInt(prompt ("Ingrese el valor que desea: \n 1-Comparador Cuotas\n 4-Volver Menu anterior")); 
    while (opcion!=opcionSalir)
    {
    if(opcion==1)
    {
        comparadorCuotas();
    }
    else{
        alert("Opcion Invalida");
    }
    opcion= parseInt(prompt ("Ingrese el valor que desea: \n 1-Comparador Cuotas\n 4-Volver menu anterior"));
    }
}

function comparadorCuotas() {
    const valorEft = parseFloat(prompt("Ingrese el valor en Efectivo"));
    const valorTarjeta = parseFloat(prompt("Ingrese el valor con Tarjeta"));
    const cuotas= parseInt(prompt("Ingrese la cantidad de cuotas"));
    let CFT = ((valorTarjeta/valorEft)-1)*100;
    let opcion = parseInt(prompt ("Ingrese el valor que desea: \n 1-Ver Recomendacion \n 2-Ver valor de cada cuotas \n 3-Ver valor final futuro \n 4-Volver Menu anterior")); 
    while (opcion!=opcionSalir)
        {
            switch(opcion){
                case 1 : recomendacion (valorEft,valorTarjeta,cuotas);
                         break;
                case 2: let valorCuota=Math.trunc(valorTarjeta/cuotas);
                        alert("El valor de cada cuota es: " + valorCuota);
                        alert("El costo Financiero total es: "+CFT+"%");
                        break;
                case 3: let valorFuturo = Math.trunc(valorTarjeta / (Math.pow(IPC,cuotas-1)));
                        alert("Tu compra en cuotas equivaldria a $"+ valorFuturo + "\n Compara este valor con el pago en efectivo");
                        break;
                default: alert("Opcion Invalida");
                         break;
            }
            opcion = parseInt(prompt ("Ingrese el valor que desea: \n 1-Ver Recomendacion \n 2-Ver valor de cada cuotas \n 3-Ver valor final futuro\n 4-Volver Menu anterior"));
        }
    
    }
    
 function recomendacion(efectivo,tarjeta,cuotas) {
        let precioAjustado = efectivo * Math.pow(IPC,cuotas-1); 
        if(precioAjustado > tarjeta){
            alert("Le recomendamos comprar con Tarjeta");
        }
        else {
            alert("Le recomendamos comprar en Efectivo");
        }
    }
    
    function menuPlazoFijo(){
        const monto = parseFloat (prompt ("Ingrese la cantidad de dinero a invertir"));
        const plazo = parseInt (prompt("Ingrese la cantidad de meses a depositar el plazo fijo"));
        const bancoSeleccionado=verBancos();
        const rendimiento = bancoSeleccionado.tasa/100;
        let reinvertir = parseInt(prompt("Introduzca una opcion: \n 1-Se reinvierten los intereses mes a mes \n 2-Se espera al final del plazo fijo"));
        while(reinvertir>2){    
        
             alert("Opcion Incorrecta");
            reinvertir = parseInt(prompt("Introduzca una opcion: \n 1-Se reinvierten los intereses mes a mes \n 2-Se espera al final del plazo fijo"));
            
        }
        let opcion = parseInt (prompt("Ingrese el valor que desea: \n 1-Ver Dinero ganado \n 2-Ver desarrollo Plazo Fijo \n 4-Volver Menu anterior")); 
        while(opcion!=opcionSalir){
            switch(opcion){
                case 1: inversion (monto, plazo, rendimiento, reinvertir);
                        break;
                case 2: cuotas (monto, plazo, rendimiento, reinvertir);
                        break;
                default: alert("Opcion Incorrecta");
                        break;
            }
            opcion = parseInt(prompt("Ingrese el valor que desea: \n 1-Ver Dinero ganado \n 2-Ver desarrollo Plazo Fijo \n 4-Volver Menu anterior")); 
        }
    }
    
    function inversion (monto, plazo, rendimiento, reinvertir){
        let ganancia =0;
        let interesMensual = rendimiento /12;
        if (reinvertir == 1)
        {
            ganancia = (monto * Math.pow(1+interesMensual,plazo)) - monto;
        }
        else {
            ganancia = (monto * (1+(interesMensual * plazo))) - monto;
        }
        alert("Su ganancia fue de $ "+ Math.trunc(ganancia));
    }
    
    function cuotas (monto, plazo, rendimiento, reinvertir){
        let acumulado =monto;
        let rendimientoMensual = rendimiento /plazo;

        if(reinvertir == 1)
        {
            for(let i=0; i<plazo; i++)
            {
                desarrolloCuotas[i] = acumulado * (1+rendimientoMensual);
                acumulado=desarrolloCuotas[i];
            }
            console.log(desarrolloCuotas);
        }
        else {
            const gananciaMensual=(monto*rendimiento)/12;
            for(let i=0; i<plazo; i++){
            desarrolloCuotas[i] = acumulado + gananciaMensual;
            acumulado=desarrolloCuotas[i];
            }
            console.log(desarrolloCuotas);
        }
        let mensaje= "A continuacion las cuotas de su plazo fijo \n";
        for(let j=0; j<desarrolloCuotas.length;j++){
            mensaje = mensaje + `Cuota ${j+1}: $${Math.round(desarrolloCuotas[j])} \n`
        }
        alert(mensaje);
        acumulado=0;
    }
    
    function salir (){
        alert("Gracias por visitarnos");
    }

    function verBancos (){
        let mensaje='Seleccione su banco \n Listado de bancos: \n';
        bancos.forEach(el=>{
            mensaje = mensaje + `${el.id}-${el.nombre}\n`
        })
        const seleccionBanco = parseInt(prompt(mensaje));
        const bancoSeleccionado=bancos.find(banco=>banco.id === seleccionBanco);
        return bancoSeleccionado;
    }
    
    