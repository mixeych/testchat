jQuery(document).ready(function($){
    $("#logout").click(function(e){
        e.preventDefault();
        $('<form action="/logout" method="post"></form>').submit();
    });
});
