import axios from 'axios';
import Vue from 'vue';
import { trimObject } from './helper.js';

axios.defaults.baseURL = 'https://reclutamiento-be.herokuapp.com';

/**
 * Funcion generica para realizar una llamada a un servicio web
 * @param {any} url Endpoint
 * @param {any} method self.Constants.HTTPmethod(GET|PUT|PATCH|POST|DELETE)
 * @param {any} parameters parametros que se enviaran en la llamada
 * @param {any} contentType self.Constants.ContentType(URL|JSON)
 * @param {any} responseType self.Constants.ResponseType(TEXT|JSON)
 * @param {any} functionOnSuccess Funcion que se ejecutara cuando termine de manera exitosa la llamada
 * @param {any} showLoading TRUE si se desea mostrar un loading
 * @param {any} textLoading Texto que se desea mostrar en el loading
 * @param {any} functionError Funcion que se va a ejecutar cuando ocurra un error en la llamada
 * @param {any} viewError True si se esea ver el mensaje de error
 * Example this.$http('/endpoint', self.Constants.HTTPmethod.GET, parameters,
          self.Constants.ContentType.URL, self.Constants.ResponseType.JSON,
          function (response) {
            console.log("SUCESS");
          }, true, "Loading", function(error){console.log(error)}, true);
 */
export const $http = function (app, url, method, parameters, contentType, responseType,
                    functionOnSuccess, showLoading, functionError, viewError) {
  if (showLoading) {
    app.$store.state.isLoading = showLoading;
  }

  if (contentType == Vue.prototype.Constants.ContentType.JSON) {
    if (typeof parameters != "undefined") {
      parameters = trimObject(parameters);
    }
    parameters = JSON.stringify(parameters);
  }
  let headers = new Object();
  headers["content-type"] = contentType;
  headers["x-access-token"] = app.$store.state.token;

  axios({
    method: method,
    url: url,
    data: parameters,
    headers: headers,
    responseType: responseType
  }).then(function (response) {
    if (response.status.toString().startsWith("2")) {
      const data = response.data;
      if (data.STATUS == "SUCCESS") {
        //La respuesta fue exitosa
        if (functionOnSuccess) {
          functionOnSuccess(data.DATA);
        }
      } else {
        app.alert(app, app.Constants.DialogType.ALERT, app.Constants.Style.WARNING, "ERROR",
          data.MESSAGE, null, null, true, null, null);
      }
      
    } else {
      if (functionError) {
        functionError(response.status);
      } else if (viewError) {
        app.alert(app, app.Constants.DialogType.ALERT, app.Constants.Style.WARNING, "",
          response.status, null, null, true, null, null);
      }
    }
    if (showLoading != null) {
      app.$store.state.isLoading = false;
    }
  }).catch(function (error) {
    if (functionError) {
      functionError(error);
    }else if (viewError) {
      app.alert(app, app.Constants.DialogType.ALERT, app.Constants.Style.WARNING, "",
        error, null, null, true, null, null);
    }
      
      if (showLoading != null) {
        app.$store.state.isLoading = false;
      }
  });;

}
