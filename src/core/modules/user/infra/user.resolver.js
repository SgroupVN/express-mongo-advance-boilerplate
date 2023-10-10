import { ObjectId } from 'core/system/swagger';
import { hasAdminRole } from 'core/modules/auth';
import { interceptIdObject } from 'core/system/database/interceptors/objectId.interceptor';
import { createUserInterceptor } from 'core/modules/user/index';
import { Module } from 'packages/handler/Module';
import { UserController } from './user.controller';

export const UserResolver = Module.builder()
    .addPrefix({
        prefixPath: '/users',
        tag: 'users',
        module: 'UserModule'
    })
    .register([
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
            route: '/:id',
            method: 'delete',
            params: [ObjectId],
            guards: [hasAdminRole],
            interceptors: [interceptIdObject],
            controller: UserController.deleteOne,
            preAuthorization: true
        },
    ]);
