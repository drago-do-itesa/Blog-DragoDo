function videoDataJSON() {
  // Resultados por pagina
  var resPorPagina = 50;
  // Paginas a mostrar
  var paginas = 50;
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

  // console.log(url);
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
      let title = [];
      let description = [];
      let url_img = [];
      let url_video = [];
      let url_blog = [];

      for (let index = 0; index < 8; index++) {
        title.push(datos.items[index].snippet.title);
        description.push(datos.items[index].snippet.description);
        url_img.push(datos.items[index].snippet.thumbnails.high.url);
        url_video.push(
          "https://www.youtube.com/watch?v=" + datos.items[index].id.videoId
        );
        url_blog.push("/blogs/" + datos.items[index].id.videoId);
      }

      // metodos para rellenar cabecera y grid
      lastVideoData(title[0], description[0], url_img[0], url_video[0]);

      videosOnGrid(title, description, url_img, url_video, url_blog);
    }
  };
}

function videosOnGrid(title, description, url_img, url_video, url_blog) {
  let identificador = 1;
  for (let index = 0; index < 8; index++) {
    document
      .getElementById("video-cards-img-" + identificador)
      .setAttribute("src", url_img[index]);

    document.getElementById("video-cards-title-" + identificador).textContent =
      title[index];

    document.getElementById("video-cards-desc-" + identificador).textContent =
      description[index];

    document
      .getElementById("video-cards-blog-" + identificador)
      .setAttribute("href", url_blog[index]);

    document
      .getElementById("video-cards-vid-" + identificador)
      .setAttribute("href", url_video[index]);

    identificador++;
  }
}

function lastVideoData(title, description, url_img, url_video) {
  //Ahora utilizamos estas variables para modificar el DOM y que se actualizen los datos de manera automatica de acuerdo al ultimo video subido
  document.getElementById("video-title").textContent = title;
  document.getElementById("video-description").textContent = description;
  document.getElementById("show-last-video").style.backgroundImage =
    "url('" + url_img + "')";
  document.getElementById("video-url").setAttribute("href", url_video);
}
