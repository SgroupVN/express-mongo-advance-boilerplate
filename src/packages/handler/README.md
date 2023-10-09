# How to use it

```javascript
import { hasAdminRole } from 'core/modules/auth/guard/role.manager';
import { CreateTimetableRequestInterceptor, getTimetableRequestQueryInterceptor } from 'core/modules/timetable-request';
import { getTimetableRequestQuerySwagger } from 'core/modules/timetable-request/dto/get-timetable-request.swagger';
import { Module } from 'packages/handler';
import { interceptIdObject } from 'core/modules/mongoose/objectId.interceptor';
import { TimetableRequestController } from './timetable-request.controller';

export const TimetableRequestResolver = Module.builder()
    .addPrefix({
        prefixPath: '/timetable-requests', // Optional: Prefix path apply to all sub routing
        tag: 'timetable-request', // Optional: Group tag in swagger
        module: 'TimetableRequestModule' // Required: Decorate module name
    })
    .register([
        {
            route: '/', // Routing adapter to express
            method: 'get', // Http method
            params: getTimetableRequestQuerySwagger, // Params schema declaration in swagger
            interceptors: [getTimetableRequestQueryInterceptor], // Intercept request before it comes to controller
            controller: TimetableRequestController.getByType, // Controller handler
            preAuthorization: true // Authentication flag
        },
        {
            route: '/',
            method: 'post',
            interceptors: [
                new CreateTimetableRequestInterceptor() // Array of Interceptor which implement #intercept(req, res, next) interface
            ],
            body: 'CreateTimetableRequestDto', // Mapping body in swagger declaration
            controller: TimetableRequestController.createOne,
            preAuthorization: true
        },
        {
            route: '/:id/approve',
            method: 'patch',
            interceptors: [interceptIdObject],
            guards: [hasAdminRole],
            controller: TimetableRequestController.approveOne,
            preAuthorization: true
        },
        {
            route: '/:id/reject',
            method: 'patch',
            interceptors: [interceptIdObject],
            guards: [hasAdminRole], // Guard protection
            controller: TimetableRequestController.rejectOne,
            preAuthorization: true
        },
    ]);

```
