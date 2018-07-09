/*
  Mentors mentoring in specific topics {
    - Takes in all mentors as array
    
    - Create variable for filtered array
    - Iterate through the array
    - If topic matches topics user is interested in
      - Add score key and set equal to 0
      - Push current mentor into filtered array
    - Return filtered array
  }

  Mentors that are within a certain age {
    - Takes in array passed from above function
    - Takes in number to restrict age gap, defaults to 5
    
    - Filter array for mentors within same age range as current user
    - If absolute val of currentUser's age - currentMentor's age < 6
      - Multiply val by 5 and add to currentMentor's score
    - Else
      - Add 25 to currentMentor's score
    
    - Return filtered array
  }

  Mentors active around same time {
    - Takes in array passed from above function
    
    - Filter array for mentors that are active same time as user
    - Subtract currentUser's - currentMentor's avg active times
      - Add absolute value of subtraction to score
    
    - Return array
  }

  Mentors with same avg length of convos {
    - Takes in array passed from above function

    - Filter array for mentors with same avg length of convos
    - Subtract currentUser's - currentMentor's avg length of convos
      - Add absolute value of subtraction to score

    - Return array
  }

  Sort based on score {
    - Takes in array of users
    
    - Sort based on the lower score
    - Slice the first 10 if length is greater
    - Return array
  }
*/