function universityClass( classcode, descriptiveTitle, room, sched, numOfStud, username, students){
	this.classcode = classcode;
	this.descriptiveTitle = descriptiveTitle;
	this.room = room;
	this.sched = sched;
	this.numOfStud = numOfStud;
	this.username = username;
	this.students = students;
}

function Student(stud_id, last_name, first_name, middle_initial, x_coordinate, y_coordinate, studstatus, username, records){
	this.stud_id = stud_id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.middle_inital = middle_initial;
	this.x_coordinate = x_coordinate;
	this.y_coordinate = y_coordinate;
	this.studstatus = studstatus;
	this.username = username;
	this.records = records;
}
function Record(date, type){
	this.date = date;
	this.type = type;
}

