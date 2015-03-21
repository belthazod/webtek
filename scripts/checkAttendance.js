function universityClass(classcode, room, sched, numOfStud, username, students){
	this.classcode = classcode;
	this.room = room;
	this.sched = sched;
	this.numOfStud = numOfStud;
	this.username = username;
	this.students = students;

}

function Student(stud_id, last_name, first_name, studstatus, classcode, username){
	this.stud_id = stud_id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.studstatus = studstatus;
	this.classcode = classcode;
	this.username = username;
}

