$(document).ready(() => {
const theme = localStorage.getItem('theme');
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

$('#btn-vac1').click( () => {
  location.href = 'vacantes.html?vacList=vac1';
});

$('#btn-vac2').click( () => {
  location.href = 'vacantes.html?vacList=vac2';
});

const tbLoad = (vacList) => {
  fetch(vacList + '.txt')
    .then((respone) => respone.text())
    .then((content) => {
      elementos = content.split('\n').filter((x) => x.indexOf('#') !== -1);
      nombres = content.split('\n').filter((x) => x.indexOf('=') !== -1);
      horarios = content.split('\n').filter((x) => x.indexOf('+') !== -1);
      dias = content.split('\n').filter((x) => x.indexOf('!') !== -1);
      descs = content.split('\n').filter((x) => x.indexOf('*') !== -1);
      lugares = content.split('\n').filter((x) => x.indexOf('?') !== -1);

      elementos.forEach((elemento, index) => {
        let trVac = `<tr><th id="index${ index }" scope="row"></th><td id="place${ index }"></td><td id="sal${ index }"></td><td id="turno${ index }"></td><td class="td-btn"><button class="btn-ver" id="btn-ver${ index }">Ver</button></td></tr>`;
        $('tbody').append(trVac);
        const tbTitle = document.createElement('p');
        const tbLocat = document.createElement('p');
        tbTitle.textContent = index + 1;
        tbLocat.textContent = elemento.substring(1, elemento.length);
        $('#index' + index).append(tbTitle);
        $('#place' + index).append(tbLocat);
      });
      salarios = content.split('\n').filter((x) => x.indexOf('$') !== -1);
      salarios.forEach((salario, index) => {
        const tbSala = document.createElement('p');
        tbSala.textContent = salario.substring(1, salario.length);
        $('#sal' + index).append(tbSala);
      });

      turnos = content.split('\n').filter((x) => x.indexOf('/') !== -1);
      turnos.forEach((turno, index) => {
        const tbTurno = document.createElement('p');
        tbTurno.textContent = turno.substring(1, turno.length);
        $('#turno' + index).append(tbTurno);
        $('#btn-ver' + index).click( () => {
          localStorage.setItem('index', index + 1);
          let Ind = index;
          let shNam = nombres.find((nombre, index) => index === Ind);
          localStorage.setItem('nombre', shNam.substring(1, shNam.length));

          let shTrn = turnos.find((turno, index) => index === Ind);
          localStorage.setItem('turno', shTrn.substring(1, shTrn.length));

          let shHr = horarios.find((horario, index) => index === Ind);
          localStorage.setItem('horario', shHr.substring(1, shHr.length));

          let shDia = dias.find((dia, index) => index === Ind);
          localStorage.setItem('dia', shDia.substring(1, shDia.length));

          let shSal = salarios.find((salario, index) => index === Ind);
          localStorage.setItem('salario', shSal.substring(1, shSal.length));

          let shDesc = descs.find((desc, index) => index === Ind);
          localStorage.setItem('desc', shDesc.substring(1, shDesc.length));
          let shDir = lugares.find((lugar, index) => index === Ind);
          localStorage.setItem('direccion', shDir.substring(1, shDir.length));
          location.href = 'detalles-vacante.html';
        });
      });
    });
}

if (window.location.pathname.includes('vacantes.html')) {
  const urlP = new URLSearchParams(window.location.search);
  const vacList = urlP.get('vacList');
  tbLoad(vacList);
}
});