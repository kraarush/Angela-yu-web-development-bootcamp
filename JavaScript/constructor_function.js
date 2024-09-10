// to make several objects of same type we can use constructor function defined in js

// constructor function is initialized with capitol letter

function HouseMaid(name,age,salary,time){
    this.name = name;
    this.age = age;
    this.salary = salary;
    this.time = time;
    this.testFunc = function() {
        alert("Checking if working or not");
    }
}

var maid1 = new HouseMaid("Babita", 40, 1500, "2-hour");

console.log(maid1.salary);