/** Takes a score object and returns a string representation
 */
function scoreToString(score) {
  switch (score.type) {
    case "Rounds + Reps":
      return `${score.rounds}+${score.reps}`
    case "Time":
      return `${score.min}:${score.sec}`
    case "Reps":
      return `${score.reps}`
    case "Load":
      return `${score.load}`
    case "Calories":
      return `${score.calories}`
    default:
      return `${score.results}`
  }
}

export {scoreToString};