import { uploadMediaSwagger } from 'core/system/swagger';
import { deleteMediasInterceptor, MediaInterceptor } from 'core/modules/document/index';
import { Module } from 'packages/handler';
import { MediaController } from './media.controller';

export const MediaResolver = Module.builder()
    .addPrefix({
        prefixPath: '/media',
        tag: 'media',
        module: 'MediaModule'
    })
    .register([
        {
            route: '/images',
            method: 'post',
            params: [uploadMediaSwagger],
            consumes: ['multipart/form-data'],
            interceptors: [new MediaInterceptor(10)],
            controller: MediaController.uploadMany,
            preAuthorization: true
        },
        {
            route: '/images',
            method: 'delete',
            interceptors: [deleteMediasInterceptor],
            body: 'DeleteFileDto',
            controller: MediaController.deleteMany,
            preAuthorization: true
        },
    ]);
