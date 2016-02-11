var question 			 = document.getElementById('question');
var questionBtn 	 = document.getElementById('question-button');
var topicSelector  = document.getElementById('topic-selector');

var myInfoBtn			 = document.getElementById('myInfo');
var myIntBtn			 = document.getElementById('myInterests');
var myDayBtn	 		 = document.getElementById('myDay');
var myFamilyBtn		 = document.getElementById('myFamily');

function StudyBuddy(name) {
		this.name 			= name;
		this.qBank 			= [];
		this.qBankIndex = 0;
	}

	// Study Buddy Behavior
	StudyBuddy.prototype = {
		constructor: StudyBuddy,
		sayName: function() {
			console.log("Hi my name is " + this.name);
		},
		ask: function() {
			if(this.qBankIndex === this.qBank.length) {
				this.qBankIndex = 0;
			}
			question.innerHTML = this.qBank[this.qBankIndex];
			this.qBankIndex++;
		},
		add: function(question) {
			this.qBankIndex = 0;
			if(typeof question == 'object') {
				var i;
				for (i=0; i<question.length; i++) {
					this.qBank.push(question[i]);
				}
			}
			else if(typeof question == 'string') {
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

	var myInfo = [
		"What's your name?", 
		"Where are you from?", 
		"Where do you live?",
		"How old are you?",
		"What do you do?",
		"Are you a student?",
	];

	var myInterests = [
		"What is your hobby?", 
		"Do you like to go to the movies?", 
		"What's your favorite movie?"
	];

	var myDay = [
		"How was your day today?",
		"What did you do today?",
		"How was work?",
		"What did you have for lunch?"
	];

	var myFamily = [
		"How many brothers and sisters do you have?",
		"Where does your family live?",
		"What's your brother's name?",
		"What's your sister's name?"
	];

	questionBtn.addEventListener('click', function() {
		sb.ask();
	}, false);

	topicSelector.addEventListener('click', function(e) {
		if(questionBtn.display === 'none') {
			questionBtn.display = 'block';
		}

	switch(e.target.id) {
		case 'myInfo':
			sb.clear();
			sb.add(myInfo);
			break;
		case 'myInterests':
			sb.clear();
			sb.add(myInterests);
			break;
		case 'myDay':
			sb.clear();
			sb.add(myDay);
			break;
		case 'myFamily':
			sb.clear();
			sb.add(myFamily);
			break;
	}

	e.stopPropagation();
}, true);