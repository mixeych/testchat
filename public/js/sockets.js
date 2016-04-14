var socket = io.connect('http://localhost:3000');

socket.on("chat", function (data){
    $("#chat ul").append("<li>"+data+"</li>");
});
$(document).ready(function(){
    socket.on('connect', function(){
        $("#chat p").text('connection is established');
    });
    socket.on('disconnect', function(){
        $("#chat p").text('connection is failed');
    });
    $("form.chat-action").submit(function(e){
        e.preventDefault();
        var message = $("#sender").val();

        socket.emit("message", message, function(data){
            $("#chat ul").append("<li>"+message+"</li>");
            console.log(data);
        });

    })
});
