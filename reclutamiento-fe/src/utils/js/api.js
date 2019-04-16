
export const api_Login = (app, parameters, functionOnSuccess, functionOnError) => {
  app.$http(app, '/login', app.Constants.HTTPmethod.POST, parameters, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, true, functionOnError, true);
}

export const api_GetSkills = (app, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/skills', app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}


export const api_SaveCandidato = (app, candidato, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/candidatos/new', app.Constants.HTTPmethod.POST, candidato, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_UpdateCandidato = (app, candidato, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/candidatos', app.Constants.HTTPmethod.PUT, candidato, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_GetCandidato = (app, id_candidato, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/candidatos/' + id_candidato, app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_GetCandidatos = (app, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/candidatos', app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}


export const api_GetCatalogsVacante = (app, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/vacantes/vacante/new', app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_GetVacante = (app, id_vacante, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/vacantes/' + id_vacante, app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_GetVacantes = (app, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/vacantes', app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_SaveVacante = (app, vacante, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/vacantes', app.Constants.HTTPmethod.POST, vacante, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_UpdateVacante = (app, vacante, showLoading, functionOnSuccess, functionOnError) => {
  app.$http(app, '/vacantes', app.Constants.HTTPmethod.PUT, vacante, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}

export const api_SaveNota = (app, nota, showLoading, functionOnSuccess, functionOnError) => {
  //Se debe ajustar este servicio para llamar el endpoint de GUARDAR NOTA
  app.$http(app, '/notas', app.Constants.HTTPmethod.POST, nota, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_GetNotas = (app, id_candidato, showLoading, functionOnSuccess, functionOnError) => {
  //Se debe ajustar este servicio para llamar el endpoint de RECUPERAR NOTAS
  app.$http(app, '/notas/' + id_candidato, app.Constants.HTTPmethod.GET, null, app.Constants.ContentType.URL, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}
export const api_DeleteNota = (app, id_nota, showLoading, functionOnSuccess, functionOnError) => {
  //Se debe ajustar este servicio para llamar el endpoint de ELIMINAR NOTA
  app.$http(app, '/notas/' + id_nota, app.Constants.HTTPmethod.DELETE, {}, app.Constants.ContentType.JSON, app.Constants.ResponseType.JSON,
    functionOnSuccess, showLoading, functionOnError, true);
}

