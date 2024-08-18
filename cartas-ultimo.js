window.onload = function() {
	let datos = [];
	let xhttp = new XMLHttpRequest();

	xhttp.open("GET","bios.xml");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			datos = crearCartas(xhttp.responseXML);
		}
	}
	document.getElementById("entrada").addEventListener("keyup",()=>{
		let entrada, i, nombre, filtro_txt;
		entrada = document.getElementById("entrada");
		filtro_txt = entrada.value.toUpperCase();
		cartas = document.getElementsByClassName("carta");
		//
		for (i = 0; i < cartas.length; i++) {
			id = cartas[i].getAttribute("id");
			if (id) {
				nombre = datos[id].nombre+" "+datos[id].apellido+" "+datos[id].biografia;
				if (nombre.toUpperCase().indexOf(filtro_txt) > -1) {
					cartas[i].style.display = "";
				} else {
					cartas[i].style.display = "none";
				}
			}
		}
	});
}

function crearCartas(xmlDoc) {
	let mate = xmlDoc.documentElement.childNodes;
	let datos = [];
	//
	for (var i = 0; i < mate.length; i++) {
		if(mate[i].nodeType==1){
			m = mate[i].childNodes;
			datos.push({
				apellido:m[1].childNodes[0].nodeValue,
				nombre:m[3].childNodes[0].nodeValue,
				nacimiento:parseInt(m[5].childNodes[0].nodeValue),
				fallecimiento:parseInt(m[7].childNodes[0].nodeValue),
				imagen:m[9].childNodes[0].nodeValue,
				biografia:m[11].childNodes[0].nodeValue
			});
		}
	}
	delete mate,xmlDoc;
	datos.sort(function(a, b) {
		if (a.nacimiento > b.nacimiento) { return 1; }
		if (a.nacimiento < b.nacimiento) { return -1; }
		return 0;
	});
	//
	let cartas = document.getElementById("cartas");
	i=0;

	datos.forEach(a =>{
		let carta = document.createElement("div");
		let cartaInterior = document.createElement("div");
		let cartaFrente = document.createElement("div");
		let cartaInfo = document.createElement("div");
		//
		carta.setAttribute("class","carta");
		carta.setAttribute("id",i);
		cartaInterior.setAttribute("class","carta-interior");
		cartaFrente.setAttribute("class","carta-frente");
		cartaInfo.setAttribute("class","carta-info");
		//
		n = a.nombre+" "+a.apellido;
		f = a.nacimiento+"-"+a.fallecimiento;
		cartaFrente.innerHTML ='<img src="img/'+a.imagen+'" alt="'+n+'" style="width:300px; height:400px;">';
		cartaInfo.innerHTML = "<h1>"+n+"</h1><p>"+f+"</p><p>"+a.biografia.substring(0,350)+"</p>";
		//
		cartaInterior.appendChild(cartaFrente);
		cartaInterior.appendChild(cartaInfo);
		//
		carta.appendChild(cartaInterior);
		cartas.appendChild(carta);
		i++;
	});
	return datos;
}