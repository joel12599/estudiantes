async function cargarEstudiantes() {
  try {
    const res = await fetch("http://localhost:3000/estudiantes");
    const data = await res.json();

    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    data.forEach(est => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${est.documento}</td>
        <td>${est.nombre}</td>
        <td>${est.edad}</td>
        <td>${est.semestre}</td>
        <td>${est.programa}</td>
        <td>
          <button class="btn-editar" onclick='editarEstudiante(${JSON.stringify(est)})'>Editar</button>
          <button class="btn-eliminar" onclick='eliminarEstudiante("${est.documento}")'>Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {}
}

document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const estudiante = {
    documento: document.getElementById("documento").value,
    nombre: document.getElementById("nombre").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    semestre: document.getElementById("semestre").value,
    programa: document.getElementById("programa").value
  };

  const res = await fetch("http://localhost:3000/estudiantes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estudiante)
  });

  const data = await res.json();
  alert(data.mensaje);
  cargarEstudiantes();
  this.reset();
});

async function editarEstudiante(est) {
  const semestre = prompt("Nuevo semestre:", est.semestre);
  const programa = prompt("Nuevo programa:", est.programa);

  if (!semestre || !programa) return;

  const actualizado = { semestre, programa };

  const res = await fetch(`http://localhost:3000/estudiantes/${est.documento}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actualizado)
  });

  const data = await res.json();
  alert(data.mensaje);
  cargarEstudiantes();
}

async function eliminarEstudiante(documento) {
  if (!confirm("¿Estás seguro de eliminar este estudiante?")) return;

  const res = await fetch(`http://localhost:3000/estudiantes/${documento}`, {
    method: "DELETE"
  });

  const data = await res.json();
  alert(data.mensaje);
  cargarEstudiantes();
}

window.onload = cargarEstudiantes;
