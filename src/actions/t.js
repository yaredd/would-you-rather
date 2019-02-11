function getAllQuestionIds() {
  return Object.keys(questions) 
}

function getAllVotes() {
  const allIds = getAllQuestionIds()
  const allVotes = {}
  allVotes.allIds = []
  allVotes.byId = {}
  allIds.map( (q) => {
    let id = generateUID()
    allVotes.byId[id] = {}
    allVotes.byId[id].id = id
    allVotes.byId[id].voters = [ ...new Set(questions[q].optionOne.votes.concat(questions[q].optionTwo.votes)) ]
    allVotes.byId[id].questionId = q
    allVotes.allIds.push(id)
  })
  return allVotes
}

function getUnAnsweredQs(user) {
  const allVotes = getAllVotes()
  return allVotes.allIds.filter((vId) => !allVotes.byId[vId].voters.includes(user)).map((vId) => allVotes.byId[vId].questionId)
}


console.log(getAllVotes())
  
console.log('')
  
 
getUnAnsweredQs('tylermcginnis').forEach((qId) => {
  console.group('\nUn-Answered by Tyler McGinnis')
  console.log(questions[qId])
  console.groupEnd()
})
