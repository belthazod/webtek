/**
*On localStorage
*	eStudents = array of existing students
*To be stored
*	
*/

//Class Object

var userID = document.getElementById("user-id").innerHTML;

var myclass = {
	classCode:null, 
	days:null, 
	startTime:null, 
	endTime:null, 
	students:null
};
var studens = [];

//populates student-selection element
function initializeStudentSelector() {
	var selector = document.getElementById("student-selection");
	var eStudents = getExistingStudents();
	for(var i in eStudents) {
		var opt = document.createElement("option");
		opt.value = i;
		opt.text = eStudents[i];

		selector.add(opt);
	}

	var addSelected = document.getElementById("addselected-btn");
	addSelected.addEventListener('click', function(){addSelectedEvent()});
	function addSelectedEvent() {
		alert(eStudents(selector.selectedIndex));
	}
}

//retrieves eStudents from localstorage
function getExistingStudents() {
	return JSON.parse(localStorage.getItem('eStudents'));
}

//clears localStorage 'eStudents'
function emptyStudents() {
	localStorage.removeItem('eStudents');
}

//adds test data to localstorage 'eStudents'
function addTestData() {
	var eStudents = getExistingStudents();
	var testStudents = ['Burayag, Jolas G.'];
	var trigger = false;
	if (eStudents != null) {
		for (var i in testStudents) {
			for (var j in eStudents.length) {

				if (testStudents[j] == eStudents[i]) {
					trigger = true;
				}
			}
		}
		if(!trigger) {localStorage.setItem('eStudents', JSON.stringify(eStudents))};
	} else {
		localStorage.setItem('eStudents', JSON.stringify(testStudents));
	}
	
}

//prints localstorage 'eStudents' value
function printLocal() {
	var eStudents = getExistingStudents();
	var students = "";
	for (var i = eStudents.length - 1; i >= 0; i--) {
		students = students+" "+eStudents[i];
	};
	alert(students);
}

function main() {
	document.addEventListener('DOMContentLoaded', function () {
	    console.log('DOM ready!');
	});

	emptyStudents();
	addTestData();
	//printLocal();
	initializeStudentSelector()	
}

main();
