var express = require("express");
var router = express.Router();
const model = require("../models/evaluaciones");

router.post("/asignar/vacantes/evaluador", (rq, rs) => {
  model
    .asignarVacantesEvaluador(rq.body)
    .then(() => {
      rs.status(200).send("");
    })
    .catch(err => {
      rs.status(500).json(err);
    });
});

router.get("/vacantes/evaluar/:id_evaluador", (rq, rs) => {
  model
    .getVacantesEvaluar(rq.params.id_evaluador)
    .then(data => {
      rs.status(200).json({ evaluaciones: data[0], persona: data[1] });
    })
    .catch(err => {
      rs.status(500).json(err);
    });
});

router.post("/guardar/evaluacion", (rq, rs) => {
  model
    .insertEvaluacion(rq.body)
    .then(d => {
      rs.status(200).json(d);
    })
    .catch(err => {
      console.log(err);
      rs.status(500).json(err);
    });
});

router.get("/", (rq, rs) => {
  model
    .getEvaluaciones()
    .then(evaluaciones => {
      rs.status(200).json(evaluaciones);
    })
    .catch(err => rs.status(500).json(err));
});

module.exports = router;
