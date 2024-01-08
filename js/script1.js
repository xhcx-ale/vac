var chosInd = localStorage.getItem('index'),
  nombre = localStorage.getItem('nombre'),
  turno = localStorage.getItem('turno'),
  horario = localStorage.getItem('horario'),
  dia = localStorage.getItem('dia'),
  salario = localStorage.getItem('salario'),
  descripcion = localStorage.getItem('desc'),
  direccion = localStorage.getItem('direccion');

$('#nmVac').text(nombre);
$('#vacTur').text(turno);
$('#vacHr').text(horario);
$('#vacDia').text(dia);
$('#vacSal').text(salario);
$('#vacDesc').text(descripcion);
$('#vacDir').text(direccion);

var theme = localStorage.getItem('theme');
$('body').attr('data-bs-theme', theme);
if ( theme == 'dark' ) {
  $('body').removeClass('light');
  $('body').addClass('dark');
} else {
  $('body').removeClass('dark');
  $('body').addClass('light');
}

$('#light').click( () => {
  $('body').attr('data-bs-theme', 'light');
  $('body').removeClass('dark');
  $('body').addClass('light');
  localStorage.setItem('theme', 'light');
});

$('#dark').click( () => {
  $('body').attr('data-bs-theme', 'dark');
  $('body').removeClass('light');
  $('body').addClass('dark');
  localStorage.setItem('theme', 'dark');
});

$('#wsp').click( () => {
  var msg = `Hola, me interesa la vacante ${ nombre }, turno ${ turno }, en ${ direccion}.`;
  location.href = `https://wa.me/528131715194/?text=${ msg }`;
});

$(document).ready(function () {
  var divMap = redrawMap();
  $('#mapa').append(divMap);
});

var title = 'Test';
var street = direccion;
var coord = '';
var mType = '';
var mapWidth = 100 + '%';
var mapHeight = 400;
var mapZoom = 14;

function redrawMap() {
  var iframeUrl = generateMapUrl();
  var finalCode = getFinalWidgetCode();
  var finc = `<div style="width: 100%">${ finalCode }</div>`;
  return finc;
}

function getFinalWidgetCode() {
  var $iframe = getIFrame();
  $iframe.append(getLinkBaitScript());
  var finalWidgetCode = $iframe.wrap('<div />').parent().html();
  return finalWidgetCode;
}

function getIFrame() {
  var $iframe = $("<iframe></iframe>");
  $iframe.attr("width", mapWidth);
  $iframe.attr("height", mapHeight);
  $iframe.attr("frameborder", "0");
  $iframe.attr("scrolling", "no");
  $iframe.attr("marginheight", 0);
  $iframe.attr("marginwidth", 0);
  $iframe.attr("src", generateMapUrl());
  return $iframe;
}

function getLinkBaitScript() {
  var z = 5;

  var texte = new Array(z);
  texte[0] = "Sat Navs";
  texte[1] = "GPS devices";
  texte[2] = "Car GPS";
  texte[3] = "Car Navigation Systems";
  texte[4] = "GPS car tracker";

  var jetzt = new Date();

  z = jetzt.getSeconds() % z;

  var linkText = texte[z];

  var linkBaitCode =
    '<a href="https://www.gps.ie/car-satnav-gps/">' + linkText + "</ a>";

  return linkBaitCode;
}

function generateMapUrl() {
  var googleMapsHostUrl = "https://maps.google.com/maps";

  var query = "";

  if (street !== "") {
    query = street + "+(" + title + ")";
  } else {
    query = coord + "+(" + title + ")";
  }

  var urlParams = {
    width: mapWidth,
    height: mapHeight,
    hl: "es",
    q: query,
    t: mType,
    z: mapZoom,
    ie: "UTF8",
    iwloc: "B",
    output: "embed",
  };

  var paramString = "";

  for (var key in urlParams) {
    paramString += key + "=" + urlParams[key] + "&";
  }
  var fullUrl =
    googleMapsHostUrl + "?" + encodeURI(paramString.replace(/.$/, ""));
  return fullUrl;
}
redrawMap();
