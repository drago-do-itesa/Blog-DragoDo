function videoDataJSON() {
  // Resultados por pagina
  var resPorPagina = 50;
  // Paginas a mostrar
  var paginas = 1;
  //Clave de la api de mi canal
  var key = "AIzaSyBzAO69uRpQOZHoGjMnC5uiQnDlWaXAEVU";
  //Id de mi canal
  var idCanal = "UCBcxQfwjGiflQdiL5wYcZOQ";
  //Url que llamara a la API y regresa un JSON
  var url =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    key +
    "&channelId=" +
    idCanal +
    "&part=snippet,id&order=date&maxResults=" +
    resPorPagina;

  console.log(url);
  //Obtenemos el texto sin formato de la url
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function (params) {
    if (this.readyState == 4 && this.status == 200) {
      //Mostramos el texto una vez obtenido
      //*console.log(this.responseText);
      //Creacion de JSON para mejor manejo de datos
      let datos = JSON.parse(this.responseText);
      //* console.log(datos.items[0].id.videoId);
      //Una vez que creamos el JSON, ahora extraemos los datos de este para guardarlos en variables.
      let title = datos.items[0].snippet.title;
      let description = datos.items[0].snippet.description;
      let url_img = datos.items[0].snippet.thumbnails.high.url;
      let url_video =
        "https://www.youtube.com/watch?v=" + datos.items[0].id.videoId;
      lastVideoData(title, description, url_img, url_video);
    }
  };
}

function lastVideoData(title, description, url_img, url_video) {
  //Ahora utilizamos estas variables para modificar el DOM y que se actualizen los datos de manera automatica de acuerdo al ultimo video subido
  document.getElementById("video-title").textContent = title;
  document.getElementById("video-description").textContent = description;
  document.getElementById("show-last-video").style.backgroundImage =
    "url('" + url_img + "')";
  document.getElementById("video-url").setAttribute("href", url_video);
}
