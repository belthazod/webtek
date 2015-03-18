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

function getExistingStudents() {
	var eStudentsSelector = document.getElementById('student-selection');
	var estudents = JSON.parse(localStorage.getItem('eStudents'));
}

function finalize() {

}