import { uploadFileSwagger } from 'core/system/swagger';
import { hasAdminRole } from 'core/modules/auth';
import { Module } from 'packages/handler';
import { ExcelController } from './excel.controller';
import { ExcelInterceptor } from './interceptor/excel.interceptor';

export const ExcelResolver = Module.builder()
    .addPrefix({
        prefixPath: '/excels',
        tag: 'excels',
        module: 'ExcelModule'
    })
    .register([
        {
            route: '/',
            method: 'post',
            params: [uploadFileSwagger],
            consumes: ['multipart/form-data'],
            interceptors: [new ExcelInterceptor(1)],
            guards: [hasAdminRole],
            controller: ExcelController.uploadOne,
            preAuthorization: true
        }
    ]);
