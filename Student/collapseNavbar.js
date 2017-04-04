//Kollapser Navigationbar når man klikker på linkene i menyen

$(window).on("click", function(){
    $("#navbar").on("click", function(){
        $("#navbar").collapse('hide');
    });
    $("#dropdown-menu").on("click", function(){
        $("#navbar").collapse('toggle');
    });
});
