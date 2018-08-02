let UWWeather = {

    climateKey: 'temperate',
    altitudeKey: 'lowland',
    seasonKey: 'summer',

    initialize: function() {
        let me = this;
        grabTable(function(tempBaselines){
            me.tempBaselines = tempBaselines;
            $("#RollUWWeatherButton").prop("disabled", false);
            $("#UWSettings").removeClass("hiddenRadioButtons");
            $("#UWTemperateWeatherRadio").prop("checked", true);
            $("#UWLowlandAltitudeRadio").prop("checked", true);
            $("#UWSummerSeasonRadio").prop("checked", true);
        });
    },


    roll: function()
    {
        let me = this;
        //let climate = me.UWWeatherTable[me.climateKey];
        let insightBlock = "";
        //let roll = diceRoll(1, 100);
        //let results = $.grep(climate.values, function(cond){
        //    return roll >= cond.min && roll <= cond.max;
        //});
        $("#UWWeatherResults").val(this.formatWeatherForecast());
        //insightBlock = "Roll: " + roll;
        //$("#UWInsightBlock").val(insightBlock);
    },

    formatWeatherForecast: function() {
        weatherCapsule = this.predictUWweather();
        return "Today's temperature will be " + weatherCapsule.temperature + " degrees Fahrenheit, lasting for " + weatherCapsule.tempDuration + " Precipitation: " + 
            weatherCapsule.precipitation + " Precipitation Duration: " + weatherCapsule.precipDuration + " Precipitation details: " + weatherCapsule.precipDetails.frequency +
            " " + weatherCapsule.precipDetails.type;
    },
    
    //Generates the weather object, called a weatherCapsule elsewhere.
    predictUWweather: function(roll) {
        let me = this;
        let BaselineTable = me.tempBaselines[me.climateKey];

        let baseTemp = BaselineTable.seasons[me.seasonKey];
    
        return {
            temperature: baseTemp,
            tempDuration: 60,
            precipitation: 'frozen',
            precipDuration: 60,
            precipDetails: {
                frequency: '0.15',
                type: 'light'
            }
        }
    },

    getClimateBaselines: function() {

    },

    getElevationBaselines: function() {

    }
    
}

function diceRoll(multiple, dice) {
    let value = 0;
    for(i = 0; i < multiple; i++)
    {
        value += this.singleDiceRoll(dice);
    }
    return value;
}

function singleDiceRoll(dice) {
    return Math.floor(Math.random() * dice) + 1;
}

function grabTable(callback) {
    $.ajax("/json/tempBaselines.json").done(function(data){
        callback(JSON.parse(data));
    });
}
 
UWWeather.initialize();

$(document).ready(function() {
    $("form.UWClimateSelector input:radio").change(function () {
        UWWeather.climateKey = $(this).val();
    });
    $("form.UWAltitudeSelector input:radio").change(function () {
        UWWeather.altitudeKey = $(this).val();
    });
    $("form.UWSeasonSelector input:radio").change(function () {
        UWWeather.seasonKey = $(this).val();
    });
});