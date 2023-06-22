var name = 'Max';
var age = 29;
var hasHobbies = true;


// Function
function userInfo(userName, userAge, userHasHobby) {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
}

console.log(userInfo(name, age, hasHobbies));
