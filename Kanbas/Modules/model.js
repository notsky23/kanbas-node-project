import mongoose from 'mongoose';
import moduleSchema from './schema.js';

const moduleModel = mongoose.model("ModuleModel", moduleSchema);

export default moduleModel;