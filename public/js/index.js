$(document).ready(function() {
    var lastResponse = 0;
    var dialog = document.getElementById('dialog');
    var $ingresarBtn = $('#ingresarBtn');
    var $btnTraerDatos = $('#btnTraerDatos');
    var $btnPostearDatos = $('#btnPostearDatos');

    var userInput = $('#userInput');
    var contenedorDatos = $('#contenedor .centre');
    var userName;

    dialog.showModal();

    function getHTMLPostData(data) {
        var elemHTML = $('<div></div>');
        elemHTML.html('<span>User:' + data.content.user +
            '</span><p>' + data.content.data + '</p>');
        return elemHTML;
    }

    // modal inicial
    $ingresarBtn.on('click', function() {
        dialog.close();
        userName = userInput.val();
        $('#userName').text(userName);
    });

    $btnTraerDatos.on('click', function() {
        $.ajax({
            type: 'GET',
            url: '/urlGet',
            success: function(data) {
                $('#contenedor .centre').append(data);
            },
            error: function() {
                // hubo un error
            }
        });
    });

    $btnPostearDatos.on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/urlPost',
            headers: {
                username: userName
            },
            success: function(data) {
                if (data) {
                    $('#contenedor .centre').append("sin usuario...");
                } else {
                    var stringSpan = getHTMLPostData(data);
                    $('#contenedor .centre').append(stringSpan);
                }
            },
            error: function() {
                // hubo un error
            }
        });
    });

});