/**
 * Verifica si una variable esta esta vacia o es nula,
 * Si la variable no tiene valor retorna TRUE
 * @param {any} variable
 */
export const isEmpty = function (variable) {
  if (typeof variable == 'undefined' || variable == null || variable == "") {
    return true;
  } else {
    return false;
  }
}

/**
 * Funcion para eliminar los espacios iniciales y finales de todas las propiedades de tipo string de un objeto
 * @return Recupera un objeto sin atributos con espacios iniciales y espacios finales
 */
export const trimObject = function(object) {
  if (object != null) {
    for (var property in object) {
      if (object[property] != null && typeof object[property] == "object" || object[property] == "array") {
        object[property] = trimObject(object[property]);
      } else if (object[property] != null && typeof object[property] == "string") {
        object[property] = object[property].trim();
      } else {
        object[property] = object[property];
      }
    }
  }
  return object;
}

/**
 * Metodo para mostrar un dialogo. <br>
 * @param app Instancia actual de VUE (this)
 * @param dialogType Constants.DialogType(ALERT|CONFIRM)<br>
 * @param style Constants.Style(DANGER | INFO | SUCCESS | WARNING)<br>
 * @param title titulo del dialogo<br>
 * @param message mensaje del dialogo<br>
 * @param okText texto del boton de aceptar<br>
 * @param cancelText texto del boton de cancelar<br>
 * @param backdropClose true si se desea cerrar el dialogo cuando se de clic fuera del dialogo <br>
 * @param functionOk funcion que se ejecutara cuando se de clic al boton de aceptar. <br>
 * @param functionCloseOrCancel funcion que se ejecutara cuando se cierre el dialogo o se de clic en cancelar
 */
export const alert = function(app, dialogType, style, title, message, okText, cancelText, backdropClose, functionOk, functionCloseOrCancel) {
  let messageComposed = { title: title, body: message };
  let options = {
    html: true, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
    okText: (okText ? okText : "Aceptar"),
    cancelText: (cancelText ? cancelText : "Cancelar"),
    backdropClose: backdropClose, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
  };

  app.$dialog[dialogType](messageComposed, options)
    .then(function () {
      if (functionOk) {
        functionOk();
      } else if (functionCloseOrCancel) {
        functionCloseOrCancel();
      }
    }).catch(function () {
      if (functionCloseOrCancel) {
        functionCloseOrCancel();
      }
    });
  setTimeout(function () { document.getElementsByClassName("dg-btn--ok")[0].className += (" btn-" + style.dialog);}, 10);
}

/**
 * Metodo para mostrar una notificacion. <br>
 * @param app Instancia actual de VUE (this)
 * @param style Constants.StyleNotify(INFO | ERROR | SUCCESS | WARNING)<br>
 * @param title titulo de la notificacion<br>
 * @param message mensaje de la notificacion<br>
 * @param timeout tiempo que estara abierta la notificacion <br><br>
 * 
 * openNotification(Constants.StyleNotify.INFO, "Felicidades", "Felices fiestas a todos", 5000);
 */
export const notify = function(app, style, title, message, timeout) {
  app.$snotify[style.notify](message, title, {
    timeout: (timeout ? timeout : 3000),
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: 'rightTop'
  });
}

export const formatDate = function (app, date) {
  return app.moment(Number(date)).format('DD-MM-YYYY HH:mm a');
}
