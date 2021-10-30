function lastVideoData() {
  // Resultados por pagina
  var resPorPagina = 1;
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

  //Obtenemos el texto sin formato de la url
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function (params) {
    if (this.readyState == 4 && this.status == 200) {
      //Mostramos el texto una vez obtenido
      //console.log(this.responseText);
      //Creacion de JSON para mejor manejo de datos
      let datos = JSON.parse(this.responseText);
      console.log(datos.items[0].id.videoId);
      let titulo = datos.items[0].snippet.title;
      let descripcion = datos.items[0].snippet.description;
      let url_img = datos.items[0].snippet.thumbnails.high.url;
      //!! --------------------------------------------Aqui me quedeee */
      let url_video =
        "https://www.youtube.com/watch?v=" + datos.items[0].id.videoId;
    }
  };

  console.log("correcto final");
}

function lastVideoDataBorrador() {
  //Arraylist con los datos del video
  let datosVideo = [];
  var nextPageToken = "";
  // Resultados por pagina
  var resPorPagina = 1;
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

  $("#show-last-video").append(url);
  $.getJSON(url, function (data) {
    for (var k in data.items) {
      //Agrega el titulo al array
      datosVideo.push(data.items[k]["snippet"].title);
      //Agrega el url al array
      datosVideo.push(
        "https://www.youtube.com/watch?v=" + data.items[k]["id"].videoId
      );
      //Agrega el descripcion al array
      datosVideo.push(data.items[k]["snippet"].description);
      //Agrega el url-IMG al array
      datosVideo.push(data.items[k]["snippet"].thumbnails.high.url);

      for (let index = 0; index < datosVideo.length; index++) {
        console.log(datosVideo[index]);
      }
    }
  });
}
