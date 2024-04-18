import moduleModel from './model.js';

export const createModule = async (module) => {
    delete module._id;
    return moduleModel.create(module);
};
export const findAllModules = () => moduleModel.find();
export const findAllModulesByCourse = (courseId) => {
    return moduleModel.find({ course: courseId });
};
export const updateModule = (courseId, module) => {
    return moduleModel.findOneAndUpdate({ _id: courseId }, { $set: module }, { new: true });
};
export const deleteModule = (moduleId) => moduleModel.deleteOne({ _id: moduleId });