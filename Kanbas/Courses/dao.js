import courseModel from './model.js';

export const createCourse = async (course) => {
    // Check if a course with the given number, section and sem already exists
    const existingCourseNumber = await courseModel.findOne({ number: course.number });
    const existingCourseSection = await courseModel.findOne({ section: course.section });
    const existingCourseSem = await courseModel.findOne({ sem: course.sem });
    if (existingCourseNumber && existingCourseSection && existingCourseSem) {
        throw new Error('Course already exists check the course number, section and semester');
    }
    delete course._id;
    return courseModel.create(course);
};
export const findAllCourses = () => courseModel.find();
export const findCourseById = (courseId) => courseModel.findById(courseId);
// export const findCourseByName = (name) => courseModel.findOne({ name: name });
export const findCoursesBySem = (sem) => courseModel.find({ sem });
// export const updateCourse = (courseId, course) => courseModel.updateOne({ _id: courseId }, { $set: course });
export const updateCourse = (courseId, course) => {
    return courseModel.findOneAndUpdate({ _id: courseId }, { $set: course }, { new: true });
};
export const deleteCourse = (courseId) => courseModel.deleteOne({ _id: courseId });