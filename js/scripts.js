//================= Global Variables ==============================
var valuesArr = ["passive", "active", "art", "nature", "sport"];
var transportation = [],  hobbies = [], relevantInfo = [], fortune = [];



//===================== backend ==============================
var tellFortune = function(){
  relevantInfo.forEach(function(info){
    if (info === "passive"){
      fortune.push("$5 will find you on the bus. ");
    }
    if (info === "active"){
      fortune.push("Every light will be green for you. ");
    }
    if (info === "art"){
      fortune.push("Your art will take on a life of its own. ");
    }
    if (info === "nature"){
      fortune.push("In nature, you will find peace. ");
    }
    if (info === "sport"){
      fortune.push("Athletic victory will be yours to have today. ");
    }
  });
  return fortune;
};

var countChecks = function(checkArr, threshold) {
  valuesArr.forEach(function(value) {
    var count = 0;
    checkArr.forEach(function(check) {
      if(check === value) {
        count++;
      }
    });
    if(count > threshold) {
      relevantInfo.push(value);
    }
  });
  return relevantInfo;
};

var makeString = function(fortunes) {
  var string = "";
  fortunes.forEach(function(fortune) {
    string+= fortune;
  });
  return string;
}
//===================== front end ==============================

$(document).ready(function(){
  $("form#fortune_telling").submit(function(event){
    event.preventDefault();

    $("input:checkbox[name=transportation]:checked").each(function(){
      transportation.push($(this).val());
    });
    $("input:checkbox[name=hobbies]:checked").each(function(){
      hobbies.push($(this).val());
    });
    countChecks(hobbies, 1);
    countChecks(transportation, 2);
    tellFortune();
    $("#fortune").children('p').text(makeString(fortune));
    if(fortune.length === 0){
      $("#fortune").children('p').text("The eyes of fate cannot see with such little guidance. (select more answers!)");
    }
    $('#fortune_telling').fadeOut(1200);
    $("#fortune").fadeIn(2000, "linear");
  });

  $('#refresh').click(function(){
    location.reload();
  })
});
