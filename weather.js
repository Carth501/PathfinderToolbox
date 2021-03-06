let weather = {

    climateKey: 'generic',

    initialize: function() {
        let me = this;
        grabTable(function(weatherTable){
            me.weatherTable = weatherTable;
            $("#RollWeatherButton").prop("disabled", false);
            $("#WeatherAdvancedButton").prop("disabled", false);
            $("#ClimateControls").removeClass("hiddenRadioButtons");
            $("#GenericWeatherRadio").prop("checked", true);
        });
    },

    roll: function(){
        let me = this;

        let climate = me.weatherTable[me.climateKey];
        let insightBlock = "";
        let roll = d100roll();
        let results = $.grep(climate.values, function(cond){
            return roll >= cond.min && roll <= cond.max;
        });
        let condition = results[0].condition;
        insightBlock = "Climate selected: " + me.climateKey + ", roll: " + roll + ", result: " + condition;
        $("#weatherResults").val(climate.name + ': ' + condition);
        $("#insightBlock").val(insightBlock);
    },

}

function d100roll() {
    return Math.floor(Math.random() * 100) + 1;
}

function d4roll() {
    return Math.floor(Math.random() * 4) + 1;
}

function d6roll() {
    return Math.floor(Math.random() * 6) + 1;
}

function grabTable(callback) {
    $.ajax("/json/WeatherTable.json").done(function(data){
        callback(JSON.parse(data));
    });
}

function toggleAdvanced() {
    let basic = $('#weather-basic'),
        advanced = $('#weather-advanced'),
        toggleButton = $('#WeatherAdvancedButton');

    if (advanced.hasClass('hide-form')) {
        basic.addClass('hide-form');
        advanced.removeClass('hide-form');
        toggleButton.html('Basic');
    } else {
        basic.removeClass('hide-form');
        advanced.addClass('hide-form');
        toggleButton.html('Advanced');
    }
}


weather.initialize();

$(document).ready(function() {
    $("form.climateSelector input:radio").change(function () {
        weather.climateKey = $(this).val();
    });
});
