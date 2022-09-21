
function startRound() {
    let userGessedNumber = document.getElementById("userNumber").value;
    
    let url = "http://localhost:3001/round";
    var data ={userGessedNumber: userGessedNumber};
    $("#btnStart").hide();
    $("#player_1").hide();
    $("#player_2").hide();
    $("#player_3").hide();
    $("#player_4").hide();
    $("#player_5").hide();
    // Send start round request
    $.ajax({
        url: url,
        Headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        type: "POST", 
        dataType: "json",
        data: data,
        success: function (result) {
            // Display result
            document.getElementById("round").innerHTML = "Round " + result.round + " result:";
            
            //document.getElementById("secretNumber").innerHTML = result.secretNumber;
            animateValue(document.getElementById("secretNumber"), 0, result.secretNumber, 5000);
            setTimeout(() => { 
            if (result.gessedNumbers[0] < result.secretNumber) {
                document.getElementById("player_1").innerHTML = "Player 1 (Win)- Gessed Number: " + result.gessedNumbers[0] + " Credit: " + result.credits[0];
            }
            else {
                document.getElementById("player_1").innerHTML = "Player 1 (Lose)- Gessed Number: " + result.gessedNumbers[0] + " Credit: " + result.credits[0];
            }
            if (result.gessedNumbers[1] < result.secretNumber) {
                document.getElementById("player_2").innerHTML = "Player 2 (Win)- Gessed Number: " + result.gessedNumbers[1] + " Credit: " + result.credits[1];
            }
            else {
                document.getElementById("player_2").innerHTML = "Player 2 (Lose)- Gessed Number: " + result.gessedNumbers[1] + " Credit: " + result.credits[1];
            }
            if (result.gessedNumbers[2] < result.secretNumber) {
                document.getElementById("player_3").innerHTML = "Player 3 (Win)- Gessed Number: " + result.gessedNumbers[2] + " Credit: " + result.credits[2];
            }
            else {
                document.getElementById("player_3").innerHTML = "Player 3 (Lose)- Gessed Number: " + result.gessedNumbers[2] + " Credit: " + result.credits[2];
            }
            if (result.gessedNumbers[3] < result.secretNumber) {
                document.getElementById("player_4").innerHTML = "Player 4 (Win)- Gessed Number: " + result.gessedNumbers[3] + " Credit: " + result.credits[3];
            }
            else {
                document.getElementById("player_4").innerHTML = "Player 4 (Lose)- Gessed Number: " + result.gessedNumbers[3] + " Credit: " + result.credits[3];
            }
            if (result.gessedNumbers[4] < result.secretNumber) {
                document.getElementById("player_5").innerHTML = "Player 5 (Win)- Gessed Number: " + result.gessedNumbers[4] + " Credit: " + result.credits[4];
            }
            else {
                document.getElementById("player_5").innerHTML = "Player 5 (Lose)- Gessed Number: " + result.gessedNumbers[4] + " Credit: " + result.credits[4];
            }
            
            $("#player_1").show();
            $("#player_2").show();
            $("#player_3").show();
            $("#player_4").show();
            $("#player_5").show();
            }, 6000);
            // Wait 10 sec to enable start new round 
            setTimeout(() => { $("#btnStart").show(); }, 16000);
            
        },
        error: function () {
            console.log("error");
        }
    });

}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.round((progress * (end - start) + start) * 100) / 100;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}



