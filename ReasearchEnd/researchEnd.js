

var passcode = document.getElementById("passcode").value; 
var link = document.getElementById("surveyLink").value;

function passcodeCheck(passcode) {
if(passcode == "12345") {
	return true;
	console.log("we in passcode");

	}
	return false;
}

function linkCheck(link) {
	if(isUrl(link) == true) {
		return true;
		console.log("we in link");
	}
	return false;
}

function checksValid() {
	if(passcodeCheck(passcode) == true && linkCheck(link) == true) {
		alert("Passcode and link are valid. Survey successfully uploaded.");
		return true;
	}
	else if(passcodeCheck(passcode) == true && linkCheck(link) == false) {
		alert("Link invalid. Survey was not uploaded.");
		return false;
	}
	else if(passcodeCheck(passcode) == false && linkCheck(link) == true) {
		alert("Passcode invalid. Survey was not uploaded.");
		return false;
	}
	else {
		alert("Passcode and link invalid. Survey was not uploaded.");
		return false;
	}

function uploadLink() {

}

}

