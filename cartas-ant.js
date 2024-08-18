window.onload = function() {
	let datos = [];
	let xhttp = new XMLHttpRequest();

	xhttp.open("GET","bios.xml");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			crearCartas(xhttp.responseXML);
		}
	}
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
	console.log(datos);
}