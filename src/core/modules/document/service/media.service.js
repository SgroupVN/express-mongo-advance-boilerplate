/* eslint-disable no-unused-vars */
import { LoggerFactory } from 'packages/logger/factory/logger.factory';

class Service {
    constructor() {
        this.logger = LoggerFactory.create('MediaService');
    }

    async uploadOne(file, folderName = '') {
        // try {
        //     const response = await cloudinaryUploader.upload(file.path, { folder: folderName });
        //     return {
        //         originalName: response.original_filename,
        //         url: response.secure_url,
        //         publicId: response.public_id
        //     };
        // } catch (error) {
        //     throw new InternalServerException(error.message);
        // } finally {
        //     unlink(file.path, err => {
        //         if (err) {
        //             this.logger.error(err.message);
        //             throw new InternalServerException(err.message);
        //         }
        //     });
        // }
    }

    async uploadMany(files, folderName = '') {
        // const uploadTasks = files.map(file => this.uploadOne(file, folderName));
        //
        // return Promise.all(uploadTasks);
    }

    async deleteMany(ids) {
        // const deleteTasks = ids.map(id => this.deleteOne(id));
        //
        // return Promise.all(deleteTasks);
    }

    async deleteOne(id) {
        return {
            id,
        };
    }
}

export const MediaService = new Service();
