import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define answer schemas for different types of questions
const TrueFalseAnswerSchema = new Schema({
  _id: String,
  blankIndex: Number,
  answer: String,
  correct: Boolean,
});

const MultipleChoiceAnswerSchema = new Schema({
  _id: String,
  blankIndex: Number,
  answer: String,
  correct: Boolean,
});

const FillInBlankAnswerSchema = new Schema({
  _id: String,
  blankIndex: Number,
  answer: String,
  correct: Boolean,
});

// Define a base question schema to use for different question types
const BaseQuestionSchema = new Schema({
  _id: String,
  type: String,
  title: String,
  points: Number,
  question: String,
  answers: [new Schema({ // Define as a subdocument schema to apply further discrimination
    _id: String,
    blankIndex: Number,
    answer: String,
    correct: Boolean,
  }, { discriminatorKey: 'kind', _id: false })] // Adding discriminatorKey
}, { discriminatorKey: 'type' });

const quizSchema = new Schema({
  title: String,
  course: String,
  description: String,
  quiztype: String,
  points: Number,
  assignmentGroup: String,
  shuffleAnswers: Boolean,
  timeLimitCheck: Boolean,
  timeLimit: Number,
  MultipleAttempts: Boolean,
  showCorrectAnswers: String,
  accessCode: String,
  oneQuestionAtATime: Boolean,
  webcamRequired: Boolean,
  lockQuestionsAfterAnswering: Boolean,
  dueDate: Date,
  availableDate: Date,
  untilDate: Date,
  published: Boolean,
  questions: [BaseQuestionSchema],
}, { collection: "quizzes" });

// Apply discriminators for specific question types
const QuestionModel = mongoose.model('Question', BaseQuestionSchema);
const TrueFalseQuestion = QuestionModel.discriminator('TrueFalseQuestion', new Schema({
  answers: [TrueFalseAnswerSchema]
}));

const MultipleChoiceQuestion = QuestionModel.discriminator('MultipleChoiceQuestion', new Schema({
  answers: [MultipleChoiceAnswerSchema]
}));

const FillInBlanksQuestion = QuestionModel.discriminator('FillInMultipleBlanksQuestion', new Schema({
  answers: [FillInBlankAnswerSchema]
}));

export default quizSchema;