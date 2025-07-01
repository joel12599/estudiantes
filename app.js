const express = require("express");
const cors = require("cors");
const app = express();
const conexion = require("./databd"); // ✅ CORREGIDO

app.use(cors());
app.use(express.json());

app.get("/estudiantes", (req, res) => {
  conexion.query("SELECT * FROM estudiantes", (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: "Error al cargar estudiantes" });
    res.json(resultados);
  });
});

app.post("/estudiantes", (req, res) => {
  const { documento, nombre, fechaNacimiento, semestre, programa } = req.body;
  if (!documento || !nombre || !fechaNacimiento || !semestre || !programa) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
  }

  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - nacimiento.getFullYear();

  const sql = "INSERT INTO estudiantes (documento, nombre, edad, semestre, programa) VALUES (?, ?, ?, ?, ?)";
  conexion.query(sql, [documento, nombre, edad, semestre, programa], (err) => {
    if (err) return res.status(500).json({ mensaje: "Error al registrar estudiante" });
    res.json({ mensaje: "Estudiante registrado exitosamente." });
  });
});

app.put("/estudiantes/:documento", (req, res) => {
  const { semestre, programa } = req.body;
  const documento = req.params.documento;

  if (!semestre || !programa) {
    return res.status(400).json({ mensaje: "Faltan datos para actualizar" });
  }

  const sql = "UPDATE estudiantes SET semestre = ?, programa = ? WHERE documento = ?";
  conexion.query(sql, [semestre, programa, documento], (err, resultado) => {
    if (err) return res.status(500).json({ mensaje: "Error al actualizar estudiante" });
    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    res.json({ mensaje: "Estudiante actualizado correctamente" });
  });
});

app.delete("/estudiantes/:documento", (req, res) => {
  const documento = req.params.documento;
  const sql = "DELETE FROM estudiantes WHERE documento = ?";
  conexion.query(sql, [documento], (err, resultado) => {
    if (err) return res.status(500).json({ mensaje: "Error al eliminar estudiante" });
    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    res.json({ mensaje: "Estudiante eliminado correctamente" });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
