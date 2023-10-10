import { generateDocBasedOnSchema, ObjectId } from 'core/system/swagger';
import { hasAdminRole } from 'core/modules/auth';
import { MediaInterceptor } from 'core/modules/document';
import { interceptIdObject } from 'core/system/database/interceptors/objectId.interceptor';
import { changePasswordInterceptor, createUserInterceptor, updateProfileInterceptor } from 'core/modules/user';
import { Module } from 'packages/handler/Module';
import SearchUserSchema from './user-overview.query.json';
import { UserController } from './user.controller';

export const UserResolver = Module.builder()
    .addPrefix({
        prefixPath: '/users',
        tag: 'users',
        module: 'UserModule'
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: generateDocBasedOnSchema(SearchUserSchema),
            guards: [hasAdminRole],
            controller: UserController.findAll,
            preAuthorization: true
        },
        {
            route: '/:id',
            method: 'get',
            params: [ObjectId],
            interceptors: [interceptIdObject],
            guards: [hasAdminRole],
            controller: UserController.findOne,
            preAuthorization: true
        },
        {
            route: '/',
            method: 'post',
            body: 'UpsertUserDto',
            interceptors: [createUserInterceptor],
            guards: [hasAdminRole],
            controller: UserController.createOne,
            preAuthorization: true
        },
        {
            route: '/avatar',
            method: 'post',
            consumes: ['multipart/form-data'],
            interceptors: [new MediaInterceptor()],
            guards: [hasAdminRole],
            controller: UserController.uploadAvatar,
            preAuthorization: true
        },
        {
            route: '/:id/avatar',
            method: 'patch',
            params: [ObjectId],
            consumes: ['multipart/form-data'],
            interceptors: [
                interceptIdObject,
                new MediaInterceptor()
            ],
            controller: UserController.updateAvatar,
            preAuthorization: true,
        },
        {
            route: '/password',
            method: 'patch',
            preAuthorization: true,
            body: 'ChangePasswordDto',
            interceptors: [changePasswordInterceptor],
            controller: UserController.changePassword,
        },
        {
            route: '/:id',
            method: 'patch',
            params: [ObjectId],
            body: 'UpdateProfileDto',
            interceptors: [
                interceptIdObject,
                updateProfileInterceptor
            ],
            guards: [hasAdminRole],
            controller: UserController.patchOne,
            preAuthorization: true
        },
        {
            route: '/:id',
            method: 'delete',
            params: [ObjectId],
            guards: [hasAdminRole],
            interceptors: [interceptIdObject],
            controller: UserController.deleteOne,
            preAuthorization: true
        },
    ]);
