/**
*On localStorage
*	eStudents = array of existing students
*To be stored
*	myclass object
*	students[]
*/

//Class Object

var userID = document.getElementById("user-id").innerHTML;

var classForm = document.getElementById("add-class-wrap");
var studentForm = document.getElementById("add-student-wrap");

var myClass = {
	classCode:null,
	descTitle:null,
	room:null,
	meeting:null,		 
	sked:null, 
	students:null
};

var students = [];
var selector = document.getElementById("student-selection");

var page1 = document.getElementById("add-class-wrap");
var page2 = document.getElementById("add-student-wrap");
page2.style.visibility = "hidden";

main();

function initializeClass() {
	var cc = document.getElementById("input-classcode");
	var desc = document.getElementById("input-desctitle");
	var room = document.getElementById("input-room");		
	var meet = document.getElementById("select-meeting");
	var days = document.getElementById("select-day");

	var timeA = document.getElementById("select-timea");
	var timeB = document.getElementById("select-timeb");

	var next = document.getElementById("classform-btn");
	next.addEventListener('click', function(){
		if(validateClass(cc, desc, room, meet, days, timeA, timeB)) {
			myClass.classCode = cc.value;
			myClass.descTitle = desc.value;
			myClass.room = room.value;
			myClass.meeting = meet.options[meet.selectedIndex].value;
			myClass.sked = days.options[days.selectedIndex].value+", "+timeA.options[timeA.selectedIndex].value+" - "+timeB.options[timeB.selectedIndex].value;

			page1.style.visibility = "hidden";
			page1.style.position = "fixed";
			page2.style.visibility = "visible";
		}
	});
}
function validateClass(cc, desc, room, meet, days, timeA, timeB) {
	var a = document.getElementById("class-prompt");
	var trigger = true;
	
	if(cc.value == "") {
		cc.style.border = "2px solid #e74c3c";
		trigger = false;
	}

	if(desc.value == "") {
		desc.style.border = "2px solid #e74c3c";
		trigger = false;
	} 
	if(room.value == "") {
		room.style.border = "2px solid #e74c3c";
		trigger = false;
	}

	if(days.options[days.selectedIndex].value == "Day") {
		days.style.border = "2px solid #e74c3c";
		trigger = false;
	}

	if(timeA.options[timeA.selectedIndex].value == "StartTime") {
	 timeA.style.border = "2px solid #e74c3c";
	 trigger = false;
	}

	if(timeB.options[timeB.selectedIndex].value == "EndTime") {
		timeB.style.border = "2px solid #e74c3c";
		trigger = false;
	}
	
	return trigger;
}

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
	var add = document.getElementById("student-btn");
	var a = document.getElementById("man-add-prompt");
	add.addEventListener('click', function(){
		if(name1.value != "" && name2.value != "" && name3.value != "") {
			a.innerHTML = "";
			var name = name1.value + ", "+name2.value+" "+name3.value+".";
			createStudentByName(name);
		} else {
			a.style.color = "red";
			a.innerHTML = "Please fill in all the fields.";
		}
	});
}

/**
* Creates a student anchor from the student form
*/
function createStudentByName(name) {
	var a = document.getElementById("man-add-prompt");
	if(checkExistence(name)){
		a.style.color = "red";
		a.innerHTML = name + " is already in your class!";
	} else {
		a.innerHTML = "";
		var studAnchor = document.createElement("a");
		studAnchor.id = name;
		studAnchor.addEventListener('click', function(){
				removeStudent(studAnchor.id);
			});
		studAnchor.appendChild(document.createTextNode(name+" | x"));
		students.push(name);
		addStudent(studAnchor);
	}
	
}
/**
* Creates a student anchor from a selected existing student
*/
function createStudent(selector, eStudents) {
	var studentExists = checkExistence(eStudents[selector.selectedIndex]);
	var prompt = document.getElementById("prompt-selection");
	if(studentExists) {
		prompt.innerHTML = eStudents[selector.selectedIndex]+"is already in your class";
	} else {
		if(selector.selectedIndex != -1 && !studentExists) {
			prompt.innerHTML = "";
			var studAnchor = document.createElement("a");
			studAnchor.id = eStudents[selector.selectedIndex];
			studAnchor.addEventListener('click', function(){
				removeStudent(studAnchor.id);
			});
			studAnchor.appendChild(document.createTextNode(eStudents[selector.selectedIndex]+" | x")); 
			students.push(eStudents[selector.selectedIndex]);
			addStudent(studAnchor);
		}	
	}
		
}
/**
* Adds the student anchor element to a list element. The list element is in turn
* added to the unordered list element
*/
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
/**
* Removes the student list element from the unoredered list.
*/
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
	initializeClass();
	initializeStudentSelector();
	initializeManAdding();
}

function saveClass() {

}
