/**
 * @JSdoc Object
 * @name constants.js
 * @description Declara las variables que se consideran constantes dentro de la
 *              aplicacion.
 *
 */
export const Constants = (function () {
  var self = {};

  /**
   * @JSdoc Object
   * @name Context
   *
   * @description Constantes de contexto de aplicacion.
   */
  self.Context = {
    CTX_PATH: '',
    APP_PATH: '',
    IMG_PATH: '',
    APP_LOCALE: ''
  };

  /**
   * @JSdoc Object
   * @name Validacion
   *
   * @description Constantes para validaciones.
   */
  self.Validation = {
    REGEX_RFC: /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/,
    REGEX_CORREO: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    REGEX_CARACTERES_ALFABETICO: '^[a-zA-Z\ \'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]+$',
    REGEX_CARACTERES_ALFANUMERICO: '^[a-zA-Z0-9\ \'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]+$',
    REGEX_CARACTERES_ALFANUMERICO_PLUS: '^[a-zA-Z0-9-\ \'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]+$',
    REGEX_CARACTERES_CORREO: '^[a-zA-Z0-9\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC\u0040\u005F\u002E\u002D]+$',
    REGEX_CARACTERES_ALFANUMERICO_CON_ESPACIO: '^[ñÑa-zA-Z0-9_ ]*$',
    REGEX_VALID_PASSWORD: /(?=^.{8,20}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/,
    REGEX_VALID_USERNAME: /^[a-z\d_]{4,20}$/i,
    REGEX_VALID_URL: "^(www\\.|WWW\\.|((ftp|FTP|http|HTTP|https|HTTPS):\/\/))(.*\.(mx$|edu$|to$|net$|com$|org$|info$|\/$|([a-zA-Z0-9]{2,5})$)|)$"
  };

  /**
   * @JSdoc Object
   * @name Inputmask
   *
   * @description Constantes para mascaras en campos de entrada.
   */
  self.Inputmask = {
    DATE_MASK: 'yyyy/mm/dd',
  };

  self.HTTPmethod = {
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    GET: 'GET',
    DELETE: 'DELETE'
  };

  self.ResponseType = {
    JSON: 'json',
    TEXT: 'text'
  };

  self.ContentType = {
    JSON: 'application/json;charset=UTF-8',
    URL: 'application/x-www-form-urlencoded;charset=UTF-8'
  };

  self.DialogType = { //Tipos de dialogos
    ALERT: "alert",
    CONFIRM: "confirm"
  }

  self.Style = { //Estilos que se aplican en los dialogos y en las notificaciones
    INFO: { dialog: 'primary', notify: 'info'},
    DANGER: { dialog: 'danger', notify: 'error' },
    SUCCESS: { dialog: 'success', notify: 'success' },
    WARNING: { dialog: 'warning', notify: 'warning' }
  }

  return self;
}());
