import assignmentModel from './model.js';

export const createAssignment = async (assignment) => {
    delete assignment._id;
    return assignmentModel.create(assignment);
};
export const findAllAssignments = () => assignmentModel.find();
export const findAllAssignmentsByCourse = (courseId) => {
    return assignmentModel.find({ course: courseId });
};
export const findAssignmentById = async (courseId, assignmentId) => {
    return await assignmentModel.findOne({_id: assignmentId, course: courseId});
};
export const updateAssignment = (courseId, assignment) => {
    return assignmentModel.findOneAndUpdate({ _id: courseId }, { $set: assignment }, { new: true });
};
export const deleteAssignment  = (assignmentId) => assignmentModel.deleteOne({ _id: assignmentId });