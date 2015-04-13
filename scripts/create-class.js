/**
*On localStorage
*	eStudents = array of existing students
*To be stored
*	myclass object
*	students[]
*/

//Class Object
var user = window.location.hash.substring(1);
var username =  user.split("&")[0];

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
var myClassInfo = document.getElementById("class-info");
var page2 = document.getElementById("add-student-wrap");
var page3 = document.getElementById("manage-room-wrap");

myClassInfo.style.visibility = "hidden";
myClassInfo.style.position = "fixed";
page2.style.visibility = "hidden";
page2.style.position = "fixed";
page3.style.visibility = "hidden";
page3.style.position = "fixed";

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

			myClassInfo.style.visibility = "visible";
			myClassInfo.style.position = "relative";
			initiateClassInfo();
			
			page2.style.visibility = "visible";
			page2.style.position = "relative";

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

function initiateClassInfo() {
	document.getElementById("class-data-1").innerHTML = "Class Code: "+myClass.classCode;
	document.getElementById("class-data-2").innerHTML = "Descriptive Title: "+myClass.descTitle;
	document.getElementById("class-data-3").innerHTML = "Room: "+myClass.room;
	document.getElementById("class-data-4").innerHTML = "Schedule: "+myClass.sked;
}

function initializePage3() {
	var next = document.getElementById("studentform-btn"); //this is the button from page 2
	next.addEventListener('click', function() {
		page2.style.visibility = "hidden";
		page2.style.position = "fixed";
		page3.style.visibility = "visible";
		page3.style.position = "relative";
		canvasApp();
	});

	var finish = document.getElementById("end-btn");
	
	finish.addEventListener('click', function(){
		saveClass();	
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
	initializePage3();
}

function saveClass() {
	myClass.students = students //myClass variable on line 16! students array on line 25!
	console.log(JSON.stringify(myClass));
	
	//Contributor: Bassanio C. Tello Jr
	var studentsToBeStored =[];
	var id = 0;
	for(var x = 0; x<students.length; x++){


		var last_name = students[x].split(",")[0];
		var first_name_raw = students[x].split(",")[1];
		var first_name  = first_name_raw.substring(0, first_name_raw.length-3);

		var middle_initial_raw = students[x].split(",")[1];
		var middle_initial  = middle_initial_raw.substring( middle_initial_raw.length-3, middle_initial_raw.length-1);
		shapes[x].last_name = last_name;
		shapes[x].first_name = first_name;
		shapes[x].middle_initial = middle_initial;

		studentsToBeStored.push(new Student(++id, last_name, 
			first_name, middle_initial, shapes[x].x, shapes[x].y ,"enrolled", username,  [], 0 , 0));

	}
	myClass.numOfStud = shapes.length;

	var array = [];
	var univClass = new universityClass( myClass.classCode, myClass.descTitle, myClass.room, myClass.sked, myClass.numOfStud, username, studentsToBeStored, array);

	var bwiseater = JSON.parse(localStorage.getItem("bwiseater"));
	for(var x = 0; x < bwiseater.accounts.length; x++ ){
		if(bwiseater.accounts[x].username == username){
			bwiseater.accounts[x].uniclasses.push(univClass);
		}
	}
	localStorage.setItem("bwiseater", JSON.stringify(bwiseater));
	alert("Class was created successfully.");
	window.location.assign("MyClasses.html#" + username);
}

var Debugger = function() { };
Debugger.log = function(message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
	canvasApp();
}

function canvasSupport() {
	return document.getElementById("myCanvas");
}
var shapes;
function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	
	var theCanvas = document.getElementById("myCanvas");
	var context = theCanvas.getContext("2d");
	
	init();
	
	var numShapes;
	var dragIndex;
	var dragging;
	var mouseX;
	var mouseY;
	var dragHoldX;
	var dragHoldY;
	var timer;
	var targetX;
	var targetY;
	var easeAmount;
	
	function init() {
		shapes = [];
		
		easeAmount = 0.45;
		
		initiateCanvas();
		numShapes =shapes.length;
		drawScreen();
		
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
	}
	
	function initiateCanvas(){
	//Bass Belthazod Tello

		var totalStudents = students.length;
		var seats = 0;
		var c = document.getElementById("myCanvas");
		var canvas = c.getContext("2d");
		var y = 400;
		canvas.fillStyle = "#FF0000";
	 	while(seats != totalStudents){
			for(var leftSide = 0, x = 375; leftSide<5 && seats != totalStudents; leftSide++, seats++, x-=90){
				var shape = new SimpleSquareParticle(x,y);
				shapes.push(shape);

			}
			for(var rightSide = 0, x = 550; rightSide<5 && seats != totalStudents; rightSide++, seats++, x+=90){
				
				var shape = new SimpleSquareParticle(x,y);
				shapes.push(shape);
			}
			y -= 80;
		}
	}
	
	function mouseDownListener(evt) {
		var i;
		
		//getting mouse position correctly 
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
				
		/*
		Below, we find if a shape was clicked. Since a "hit" on a square or a circle has to be measured differently, the
		hit test is done using the hitTest() function associated to the type of particle. This function is an instance method
		for both the SimpleDiskParticle and SimpleSqureParticle classes we have defined with the external JavaScript sources.		
		*/
		for (i=0; i < numShapes; i++) {
			if (shapes[i].hitTest(mouseX, mouseY)) {	
				dragging = true;
				//the following variable will be reset if this loop repeats with another successful hit:
				dragIndex = i;
			}
		}
		
		if (dragging) {
			window.addEventListener("mousemove", mouseMoveListener, false);
			
			//place currently dragged shape on top
			shapes.push(shapes.splice(dragIndex,1)[0]);
			
			//shapeto drag is now last one in array
			dragHoldX = mouseX - shapes[numShapes-1].x;
			dragHoldY = mouseY - shapes[numShapes-1].y;
			
			//The "target" position is where the object should be if it were to move there instantaneously. But we will
			//set up the code so that this target position is approached gradually, producing a smooth motion.
			targetX = mouseX - dragHoldX;
			targetY = mouseY - dragHoldY;
			
			//start timer
			timer = setInterval(onTimerTick, 1000/30);
		}
		theCanvas.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);
		
		//code below prevents the mouse down from having an effect on the main browser window:
		if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;
	}
	
	function onTimerTick() {
		//because of reordering, the dragging shape is the last one in the array.
		shapes[numShapes-1].x = shapes[numShapes-1].x + easeAmount*(targetX - shapes[numShapes-1].x);
		shapes[numShapes-1].y = shapes[numShapes-1].y + easeAmount*(targetY - shapes[numShapes-1].y);
		
		//stop the timer when the target position is reached (close enough)
		if ((!dragging)&&(Math.abs(shapes[numShapes-1].x - targetX) < 0.1) && (Math.abs(shapes[numShapes-1].y - targetY) < 0.1)) {
			shapes[numShapes-1].x = targetX;
			shapes[numShapes-1].y = targetY;
			//stop timer:
			clearInterval(timer);
		}
		drawScreen();
	}
	
	function mouseUpListener(evt) {
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
		window.removeEventListener("mouseup", mouseUpListener, false);
		if (dragging) {
			dragging = false;
			window.removeEventListener("mousemove", mouseMoveListener, false);
		}
	}

	function mouseMoveListener(evt) {
		var posX;
		var posY;
		var shapeWidth = shapes[numShapes-1].rectWidth;
		var shapeHeight = shapes[numShapes-1].rectHeight;

		var minX = shapeWidth -shapeWidth;
		var maxX = theCanvas.width-shapeWidth;
		var minY = shapeHeight - shapeHeight;
		var maxY = theCanvas.height - shapeHeight;
		
		//getting mouse position correctly 
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
		
		//clamp x and y positions to prevent object from dragging outside of canvas
		posX = mouseX - dragHoldX;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouseY - dragHoldY;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		
		targetX = posX;
		targetY = posY;
	}
		
	function drawShapes() {
		var i;
		for (i=0; i < shapes.length; i++) {
			//the drawing of the shape is handled by a function inside the external class.
			//we must pass as an argument the context to which we are drawing the shape.

			shapes[i].drawToContext(context);
		}
	}
	
	function drawScreen() {
		//bg
		context.fillStyle = "#000000";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);
		
		drawShapes();		
	}
	
}

// Simple class example
var stud_id = 0;
function SimpleSquareParticle(posX, posY) {
		this.x = posX;
		this.y = posY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#FF0000";
		this.rectWidth = 80;
		this.rectHeight = 40;
		this.stud_id = ++stud_id;
		this.first_name;
		this.last_name;
		this.middle_initial;

}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SimpleSquareParticle.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x)&&(hitX < this.x + 80)&&(hitY > this.y)&&(hitY < this.y +40));
}

//A function for drawing the particle.
SimpleSquareParticle.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x, this.y, 80, 40);
}

function finalizeLayout(){
	var info1 = document.getElementById("info1");
	var info2 =document.getElementById("info2");

	info1.className="page-desc inactive";
	info2.className="page-desc";

	document.getElementById("finalize-btn").className="invisible";
	document.getElementById("end-btn").className="btn";
	document.getElementById("swap").className="btn";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var main = document.getElementById('main');


	for(var i = 0; i< shapes.length; i++){
			var div = document.createElement("div");
			div.setAttribute("style", "margin-top:" + (shapes[i].y+1)+"px" + ";margin-left:" + (shapes[i].x+1) + "px");
			div.className="student unselectable";
			div.setAttribute("onclick", "change("+shapes[i].stud_id+")");
			div.title = shapes[i].stud_id;
			div.innerHTML =  students[i];
			main.appendChild(div);

	}
}
// Change the instructor name label to the logged in user's name
var user = window.location.hash.substring(1);
var username =  user.split("&")[0];
document.getElementById('instructorName').innerHTML = username;

function changeLinks(){
	document.getElementById('myClassesLink').href="MyClasses.html#" + username;
	document.getElementById('createClassLink').href="create-class.html#" + username;
}
changeLinks();
var totalSelected = 0;
function change( number ){
	for(var x = 0 ; x < students.length; x++){
		if(document.getElementsByClassName("student")[x].title == number && totalSelected >= 0 && totalSelected <=1){
			document.getElementsByClassName("student")[x].className = "student unselectable selected";
			totalSelected++;
		}else if(document.getElementsByClassName("student")[x].title == number && document.getElementsByClassName("student")[x].className == "student unselectable selected"){
			document.getElementsByClassName("student")[x].className =  "student unselectable";
			totalSelected--;
		}else if(document.getElementsByClassName("student")[x].title == number && totalSelected==2){
			alert("Please select only 2 students");
		}
	}

}

function swapStudents(){
	var student1 = document.getElementsByClassName("selected")[0];
	var student2 = document.getElementsByClassName("selected")[1];

	var temp = student1.innerHTML;

	student1.innerHTML = student2.innerHTML;
	student2.innerHTML = temp;
	student1.className = "student unselectable";
	student2.className = "student unselectable";

	var temp1;
	var temp2;
	var temp3;
		var temp = students[parseInt(student1.title)-1];
		students[parseInt(student1.title)-1] = students[parseInt(student2.title)-1];
		students[parseInt(student2.title)-1] = temp;

students[parseInt(student2.title)-1]

	totalSelected = 0;

	/*for(var x = 0;x < shapes.length; x++){
		if(shapes[x].stud_id == student1.title){
			temp1 = shapes[x].last_name;
			temp2 = shapes[x].first_name;
			temp3 = shapes[x].middle_initial;
			for(var y = 0;y < shapes.length; y++){
				alert(student2.title);
				alert(shapes[y].stud_id);
				if(shapes[y].stud_id == student2.title){
					alert("pasok");
					shapes[x].last_name = shapes[y].last_name;
					shapes[x].first_name = shapes[y].first_name;
					shapes[x].middle_initial = shapes[y].middle_initial;
					shapes[y].last_name = temp1;
					shapes[y].first_name = temp2;
					shapes[y].middle_initial = temp3;

				}
				
			}
		}
	}*/
}

//end of Bassanio's Contribution