jQuery(document).ready(function($){
    $("#logout").click(function(e){
        e.preventDefault();
        $('#dologout').submit();
    });
});
