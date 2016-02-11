function User(name, age, sex) {
	this.name 				= name;
	this.age 					= age;
	this.sex 					= sex;
	this.interests		= [];
	this.nationality  = null;
	this.hasSiblings	= null;
	this.brothers			= 0;
	this.sisters 			= 0;
}

User.prototype = {
	constructor: User,
	addInterest: function(interest) {
		this.interests.push(interest);
	},
	addNationality: function(origin) {
		this.nationality = origin;
	}
}

var user = new User("Elliott", 29, "male");