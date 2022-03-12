/** Takes a score object and returns a string representation
 */
function scoreToString(scoreType, score) {
  switch (scoreType) {
    case "Rounds + Reps":
      return `${score.rounds}+${score.reps}`
    case "Time":
      return `${score.min}:${score.sec}`
    case "Reps":
      return `${score.reps}`
    case "Load":
      return `${score.load}`
  }
}

export {scoreToString};