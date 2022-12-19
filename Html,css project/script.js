// Sticky Navigation Bar On Scroll
window.addEventListener("scroll", function () {
    let navbar = this.document.querySelector('nav')
    navbar.classList.toggle("sticky", window.scrollY > 0);
})

// Responsive Navbar Button
let navbar = document.querySelector('.navbar');
let navBtn = document.querySelector('.navbar-toggler');
let navLists = document.querySelector('.nav-lists');

function navbarResize(){
    if(window.innerWidth>768){
        navLists.style.display = "flex";
        navBtn.style.display = "none"
    }
    else{
        navLists.style.display = "none";
        navBtn.style.display = "flex"
    }
}
 
navBtn.addEventListener('click', function () {
    if (navLists.style.display == "none") {
        navLists.style.display = "flex";
        let navbar = document.querySelector("nav");
        navbar.classList.add('sticky')
    }
    else{
        navbar.classList.remove('sticky')
        navLists.style.display = "none";
    }
     
})



//function, Arrow function
function familyProcessor(children, adult){
    const family = `There is ${children} children and ${adult} adults in my family.`;
    return family;
}

console.log(familyProcessor(3,2));


const employeeDetail = (birthYear, name, surname)=>{
    const age = 2022 - birthYear
    return `${name} ${surname} is ${age} years old`
}

console.log(employeeDetail(2000, 'Anna', 'Merlin'));


//Objects, Arrays

const subjects = ['Math', 'Chemistry', 'PE'];
//add
subjects.push('Art');
subjects.unshift('Literature');
//remove
subjects.pop();
subjects.shift();


const student = {
    firstName : 'Emily',
    lastName : 'Adam',
    age : 25,
    majorSubject : "IT",
    takenSubjects : ['AI', 'Intoduction to Programming', 'Basics of Network']
};
console.log(student);
console.log(student.firstName);

//window object
const aboutStudent = prompt('What do you want to know about this student? Choose between firstName, lastName, age, majorSubject, takenSubjects');

if(student[aboutStudent]){
    console.log(student[aboutStudent]);
}
else{
    console.log('Wrong choise. Choose between firstName, lastName, age, majorSubject, takenSubjects');
}


console.log(student);


// DOM Manipulation

document.querySelector('.logo').textContent = 'salam';

document.querySelector('#home').style.backgroundColor = '#eee';

// Handling Click Events

document.querySelector('.download').addEventListener('click', function(){
    console.log(document.querySelector('.logo').textContent);
});

// Destructuring
const arr = [4, 5, 6];
const[a, b, c] = arr;
console.log(a, b, c);