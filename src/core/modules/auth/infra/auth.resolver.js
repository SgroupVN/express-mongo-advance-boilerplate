import { LoginValidator, RefreshPasswordValidator } from 'core/modules/auth/index';
import { Module } from 'packages/handler';
import { AuthController } from './auth.controller';

export const AuthResolver = Module.builder()
    .addPrefix({
        prefixPath: '/auth',
        tag: 'auth',
        module: 'AuthModule'
    })
    .register([
        {
            route: '/',
            method: 'post',
            interceptors: [LoginValidator],
            controller: AuthController.login,
            body: 'LoginDto'
        },
        {
            route: '/refresh-password',
            method: 'post',
            interceptors: [RefreshPasswordValidator],
            controller: AuthController.refreshPassword,
            body: 'ChangePasswordDto'
        },
    ]);
