export const bean_Persona = function () {
  return {
    nombre: null,
    apellido_paterno: null,
    apellido_materno: null,
    tel_celular: null,
    email: null
  }
}

export const bean_Candidato = function () {
  return {
    pais: null,
    ciudad: null,
    codigo_postal: null,
    fecha_graduacion: null,
    universidad: null,
    curriculum_vitae: null,
    cv_digital: null,
    foto: null,
    skype: null,
    grado_estudios: null,
    grado_ingles: null,
    skills: []
  }
}

export const bean_Vacante = function () {
  return {
    nombre_corto: null,
    descripcion: null,
    id_tiempo_vacante: null,
    id_tipo_contrato: null,
    ciudad: null,
    duracion: null,
    requerimientos: null,
    costo_maximo: null,
    fecha_inicio: null,
    posiciones: null,
    prioridad: null,
    comentarios: null,
    grupo_skills: []
  }
}
