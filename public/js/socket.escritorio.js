var socket = io();

//obtener informacion del url
var searchParams = new URLSearchParams(window.location.search);

//.has para preguntar si se tiene ese valor
if (!searchParams.has('escritorio')) {
    //redirecciona al index
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

//.get para obtenr el valor del escritorio
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(ticketAAtender) {

        if (ticketAAtender === 'No hay tickets') {
            alert(ticketAAtender);
            label.text(ticketAAtender);
            return;
        }

        label.text(ticketAAtender.numero);
    });
});