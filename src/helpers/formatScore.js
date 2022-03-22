/** Takes a score object and returns a string representation
 */
function scoreToString(score) {
  switch (score.type) {
    case "Rounds + Reps":
    case "rounds + reps":
      return `${score.rounds}+${score.reps}`
    case "Time":
    case "time":
      return `${score.min}:${formatSec(score.sec)}`
    case "Reps":
    case "reps":
      return `${score.reps}`
    case "Load":
    case "load":
      return `${score.load}`
    case "Calories":
    case "calories":
      return `${score.calories}`
    default:
      return `${score.results}`
  }
}

function formatSec(sec) {
  if (+sec < 10) return `0${+sec}`;
  return `${sec}`
}

export {scoreToString};