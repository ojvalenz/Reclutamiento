const db = require("./db");
const PQ = require("pg-promise").ParameterizedQuery;
const helper = require("pg-promise")().helpers;
const persona = require("./personas");

const tbl_evaluaciones = helper.ColumnSet(
  ["id_persona", "id_vacante", "fecha_evaluacion:raw", "veredicto"],
  {
    table: "evaluaciones"
  }
);
const tbl_evaluaciones_candidatos = helper.ColumnSet(
  ["id_evaluacion", "id_candidato", "id_skill", "calificacion", "comentarios"],
  {
    table: "evaluaciones_candidatos"
  }
);

function asignarVacantesEvaluador(obj) {
  let query = helper.insert(
    obj,
    ["id_persona", "id_vacante"],
    "evaluador_vacantes"
  );
  return db.none(query);
}

function getVacantesEvaluar(id_evaluador) {
  return db.task(t => {
    return t.batch([
      t.any(
        "select v.* from vacantes v, evaluador_vacantes ev where ev.id_vacante = v.id_vacante and  ev.id_persona = $1;",
        id_evaluador
      ),
      t.one(persona.getPersona(id_evaluador))
    ]);
  });
}

function insertEvaluacion(obj) {
  let evaluacion = obj.evaluacion;
  let calificaciones = obj.calificaciones;

  evaluacion.fecha_evaluacion = "current_date";
  let query =
    helper.insert(evaluacion, tbl_evaluaciones) + " RETURNING id_evaluacion";

  return db.tx(tx => {
    return tx
      .map(query, null, evaluacion => {
        calificaciones = calificaciones.map(i => {
          i.id_evaluacion = evaluacion.id_evaluacion;
          return i;
        });
        let query = helper.insert(calificaciones, tbl_evaluaciones_candidatos);
        return tx.none(query);
      })
      .then(tx.batch);
  });
}

function getEvaluaciones() {
  return db.task(t => {
    return t
      .map("SELECT * FROM evaluaciones;", null, evaluacion => {
        return t
          .batch([
            t.one(persona.getPersona(evaluacion.id_persona)),
            t.one(
              "SELECT * FROM vacantes WHERE id_vacante = ${id_vacante}",
              evaluacion
            )
          ])
          .then(data => {
            evaluacion.evaluador = data[0];
            evaluacion.vacante = data[1];
            return evaluacion;
          });
      })
      .then(t.batch);
  });
}

module.exports = {
  asignarVacantesEvaluador,
  getVacantesEvaluar,
  insertEvaluacion,
  getEvaluaciones
};
