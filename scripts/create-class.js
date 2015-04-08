/**
*On localStorage
*	eStudents = array of existing students
*To be stored
*	myclass object
*	students[]
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
var students = [];
var selector = document.getElementById("student-selection");

//populates student-selection element
function initializeStudentSelector() {
	var eStudents = getExistingStudents();

	for(var i in eStudents) {
		var opt = document.createElement("option");
		opt.value = i;
		opt.text = eStudents[i];
		opt.addEventListener('dblclick', function(){
			createStudent(selector, eStudents);
		});
		selector.add(opt);
	}

	var addSelected = document.getElementById("addselected-btn");
	addSelected.addEventListener('click', function(){
		createStudent(selector, eStudents);
	});
}
function initializeManAdding() {
	console.log('initialized');
	var name1 = document.getElementById("lastname-input");
	var name2 = document.getElementById("firstname-input");
	var name3 = document.getElementById("midinitial-input");
	var addBtn = document.getElementById("addstudent-btn");

	addBtn.addEventListener('click', function(){
		var stud = name1.value + ", "+name2.value+" "+name3.value+".";
		
			prompt.innerHTML = "";
			var studAnchor = document.createElement("a");
			studAnchor.id = stud;
			studAnchor.addEventListener('click', function(){ 
				removeStudent(studAnchor.id);
			});
			studAnchor.appendChild(document.createTextNode(stud+" |x")); 
			addStudent(studAnchor);
	});
}

function createStudent(selector, eStudents) {
	var studentExists = checkExistence(eStudents[selector.selectedIndex]);
	var prompt = document.getElementById("prompt-selection");
	if(studentExists) {
		prompt.innerHTML = eStudents[selector.selectedIndex]+"is already in your class";
	} else {
		if(selector.selectedIndex != -1 && !studentExists) {
			prompt.innerHTML = "";
			var studAnchor = document.createElement("a");
			studAnchor.id = eStudents[selector.selectedIndex]
			studAnchor.addEventListener('click', function(){ 
				removeStudent(studAnchor.id);
			});
			studAnchor.appendChild(document.createTextNode(eStudents[selector.selectedIndex]+" |x")); 
			students.push(eStudents[selector.selectedIndex]);
			addStudent(studAnchor);
		}	
	}
		
}
function addStudent(studAnchor) {
	var status = document.getElementById("status");
	status.innerHTML = "";
	var list = document.getElementById("classlist");
	var li = document.createElement("li");
	li.appendChild(studAnchor);
	li.className = "studentLI";
	li.id = studAnchor.id+"li";
	list.appendChild(li);
}
function removeStudent(stud) {
	var list = document.getElementById("classlist");
	var li = document.getElementById(stud+"li");
	var p = document.getElementById("status");
	li.parentNode.removeChild(li);
	for (var i in students) {
		if(students[i] == stud) {
			students.splice(i, 1);
		}
	}

	if(students.length == 0) {
		p.innerHTML = "Your class is lonely. Add students to be happy!";
	}
}
function checkExistence(stud) {
	var isExists = false;
	if (students != null) {
		for (var i in students) {
			if (stud == students[i]) {
				isExists = true;
			}
		}
		if(!isExists) {
			return false;
		};
		return true;
	}
	return false; 
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
	var testStudents = [
		'Burayag, Jolas G.',
		'New, Student A.', 
		// 'New, Student B', 
		// 'New, Student C.', 
		// 'New, Student D.', 
		// 'New, Student E.', 
		// 'New, Student F.',
		// 'New, Student G.',
		// 'New, Student H.',
		// 'New, Student I.',
		// 'New, Student J.',
		// 'New, Student K.',
		// 'New, Student L.',
		// 'New, Student M.'
	];
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
	initializeStudentSelector();
	initializeManAdding();
}

function saveClass() {

}

var pageNumber = 1;
function nextPage(){
	var pages = document.getElementsByClassName('page');

	for (var x = 0; x< pages.length; x++){
		if(x == pageNumber){
			pages[x].className = "page active";
		}else{
			pages[x].className = "page inactive";
		}
	}
	pageNumber++;
	if( pageNumber > 1){
		document.getElementById('classform-btn-prev').className = "btn active";
	}
	if( pageNumber == 3){
		document.getElementById('classform-btn-next').className = 'btn inactive';
		document.getElementById('numOfStud').innerHTML = document.getElementsByClassName('studentLI').length;
		initiateCanvas();
	}
	if( pageNumber == 2){
		document.getElementById('classCode').innerHTML = document.getElementById("input-classcode").value;
		document.getElementById('descriptiveTitle').innerHTML = document.getElementById("input-desctitle").value;
		document.getElementById('room').innerHTML = document.getElementById("input-room").value;
		var timeA = document.getElementById("timea-selection");
		var timeB = document.getElementById("timeb-selection");
		var days = document.getElementById("day-selection");
		document.getElementById('sched').innerHTML =  timeA.options[timeA.selectedIndex].value + "-" + timeB.options[timeB.selectedIndex].value + " " + days.options[days.selectedIndex].innerHTML;
		
		
	}

}

function previousPage(){
	var pages = document.getElementsByClassName('page');

	for (var x = 0; x< pages.length; x++){
		if(x == pageNumber-2){
			pages[x ].className = "page active";
		}else{
			pages[x].className = "page inactive";
		}
	}
	pageNumber--;
	if( pageNumber == 1){
		document.getElementById('classform-btn-prev').className = "btn inactive";
	}
	if( pageNumber > 1){
		document.getElementById('classform-btn-prev').className = 'btn active';
	}
	if(pageNumber < 3){
		document.getElementById('classform-btn-next').className = 'btn-active';
	}
}


function initiateCanvas(){
	var totalStudents = document.getElementById('numOfStud').innerHTML;
	var seats = 0;
	alert(totalStudents);
	var c = document.getElementById("myCanvas");
	var canvas = c.getContext("2d");
	var y = 400;
	canvas.fillStyle = "#FF0000";
 	while(seats != totalStudents){
		for(var leftSide = 0, x = 375; leftSide<5 && seats != totalStudents; leftSide++, seats++, x-=90){
			
			canvas.fillRect(x, y, 80, 40);
		}
		for(var rightSide = 0, x = 550; rightSide<5 && seats != totalStudents; rightSide++, seats++, x+=90){
			
			canvas.fillRect(x, y, 80, 40);
		}
		y -= 80;
	}
}
main();
