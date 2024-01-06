var theme = localStorage.getItem("theme");
$("body").attr("data-bs-theme", theme);
$("#light").on("click", function () {
  $("body").attr("data-bs-theme", "light");
  localStorage.setItem("theme", "light");
});

$("#dark").on("click", function () {
  $("body").attr("data-bs-theme", "dark");
  localStorage.setItem("theme", "dark");
});
var list = localStorage.getItem("list");
if (list == 1) {
  var vacList = "vac1";
} else if (list == 2) {
  var vacList = "vac2";
}
function tbLoad() {
  fetch(vacList + ".txt")
    .then((respone) => respone.text())
    .then((content) => {
      elementos = content.split("\n").filter((x) => x.indexOf("#") !== -1);
      nombres = content.split("\n").filter((x) => x.indexOf("=") !== -1);
      horarios = content.split("\n").filter((x) => x.indexOf("+") !== -1);
      dias = content.split("\n").filter((x) => x.indexOf("!") !== -1);
      descs = content.split("\n").filter((x) => x.indexOf("*") !== -1);
      lugares = content.split("\n").filter((x) => x.indexOf("?") !== -1);

      elementos.forEach((elemento, index) => {
        var trVac =
          '<tr><th id="index' +
          index +
          '" scope="row"></th><td id="place' +
          index +
          '"></td><td id="sal' +
          index +
          '"></td><td id="turno' +
          index +
          '"></td><td class="td-btn"><button class="btn-ver" id="btn-ver' +
          index +
          '">Ver</button></td></tr>';
        $("tbody").append(trVac);
        var tbTitle = document.createElement("p");
        var tbLocat = document.createElement("p");
        tbTitle.textContent = index + 1;
        tbLocat.textContent = elemento.substring(1, elemento.length);
        $("#index" + index).append(tbTitle);
        $("#place" + index).append(tbLocat);
      });
      salarios = content.split("\n").filter((x) => x.indexOf("$") !== -1);
      salarios.forEach((salario, index) => {
        var tbSala = document.createElement("p");
        tbSala.textContent = salario.substring(1, salario.length);
        $("#sal" + index).append(tbSala);
      });

      turnos = content.split("\n").filter((x) => x.indexOf("/") !== -1);
      turnos.forEach((turno, index) => {
        var tbTurno = document.createElement("p");
        tbTurno.textContent = turno.substring(1, turno.length);
        $("#turno" + index).append(tbTurno);
        $("#btn-ver" + index).on("click", function () {
          localStorage.setItem("index", index + 1);
          var Ind = index;
          var shNam = nombres.find((nombre, index) => index === Ind);
          localStorage.setItem("nombre", shNam.substring(1, shNam.length));

          var shTrn = turnos.find((turno, index) => index === Ind);
          localStorage.setItem("turno", shTrn.substring(1, shTrn.length));

          var shHr = horarios.find((horario, index) => index === Ind);
          localStorage.setItem("horario", shHr.substring(1, shHr.length));

          var shDia = dias.find((dia, index) => index === Ind);
          localStorage.setItem("dia", shDia.substring(1, shDia.length));

          var shSal = salarios.find((salario, index) => index === Ind);
          localStorage.setItem("salario", shSal.substring(1, shSal.length));

          var shDesc = descs.find((desc, index) => index === Ind);
          localStorage.setItem("desc", shDesc.substring(1, shDesc.length));
          var shDir = lugares.find((lugar, index) => index === Ind);
          localStorage.setItem("direccion", shDir.substring(1, shDir.length));
          location.href = "detalles-vacante.html";
        });
      });
    });
}

$(document).ready(function () {
  tbLoad();
});
$("#btn-vac1").on("click", function () {
  localStorage.setItem("list", 1);
  location.href = "vacantes.html";
});
$("#btn-vac2").on("click", function () {
  localStorage.setItem("list", 2);
  location.href = "vacantes.html";
});
