var questionOutputArea = document.getElementById('question');
var questionBtn = document.getElementById('question-button');
var topicSelector = document.getElementById('topic-selector');
var myInfoBtn	= document.getElementById('myInfo');
var myIntBtn = document.getElementById('myInterests');
var myDayBtn = document.getElementById('myDay');
var myFamilyBtn = document.getElementById('myFamily');

var config = {
	warningMsg: "Click a topic button above to get a question.",
	goodByeMsg: "Nice talking with you! <br> Please select a new topic!"
};

// Study Buddy Class
function StudyBuddy(name) {
	this.name = name;
	this.qBank = [];
	this.qBankIndex = 0;
}

// Study Buddy Behavior
StudyBuddy.prototype = {
	constructor: StudyBuddy,

	sayName: function() {
		console.log("Hi my name is " + this.name);
	},

	ask: function() {
		if(this.qBank.length === 0) {
			questionOutputArea.innerHTML = config.warningMsg;
		}
		else {
			if(this.qBankIndex === this.qBank.length) {
				questionOutputArea.innerHTML = config.goodByeMsg;
				this.qBank = [];
			} else {
				questionOutputArea.innerHTML = this.qBank[this.qBankIndex];
				this.qBankIndex++;
			}
		}
	},

	add: function(question) {
		this.qBankIndex = 0;
		if(typeof question === 'object') {
			for (var i = 0; i<question.length; i++) {
				this.qBank.push(question[i]);
			}
		}
		else if(typeof question === 'string') {
			this.qBank.push(question);
		} else {
			console.log("Error; bad input values.");
		}
	},

	clear: function() {
		this.qBank = [];
	}
}

var sb = new StudyBuddy("Fernando");

questionBtn.addEventListener('click', function() {
	sb.ask();
}, false);

topicSelector.addEventListener('click', function(e) {
	switch(e.target.id) {
		case 'myInfo':
			sb.clear();
			sb.add(myInfo);
			toastr.success('Topic Selected', 'Success!');
			break;
		case 'myInterests':
			sb.clear();
			sb.add(myInterests);
			toastr.success('Topic Selected', 'Success!');
			break;
		case 'myDay':
			sb.clear();
			sb.add(myDay);
			toastr.success('Topic Selected', 'Success!');
			break;
		case 'myFamily':
			sb.clear();
			sb.add(myFamily);
			toastr.success('Topic Selected', 'Success!');
			break;
	}
	e.stopPropagation();
}, true);