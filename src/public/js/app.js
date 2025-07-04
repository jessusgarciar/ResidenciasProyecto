function loadImage(url) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            const file = this.response;
            reader.readAsDataURL(file);
        };
        xhr.send();
    });
}


let signaturePad = null;

window.addEventListener('load', async () => {
    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});
    
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generatePDF();
    })
    
});

async function generatePDF() {
    const pdf = new jsPDF('p', 'pt', 'letter');

    // Cargar la imagen de fondo
    const image = await loadImage("/img/formulario.jpg");
    pdf.addImage(image, 'PNG', 0, 0, 565, 792);

    // Capturar los valores del formulario

    const fecha_solicitud = document.querySelector('#fecha_solicitud').value;
    const nombreProyecto = document.querySelector('#nombre_proyecto').value;
    const opcionElegida = document.querySelector('#opcion_elegida').value;
    const periodo = document.querySelector('#periodo').value;
    const anioPeriodo = document.querySelector('#anio').value;
    const numeroResidentes = document.querySelector('#numero_residentes').value;
    const empresaSelect = document.querySelector('#empresa_id');
    const empresaId = empresaSelect.value;
    const AsesorExterno= document.querySelector('#nombre_asesor_externo').value;
    const PuestoAsesor= document.querySelector('#puesto_asesor_externo').value;
    const carreraId = document.querySelector('#carreras').value;

    let carreraDatos = {};
    if (carreraId) {
        try {
            const response = await fetch(`/carreras/${carreraId}`);
            if (response.ok) {
                carreraDatos = await response.json();
            } else {
                console.error('Error al obtener los datos de la carrera');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    let empresaDatos = {};
    if (empresaId) {
        const response = await fetch(`/empresa/${empresaId}`);
        if (response.ok) {
            empresaDatos = await response.json();
        } else {
            console.error('Error al obtener los datos de la empresa');
        }
    }

        // Obtener los datos del alumno
    let alumnoDatos = {};
    try {
        const response = await fetch('/alumno');
        if (response.ok) {
            alumnoDatos = await response.json();
        } else {
            console.error('Error al obtener los datos del alumno');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }


        // Agregar los valores al PDF
    pdf.setFontSize(10);

    if (carreraDatos.coordinador) {
        pdf.text(`${carreraDatos.coordinador}`, 312, 215);
    }
    if (carreraDatos.nombre) {
        pdf.text(`${carreraDatos.nombre}`, 363, 231);
    }

    pdf.text(`${fecha_solicitud}`, 310, 190);
    pdf.text(`${nombreProyecto}`, 217, 255);

    // Marcar la opción elegida
    if (opcionElegida === 'opcion1') {
        pdf.text('X', 280, 293);
    }
    if (opcionElegida === 'opcion2') {
        pdf.text('X', 400, 293);
    }
    if (opcionElegida === 'opcion3') {
        pdf.text('X', 500, 293);
    }

    // Marcar el periodo
    if (periodo === 'ene') {
        pdf.text('Ene-Jun', 217, 323);
    }
    if (periodo === 'ago') {
        pdf.text('Ago-Dic', 217, 323);
    }

    pdf.text(`${anioPeriodo}`, 255, 323);

    // Marcar el número de residentes
    if (numeroResidentes === '1') {
        pdf.text('1', 490, 323);
    }
    if (numeroResidentes === '2') {
        pdf.text('2', 490, 323);
    }
    if (numeroResidentes === '3') {
        pdf.text('3', 490, 323);
    }

        // Agregar los datos de la empresa al PDF
    if (empresaDatos.nombre) {
        pdf.text(`${empresaDatos.nombre}`, 115, 370);
    }
    if (empresaDatos.empresa_sector) {
        if (empresaDatos.empresa_sector && empresaDatos.empresa_sector.trim() === 'INDUSTRIAL') {
            pdf.text('X', 185, 396); 
        }
        if (empresaDatos.empresa_sector && empresaDatos.empresa_sector.trim() === 'SERVICIOS') {
            pdf.text('X', 255, 396); 
        }
        if (empresaDatos.empresa_sector && empresaDatos.empresa_sector.trim() === 'OTRO') {
            pdf.text('X', 310, 396); 
        }
        if (empresaDatos.empresa_sector && empresaDatos.empresa_sector.trim() === 'PUBLICO') {
            pdf.text('X', 180, 407); 
        }
        if (empresaDatos.empresa_sector && empresaDatos.empresa_sector.trim() === 'PRIVADO') {
            pdf.text('X', 250, 407); 
        }
    }
    if (empresaDatos.rfc_empresa) {
        pdf.text(`${empresaDatos.rfc_empresa}`, 420, 396);
    }
    if (empresaDatos.domicilio) {
        pdf.text(`${empresaDatos.domicilio}`, 115, 427);
    }
    if (empresaDatos.colonia) {
        pdf.text(`${empresaDatos.colonia}`, 115, 450);
    }
    if (empresaDatos.codigo_postal) {
        pdf.text(`${empresaDatos.codigo_postal}`, 345, 450);
    }
    if (empresaDatos.ciudad) {
        pdf.text(`${empresaDatos.ciudad}`, 115, 473);
    }
    if (empresaDatos.telefono_empresa) {
        pdf.text(`${empresaDatos.telefono_empresa}`, 377, 475);
    }
    if (empresaDatos.mision) {
        pdf.text(`${empresaDatos.mision}`, 115, 500);
    }
    if (empresaDatos.titular_nombre) {
        pdf.text(`${empresaDatos.titular_nombre}`, 140, 610);
    }
    if (empresaDatos.titular_puesto) {
        pdf.text(`${empresaDatos.titular_puesto}`, 370, 610);
    }

    pdf.text(`${AsesorExterno}`, 140, 635);
    pdf.text(`${PuestoAsesor}`, 370, 635);

    if (empresaDatos.firmante_nombre) {
        pdf.text(`${empresaDatos.firmante_nombre}`, 190, 668);
    }
    if (empresaDatos.firmante_puesto) {
        pdf.text(`${empresaDatos.firmante_puesto}`, 370, 668);
    }

    pdf.addPage();

    const image2 = await loadImage("/img/formulario2.jpg");
    const signatureImage = signaturePad.toDataURL();
    pdf.addImage(image2, 'PNG',0,0,565,792);
    pdf.addImage(signatureImage, 'PNG', 200, 615, 300, 215);

    if (alumnoDatos.nombre) {
        pdf.text(`${alumnoDatos.nombre}`, 105, 155);
    }
    if (alumnoDatos.carrera) {
        pdf.text(`${alumnoDatos.carrera}`, 105, 175);
    }
    if (alumnoDatos.num_control) {
        pdf.text(`${alumnoDatos.num_control}`, 400, 175);
    }
    if (alumnoDatos.domicilio) {
        pdf.text(`${alumnoDatos.domicilio}`, 105, 205);
    }
    if (alumnoDatos.email_alumno) {
        pdf.text(`${alumnoDatos.email_alumno}`, 105, 230);
    }
    if (alumnoDatos.institucion_salud){
        if (alumnoDatos.institucion_salud && alumnoDatos.institucion_salud.trim() === 'IMSS') {
            pdf.text('X', 384, 228); 
        }
        if (alumnoDatos.institucion_salud && alumnoDatos.institucion_salud.trim() === 'ISSSTE') {
            pdf.text('X', 445, 228); 
        }
        if (alumnoDatos.institucion_salud && alumnoDatos.institucion_salud.trim() === 'OTRO') {
            pdf.text('X', 443, 250); 
        }
    }

    if (alumnoDatos.num_seguro_social){
        pdf.text(`${alumnoDatos.num_seguro_social}`, 352, 264);
    }

    if (alumnoDatos.comentario_ciudad){
        pdf.text(`${alumnoDatos.comentario_ciudad}`, 105, 287);
    }
    if (alumnoDatos.telefono){
        pdf.text(`${alumnoDatos.telefono}`, 352, 287);
    }


    // Guardar el PDF
    pdf.save("solicitud.pdf");
}

window.addEventListener('load', () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío del formulario
        generatePDF(); // Genera el PDF
    });
});
