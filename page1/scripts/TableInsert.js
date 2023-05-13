$(document).ready(function () {
    $("#get").click(function () {
        console.log('do');
        $("#oldCities").load('/getOldCities');
        $('#newCities').load('/getNewCities');
    });
    $("#sub").click(() => {
        $("#id02").css("display", "block");
    })
});