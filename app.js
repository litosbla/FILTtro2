
function agregar_camper(){
    let validaro =false
    let DATA =[]
    if(localStorage.getItem('Carlos_filtro_user')){
        DATA= JSON.parse(localStorage.getItem('Carlos_filtro_user'))
    }
    
    const camperId= document.getElementById("camper_id")
    const camperName= document.getElementById("camper_name")
    const camperEmail= document.getElementById("camper_email")
    const camperGroup= document.getElementById("camper_group")
    const camperAcum= document.getElementById("camper_acum")
    const titulo = document.getElementById("comentario")
    
    const camper ={
        id:parseInt(camperId.value),
        name:camperName.value,
        email:camperEmail.value,
        group:camperGroup.value,
        coins:parseInt(camperAcum.value)
    }
    if(titulo.textContent != "Modifica (no modifiques el id)"){
        
    }else{
        console.log(camperId.value)
        DATA =DATA.filter(x=>x.id != camperId.value)
        localStorage.setItem('Carlos_filtro_user', JSON.stringify(DATA));
        
    }
    DATA.push(camper)
    
    localStorage.setItem('Carlos_filtro_user', JSON.stringify(DATA));
    const valor =""
    camperId.value=valor
    camperName.value=valor
    camperEmail.value=valor
    camperGroup.value=valor
    camperAcum.value=valor
    titulo.textContent="Gestor de estudiantes"
    actualizar_opciones()
    reporte()
    
    
    

}
function agregar_concepto(){
    let CONCEPTOS=[
            {concepto:"llegar Tarde", coins:-3},
            {concepto:"Buenas Notas", coins:5},
            {concepto:"Compañerismo", coins:2}
        ]

    if(localStorage.getItem('Carlos_filtro_conceptos')){
        CONCEPTOS= JSON.parse(localStorage.getItem('Carlos_filtro_conceptos')) 
    }

    const NameConcept= document.getElementById("concepto")
    const CoinConcept= document.getElementById("coins_concepto")
    const valor =""
    NameConcept.value=valor
    CoinConcept.value=valor
    dicConcepts ={
        concepto:NameConcept.value,
        coins:parseInt(CoinConcept.value)
    }

    CONCEPTOS.push(dicConcepts)
    localStorage.setItem('Carlos_filtro_conceptos', JSON.stringify(CONCEPTOS));
    actualizar_opciones()
}


function actualizar_opciones(){

    let CONCEPTOS=JSON.parse(localStorage.getItem('Carlos_filtro_conceptos')) 
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))
    //consignar solo positivos
    const ConsignarCamperSelection = document.getElementById("selection_camper_consignar")
    const ConsignarConceptoSelection = document.getElementById("selection_concepto_consignar")
    
    const DATA_campers_names = DATA.map(elemento => elemento.name)
    ConsignarCamperSelection.innerHTML=""

    DATA_campers_names.forEach(nombre => {
        ConsignarCamperSelection.innerHTML+=`<option value="${nombre}">${nombre}</option>`
    });
    
    const DATA_conceptos_positivos= CONCEPTOS.filter(elemento => elemento.coins > 0).map(cept => cept.concepto)
    ConsignarConceptoSelection.innerHTML=""

    DATA_conceptos_positivos.forEach(c => {
        ConsignarConceptoSelection.innerHTML+=`<option value="${c}">${c}</option>`
    });
    // descuento solo negativos
    const DescontarCamperSelection = document.getElementById("selection_camper_descontar")
    const DescontarConceptoSelection = document.getElementById("selection_concepto_descontar")
    
    
    DescontarCamperSelection.innerHTML=""

    DATA_campers_names.forEach(nombre => {
        DescontarCamperSelection.innerHTML+=`<option value="${nombre}">${nombre}</option>`
    });
    
    const DATA_conceptos_negativos= CONCEPTOS.filter(elemento => elemento.coins < 0).map(cept => cept.concepto)
    DescontarConceptoSelection.innerHTML=""

    DATA_conceptos_negativos.forEach(c => {
        DescontarConceptoSelection.innerHTML+=`<option value="${c}">${c}</option>`
    });
}

function sumar_coins() {
    let CONCEPTOS=JSON.parse(localStorage.getItem('Carlos_filtro_conceptos')) 
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))



    const ConsignarCamperSelection = document.getElementById("selection_camper_consignar")
    const ConsignarConceptoSelection = document.getElementById("selection_concepto_consignar")
    
    
    
    
    DATA.forEach(usuario => {
        if(usuario.name == ConsignarCamperSelection.value){
            
            usuario.coins += CONCEPTOS.find(con => con.concepto == ConsignarConceptoSelection.value).coins
            //sumo coins
        }
    });

    localStorage.setItem('Carlos_filtro_user', JSON.stringify(DATA));
}
function restar_coins() {
    let CONCEPTOS=JSON.parse(localStorage.getItem('Carlos_filtro_conceptos')) 
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))



    const DescontarCamperSelection = document.getElementById("selection_camper_descontar")
    const DescontarConceptoSelection = document.getElementById("selection_concepto_descontar")
    
    
    
    DATA.forEach(usuario => {
        if(usuario.name == DescontarCamperSelection.value){
            
            usuario.coins += CONCEPTOS.find(con => con.concepto == DescontarConceptoSelection.value).coins
            //sumo coins
        }
    });

    localStorage.setItem('Carlos_filtro_user', JSON.stringify(DATA));
}
function reporte(){
    const divReporte = document.getElementById("reporte")
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))
    divReporte.innerHTML=`
    <div class="caja">
    <p>id</p>
    <p>nombre</p>
    <p>email</p>
    <p>grupo</p>
    <p>coins</p>
    <p>op.Mod</p>
    <p>op.Elim</p>
    
</div>
<hr>
    `

    DATA.forEach(camper => {
        divReporte.innerHTML+=`
        <div class="caja" id="${camper.id}">
    <p>${camper.id}</p>
    <p>${camper.name}</p>
    <p>${camper.email}</p>
    <p>${camper.group}</p>
    <p>${camper.coins}</p>
    <a href="#gestion_campers" onclick="poner_datos(this)">modificar</a>
    <a href="#reporte" onclick="eliminar_datos(this)">eliminar</a>
</div>
<hr>
        
        `
        
    });

}
function eliminar_datos(e){
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))
    console.log(parseInt(e.parentElement.id))
    const camperAModificar = DATA.find(campero => campero.id == e.parentElement.id)
    DATA =DATA.filter(x=>x.id != camperAModificar.id)
    localStorage.setItem('Carlos_filtro_user', JSON.stringify(DATA));
    reporte()
    
}
function poner_datos(e){
    let DATA = JSON.parse(localStorage.getItem('Carlos_filtro_user'))
    console.log(parseInt(e.parentElement.id))
    
    const camperId= document.getElementById("camper_id")
    const camperName= document.getElementById("camper_name")
    const camperEmail= document.getElementById("camper_email")
    const camperGroup= document.getElementById("camper_group")
    const camperAcum= document.getElementById("camper_acum")
    const titulo = document.getElementById("comentario")
    

    const camperAModificar = DATA.find(campero => campero.id == e.parentElement.id)
    camperId.value=camperAModificar.id
    camperName.value=camperAModificar.name
    camperEmail.value=camperAModificar.email
    camperGroup.value=camperAModificar.group
    camperAcum.value=camperAModificar.coins

    titulo.textContent="Modifica (no modifiques el id)"

}

 