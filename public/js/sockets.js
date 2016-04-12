var socket = io.connect('http://localhost:3000');
socket.on("chat", function (data){
    $("#chat ul").append("<li>"+data+"</li>");
});
$(document).ready(function(){
    $("button").click(function(){
        var message = $("#sender").val();

        socket.emit("message", message, function(data){
            $("#chat ul").append("<li>"+message+"</li>");
            console.log(data);
        });

    })
});
