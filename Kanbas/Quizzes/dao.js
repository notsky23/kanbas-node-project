import quizModel from './model.js';

export const createQuiz = async (quiz) => {
    delete quiz._id;
    return quizModel.create(quiz);
};
export const findAllQuizzes = () => quizModel.find();
export const findAllQuizzesByCourse = (courseId) => {
    return quizModel.find({ course: courseId });
};
export const findQuizById = async (courseId, quizId) => {
    return await quizModel.findOne({_id: quizId, course: courseId});
};
export const updateQuiz = (courseId, quiz) => {
    return quizModel.findOneAndUpdate({ _id: courseId }, { $set: quiz }, { new: true });
};
export const deleteQuiz  = (quizId) => quizModel.deleteOne({ _id: quizId });