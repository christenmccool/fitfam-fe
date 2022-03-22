const movementOpts = [
  {"id":"aPz3tX2Uwh","name":"Handstand Push-Up"},
  {"id":"iSu93oACwo","name":"Pull-up (Kipping)"},
  {"id":"Gl19kiplpb","name":"Toes-to-Bar"},
  {"id":"9iu4RgWSgi","name":"Push Up"},
  {"id":"VkmcRrRQFN","name":"Ring Dip"},
  {"id":"V8IKIUyIbF","name":"Muscle-Up"},
  {"id":"ggQ8RGQz8X","name":"Clean & Jerk"},
  {"id":"xPOJNy56VQ","name":"Power Snatch"},
  {"id":"vpJqkEzaNO","name":"Squat Snatch"},
  {"id":"32fORzP45M","name":"Power Clean"},
  {"id":"vyy5Tr0N49","name":"Squat Clean"},
  {"id":"e1XFB3PF7Q","name":"Thruster"},
  {"id":"XavuhsO1R0","name":"Overhead Squat"},
  {"id":"FrQGIrNfi8","name":"Push Press"},
  {"id":"umWlFaYtSo","name":"Front Squat"},
  {"id":"r3CNRMSi8j","name":"Deadlift"},
  {"id":"9ikRXPXECL","name":"Row"},
  {"id":"h9vPo5JYw6","name":"Jump Rope (Double Unders)"},
  {"id":"c94XVoGakB","name":"Burpee"},
  {"id":"QCUOoOtogo","name":"Kettlebell Swing"},
  {"id":"EZkHnWi9wf","name":"Wall Ball Shot"},
  {"id":"Pfe6N82u2K","name":"Box Jump"},
  {"id":"Q45eeXwOvG","name":"Air Squat"},
  {"id":"Y8GAfTQjlS","name":"Sit-up"}
];

const categoryOpts = [
  'girls',
  'heroes',
  'games',
  'featured', 
  'custom'
];


const scoreTypeToFields = [
  {
    scoreType: "Rounds + Reps",
    fields: ["rounds", "reps"]
  },
  {
    scoreType: "rounds + reps",
    fields: ["reps"]
  },
  {
    scoreType: "Time",
    fields: ["min", "sec"]
  },
  {
    scoreType: "time",
    fields: ["min", "sec"]
  },
  {
    scoreType: "Reps",
    fields: ["reps"]
  },
  {
    scoreType: "reps",
    fields: ["reps"]
  },
  {
    scoreType: "Load",
    fields: ["load"]
  },
  {
    scoreType: "load",
    fields: ["load"]
  },
  {
    scoreType: "Other / Text",
    fields: ["results"]
  },
  {
    scoreType: "Calories",
    fields: ["calories"]
  },
  {
    scoreType: "calories",
    fields: ["calories"]
  }
] 


export {movementOpts, categoryOpts, scoreTypeToFields};