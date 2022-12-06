/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/gessit-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppController = class AppController {
};
AppController = tslib_1.__decorate([
    (0, common_1.Controller)()
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/gessit-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
const common_2 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const auth_module_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.module.ts");
const app_controller_1 = __webpack_require__("./apps/gessit-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/gessit-api/src/app/app.service.ts");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
const threads_module_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.module.ts");
const users_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.module.ts");
const core_1 = __webpack_require__("@nestjs/core");
const jwt_auth_guard_1 = __webpack_require__("./apps/gessit-api/src/app/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__("./apps/gessit-api/src/app/auth/roles.guard.ts");
const themes_module_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.module.ts");
const messages_module_1 = __webpack_require__("./apps/gessit-api/src/app/messages/messages.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_2.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/gessit'), communities_module_1.CommunitiesModule, threads_module_1.ThreadsModule, auth_module_1.AuthModule, users_module_1.UsersModule, themes_module_1.ThemesModule, messages_module_1.MessagesModule],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            },
            app_service_1.AppService
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to gessit-api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
const auth_service_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.service.ts");
const local_auth_guard_1 = __webpack_require__("./apps/gessit-api/src/app/auth/local-auth.guard.ts");
const create_user_dto_1 = __webpack_require__("./apps/gessit-api/src/app/users/create-user.dto.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.login(req.body);
        });
    }
    register(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.register(user);
        });
    }
    getProfile(req) {
        return req.user;
    }
};
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.service.ts");
const local_strategy_1 = __webpack_require__("./apps/gessit-api/src/app/auth/local.strategy.ts");
const jwt_strategy_1 = __webpack_require__("./apps/gessit-api/src/app/auth/jwt.strategy.ts");
const users_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.module.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const constant_1 = __webpack_require__("./apps/gessit-api/src/app/auth/constant.ts");
const auth_controller_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.controller.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '2d' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = __webpack_require__("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(username, pass) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getUserByUsername(username);
            if (user) {
                const result = yield bcrypt.compare(pass, user.password);
                if (result) {
                    const { password } = user, result = tslib_1.__rest(user, ["password"]);
                    return result;
                }
            }
            throw new common_1.HttpException('Incorrect password or emailaddress', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { id: user._id, username: user.username, roles: user.roles };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    register(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.createUser(user.username, user.birthDate, user.emailAddress, user.phoneNumber, user.password, user.image);
            return yield this.login(result);
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const passport_1 = __webpack_require__("@nestjs/passport");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(app_module_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constant_1 = __webpack_require__("./apps/gessit-api/src/app/auth/constant.ts");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constant_1.jwtConstants.secret,
        });
        this.usersService = usersService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getUserByUsername(payload.username);
            if (user) {
                return { id: user._id, username: user.username, roles: user.roles };
            }
            else {
                throw new common_1.HttpException('Login has expired', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, password);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/roles.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/gessit-api/src/app/auth/roles.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const roles_decorator_1 = __webpack_require__("./apps/gessit-api/src/app/auth/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => { var _a; return (_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/communities.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.service.ts");
const create_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/create-community.dto.ts");
const update_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/update-community.dto.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
let CommunitiesController = class CommunitiesController {
    constructor(communityService) {
        this.communityService = communityService;
    }
    getCommunities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getCommunities();
        });
    }
    getAllJoinedCommunities(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getJoinedCommunities(req);
        });
    }
    getAllCreatedCommunities(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getCreatedCommunities(req);
        });
    }
    getCommunityById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getCommunityById(id);
        });
    }
    createCommunity(req, createCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.createCommunity(req, createCommunityDto);
        });
    }
    joinCommunity(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.joinCommunity(req, id);
        });
    }
    leaveCommunity(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.leaveCommunity(req, id);
        });
    }
    updateCommunity(req, id, updateCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.updateCommunity(req, id, updateCommunityDto);
        });
    }
    deleteCommunity(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.deleteCommunity(req, id);
        });
    }
};
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommunitiesController.prototype, "getCommunities", null);
tslib_1.__decorate([
    (0, common_1.Get)('/joined'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommunitiesController.prototype, "getAllJoinedCommunities", null);
tslib_1.__decorate([
    (0, common_1.Get)('/created'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommunitiesController.prototype, "getAllCreatedCommunities", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommunitiesController.prototype, "getCommunityById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_f = typeof create_community_dto_1.CreateCommunityDto !== "undefined" && create_community_dto_1.CreateCommunityDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommunitiesController.prototype, "createCommunity", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/join'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CommunitiesController.prototype, "joinCommunity", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/leave'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CommunitiesController.prototype, "leaveCommunity", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_k = typeof update_community_dto_1.UpdateCommunityDto !== "undefined" && update_community_dto_1.UpdateCommunityDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], CommunitiesController.prototype, "updateCommunity", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], CommunitiesController.prototype, "deleteCommunity", null);
CommunitiesController = tslib_1.__decorate([
    (0, common_1.Controller)('community'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof communities_service_1.CommunitiesService !== "undefined" && communities_service_1.CommunitiesService) === "function" ? _a : Object])
], CommunitiesController);
exports.CommunitiesController = CommunitiesController;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/communities.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const common_1 = __webpack_require__("@nestjs/common");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
const communities_controller_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.controller.ts");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.service.ts");
const themes_module_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.module.ts");
const users_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.module.ts");
let CommunitiesModule = class CommunitiesModule {
};
CommunitiesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: community_schema_1.Community.name, schema: community_schema_1.CommunitySchema }]), themes_module_1.ThemesModule, (0, common_1.forwardRef)(() => users_module_1.UsersModule)],
        controllers: [communities_controller_1.CommunitiesController],
        providers: [communities_service_1.CommunitiesService],
        exports: [mongoose_1.MongooseModule, communities_service_1.CommunitiesService]
    })
], CommunitiesModule);
exports.CommunitiesModule = CommunitiesModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/communities.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
const mongoose_1 = __webpack_require__("mongoose");
const themes_service_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.service.ts");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
let CommunitiesService = class CommunitiesService {
    constructor(communityModel, themesService, usersService) {
        this.communityModel = communityModel;
        this.themesService = themesService;
        this.usersService = usersService;
    }
    getCommunityById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            return yield this.communityModel.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
        });
    }
    getCommunities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityModel.find({});
        });
    }
    getJoinedCommunities(req) {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const joinedCommunities = [];
            const user = yield this.usersService.getUserById(req.user.id);
            try {
                for (var _b = tslib_1.__asyncValues(user.joinedCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const communityId = _c.value;
                    joinedCommunities.push(yield this.getCommunityById(communityId.toString()));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return joinedCommunities;
        });
    }
    getCreatedCommunities(req) {
        var e_2, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdCommunities = [];
            const user = yield this.usersService.getUserById(req.user.id);
            try {
                for (var _b = tslib_1.__asyncValues(user.createdCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const communityId = _c.value;
                    createdCommunities.push(yield this.getCommunityById(communityId.toString()));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return createdCommunities;
        });
    }
    createCommunity(req, createCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (createCommunityDto.themes) {
                if (!(yield this.areValidObjectIds(createCommunityDto.themes))) {
                    throw new common_1.HttpException('Themes attribute data must be of type ObjectId!', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const themesArray = (yield this.themesService.getThemes()).filter(p => createCommunityDto.themes.includes(p._id.toString()));
            const mergedCommunity = new this.communityModel(Object.assign(Object.assign({}, createCommunityDto), { _id: new mongoose_1.Types.ObjectId(), creationDate: new Date(), ranking: 0, themes: themesArray, owner: yield this.usersService.getUserById(req.user.id) }));
            yield this.usersService.addCreatedCommunity(mergedCommunity._id, new mongoose_1.Types.ObjectId(req.user.id));
            const community = yield this.communityModel.create(mergedCommunity);
            yield this.communityModel.updateMany({ _id: mergedCommunity._id, "owner._id": new mongoose_1.Types.ObjectId(req.user.id) }, { $push: { "owner.$[_id]createdCommunities": mergedCommunity._id } });
            return community;
        });
    }
    joinCommunity(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            if ((yield this.getCommunityById(id)).owner._id.equals(req.user.id)) {
                throw new common_1.HttpException('Can not join your own created community!', common_1.HttpStatus.BAD_REQUEST);
            }
            if ((yield this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length > 0) {
                throw new common_1.HttpException('Already part of this community!', common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.usersService.addJoinedCommunity(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(req.user.id));
            const community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $push: { members: (yield this.usersService.getUserById(req.user.id))._id } });
            yield this.communityModel.updateMany({ _id: new mongoose_1.Types.ObjectId(id), "owner._id": new mongoose_1.Types.ObjectId(req.user.id) }, { $push: { "owner.$[_id]joinedCommunities": new mongoose_1.Types.ObjectId(id) } });
            return community;
        });
    }
    leaveCommunity(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            if ((yield this.getCommunityById(id)).owner._id.equals(req.user.id)) {
                throw new common_1.HttpException('Can not leave your own created community!', common_1.HttpStatus.BAD_REQUEST);
            }
            if ((yield this.getCommunityById(id)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
                throw new common_1.HttpException('Not part of this community!', common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.usersService.removeJoinedCommunity(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(req.user.id));
            const community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $pull: { members: (yield this.usersService.getUserById(req.user.id))._id } });
            yield this.communityModel.updateMany({ _id: new mongoose_1.Types.ObjectId(id), "owner._id": new mongoose_1.Types.ObjectId(req.user.id) }, { $pull: { "owner.$[_id]joinedCommunities": new mongoose_1.Types.ObjectId(id) } });
            return community;
        });
    }
    updateCommunity(req, id, updateCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (updateCommunityDto.themes) {
                if (!(yield this.areValidObjectIds(updateCommunityDto.themes))) {
                    throw new common_1.HttpException('Themes attribute data must be of type ObjectId!', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            yield this.existing(id);
            if ((yield this.getCommunityById(id)).owner._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                let updatedObject = {};
                if (updateCommunityDto.themes) {
                    const themes = [];
                    for (const theme of updateCommunityDto.themes) {
                        themes.push(yield this.themesService.getThemeById(theme));
                    }
                    delete updateCommunityDto.themes;
                    updatedObject = { themes };
                }
                updatedObject = Object.assign(Object.assign({}, updateCommunityDto), updatedObject);
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, updatedObject);
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    deleteCommunity(req, id) {
        var e_3, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            const community = yield this.communityModel.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
            const creator = yield this.usersService.getUserById(community.owner._id.toString());
            if ((yield this.getCommunityById(id)).owner._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                try {
                    for (var _b = tslib_1.__asyncValues(community.members), _c; _c = yield _b.next(), !_c.done;) {
                        const memberId = _c.value;
                        yield this.usersService.removeJoinedCommunity(new mongoose_1.Types.ObjectId(community._id), new mongoose_1.Types.ObjectId(memberId));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                ;
                yield this.usersService.removeCreatedCommunity(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(creator._id));
                return yield this.communityModel.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    areValidObjectIds(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return value.every((id) => object_id_pipe_1.ObjectIdPipe.isValidObjectId(id));
        });
    }
    existing(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: new mongoose_1.Types.ObjectId(communityId) });
            if (!community) {
                throw new common_1.HttpException(`Community with id ${communityId} does not exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
CommunitiesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof themes_service_1.ThemesService !== "undefined" && themes_service_1.ThemesService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], CommunitiesService);
exports.CommunitiesService = CommunitiesService;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/community.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitySchema = exports.Community = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.schema.ts");
let Community = class Community {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Community.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Number !== "undefined" && Number) === "function" ? _b : Object)
], Community.prototype, "ranking", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Community.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "image", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Community.prototype, "isOpen", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "themes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "threads", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "members", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _d : Object)
], Community.prototype, "owner", void 0);
Community = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Community);
exports.Community = Community;
exports.CommunitySchema = mongoose_1.SchemaFactory.createForClass(Community);


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/create-community.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCommunityDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateCommunityDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateCommunityDto.prototype, "isOpen", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", Array)
], CreateCommunityDto.prototype, "themes", void 0);
exports.CreateCommunityDto = CreateCommunityDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/update-community.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCommunityDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateCommunityDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateCommunityDto.prototype, "isOpen", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], UpdateCommunityDto.prototype, "themes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], UpdateCommunityDto.prototype, "threads", void 0);
exports.UpdateCommunityDto = UpdateCommunityDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/create-message.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMessageDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateMessageDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
exports.CreateMessageDto = CreateMessageDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/message.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageSchema = exports.Message = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Message = class Message {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Message.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Message.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "content", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], Message.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Message.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Message.prototype, "hasLikes", void 0);
Message = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Message);
exports.Message = Message;
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/messages.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
const create_message_dto_1 = __webpack_require__("./apps/gessit-api/src/app/messages/create-message.dto.ts");
const messages_service_1 = __webpack_require__("./apps/gessit-api/src/app/messages/messages.service.ts");
const update_message_dto_1 = __webpack_require__("./apps/gessit-api/src/app/messages/update-message.dto.ts");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    getMessages(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.getMessages(communityId, threadId);
        });
    }
    getMessageById(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.getMessageById(communityId, threadId, messageId);
        });
    }
    createMessage(req, communityId, threadId, createMessageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.createMessage(req, communityId, threadId, createMessageDto);
        });
    }
    likeMessage(req, communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.likeMessage(req, communityId, threadId, messageId);
        });
    }
    updateMessage(req, communityId, threadId, messageId, updateMessageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.updateMessage(req, communityId, threadId, messageId, updateMessageDto);
        });
    }
    deleteMessage(req, communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messagesService.deleteMessage(req, communityId, threadId, messageId);
        });
    }
};
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':communityId/thread/:threadId/message'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MessagesController.prototype, "getMessages", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':communityId/thread/:threadId/message/:messageId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('messageId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MessagesController.prototype, "getMessageById", null);
tslib_1.__decorate([
    (0, common_1.Post)(':communityId/thread/:threadId/message'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, typeof (_d = typeof create_message_dto_1.CreateMessageDto !== "undefined" && create_message_dto_1.CreateMessageDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MessagesController.prototype, "createMessage", null);
tslib_1.__decorate([
    (0, common_1.Post)(':communityId/thread/:threadId/message/:messageId/like'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Param)('messageId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MessagesController.prototype, "likeMessage", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':communityId/thread/:threadId/message/:messageId'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Param)('messageId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(4, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, String, typeof (_g = typeof update_message_dto_1.UpdateMessageDto !== "undefined" && update_message_dto_1.UpdateMessageDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MessagesController.prototype, "updateMessage", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':communityId/thread/:threadId/message/:messageId'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Param)('messageId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MessagesController.prototype, "deleteMessage", null);
MessagesController = tslib_1.__decorate([
    (0, common_1.Controller)('community'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof messages_service_1.MessagesService !== "undefined" && messages_service_1.MessagesService) === "function" ? _a : Object])
], MessagesController);
exports.MessagesController = MessagesController;


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/messages.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
const message_schema_1 = __webpack_require__("./apps/gessit-api/src/app/messages/message.schema.ts");
const messages_controller_1 = __webpack_require__("./apps/gessit-api/src/app/messages/messages.controller.ts");
const messages_service_1 = __webpack_require__("./apps/gessit-api/src/app/messages/messages.service.ts");
let MessagesModule = class MessagesModule {
};
MessagesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema }]), communities_module_1.CommunitiesModule],
        controllers: [messages_controller_1.MessagesController],
        providers: [messages_service_1.MessagesService]
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/messages.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
const message_schema_1 = __webpack_require__("./apps/gessit-api/src/app/messages/message.schema.ts");
let MessagesService = class MessagesService {
    constructor(communityModel, messageModel) {
        this.communityModel = communityModel;
        this.messageModel = messageModel;
    }
    getMessageById(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId, messageId);
            const community = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId), "messages._id": new mongoose_2.Types.ObjectId(messageId) });
            return community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(messageId)))[0];
        });
    }
    getMessages(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            const community = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) });
            return community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages;
        });
    }
    createMessage(req, communityId, threadId, createMessageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            const currentCommunity = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId) });
            if (currentCommunity.members.filter(p => p._id.equals(req.user.id)).length === 0) {
                if (currentCommunity.owner._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                    const id = new mongoose_2.Types.ObjectId();
                    const newMessage = new this.messageModel(Object.assign(Object.assign({ _id: id, creator: req.user.id }, createMessageDto), { likes: [], creationDate: new Date(), hasLikes: false }));
                    const community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages": newMessage } }, { new: true });
                    return community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(id))[0];
                }
                else {
                    throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            else {
                const id = new mongoose_2.Types.ObjectId();
                const newMessage = new this.messageModel(Object.assign(Object.assign({ _id: id, creator: req.user.id }, createMessageDto), { likes: [], creationDate: new Date(), hasLikes: false }));
                const community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages": newMessage } }, { new: true });
                return community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(id))[0];
            }
        });
    }
    likeMessage(req, communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId, messageId);
            const message = yield this.getMessageById(communityId, threadId, messageId);
            let result;
            if (message.likes.filter(p => p.equals(req.user.id)).length === 0) {
                result = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages.$[message].likes": req.user.id } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            else {
                result = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $pull: { "threads.$.messages.$[message].likes": req.user.id } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            if ((result.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId))))[0].messages.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(messageId)))[0].likes.length > 0) {
                result = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $set: { "threads.$.messages.$[message].hasLikes": true } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            else {
                result = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $set: { "threads.$.messages.$[message].hasLikes": false } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            return result.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(messageId)))[0];
        });
    }
    updateMessage(req, communityId, threadId, messageId, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId, messageId);
            const community = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId) });
            const resultMessage = community.threads.filter(p => p._id.equals(threadId))[0].messages.filter(p => p._id.equals(messageId))[0];
            if (resultMessage.creator._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                const oldMessage = yield this.getMessageById(communityId, threadId, messageId);
                const newMessage = Object.assign(Object.assign({}, oldMessage), message);
                yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $pull: { "threads.$.messages": oldMessage } });
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages": newMessage } }, { new: true });
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    deleteMessage(req, communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId, messageId);
            const community = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId) });
            const resultMessage = community.threads.filter(p => p._id.equals(threadId))[0].messages.filter(p => p._id.equals(messageId))[0];
            if (resultMessage.creator._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                const message = yield this.getMessageById(communityId, threadId, messageId);
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $pull: { "threads.$.messages": message } }, { new: true });
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    existing(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: new mongoose_2.Types.ObjectId(communityId) });
            if (!community) {
                throw new common_1.HttpException(`Community with id ${communityId} does not exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (threadId) {
                if (!(community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId))).length > 0)) {
                    throw new common_1.HttpException(`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (messageId) {
                if (!(community.threads.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(p => p._id.equals(new mongoose_2.Types.ObjectId(messageId))).length > 0)) {
                    throw new common_1.HttpException(`Message with id ${messageId} doesn't exist in the thread with id ${threadId} in the community with id ${communityId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
};
MessagesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], MessagesService);
exports.MessagesService = MessagesService;


/***/ }),

/***/ "./apps/gessit-api/src/app/messages/update-message.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMessageDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateMessageDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateMessageDto.prototype, "content", void 0);
exports.UpdateMessageDto = UpdateMessageDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/shared/filters/validation.exception.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationException = void 0;
const common_1 = __webpack_require__("@nestjs/common");
class ValidationException extends common_1.BadRequestException {
    constructor(validationErrors) {
        super();
        this.validationErrors = validationErrors;
    }
}
exports.ValidationException = ValidationException;


/***/ }),

/***/ "./apps/gessit-api/src/app/shared/filters/validation.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationFilter = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const validation_exception_1 = __webpack_require__("./apps/gessit-api/src/app/shared/filters/validation.exception.ts");
let ValidationFilter = class ValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp(), response = ctx.getResponse();
        return response.status(400).json({
            statusCode: 400,
            timeStamp: new Date(),
            createdBy: "ValidationFilter",
            validationErrors: exception.validationErrors
        });
    }
};
ValidationFilter = tslib_1.__decorate([
    (0, common_1.Catch)(validation_exception_1.ValidationException)
], ValidationFilter);
exports.ValidationFilter = ValidationFilter;


/***/ }),

/***/ "./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectIdPipe = void 0;
const validation_exception_1 = __webpack_require__("./apps/gessit-api/src/app/shared/filters/validation.exception.ts");
var ObjectId = (__webpack_require__("mongoose").Types.ObjectId);
class ObjectIdPipe {
    transform(value) {
        if (!ObjectId.isValid(value)) {
            throw new validation_exception_1.ValidationException([`ObjectId has wrong value: ${value}, ObjectId is not valid!`]);
        }
        return value;
    }
    static isValidObjectId(value) {
        try {
            ObjectId.createFromHexString(value);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.ObjectIdPipe = ObjectIdPipe;


/***/ }),

/***/ "./apps/gessit-api/src/app/themes/create-theme.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateThemeDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateThemeDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateThemeDto.prototype, "name", void 0);
exports.CreateThemeDto = CreateThemeDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/themes/theme.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemeSchema = exports.Theme = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Theme = class Theme {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Theme.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Theme.prototype, "name", void 0);
Theme = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Theme);
exports.Theme = Theme;
exports.ThemeSchema = mongoose_1.SchemaFactory.createForClass(Theme);


/***/ }),

/***/ "./apps/gessit-api/src/app/themes/themes.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
const roles_decorator_1 = __webpack_require__("./apps/gessit-api/src/app/auth/roles.decorator.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
const create_theme_dto_1 = __webpack_require__("./apps/gessit-api/src/app/themes/create-theme.dto.ts");
const themes_service_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.service.ts");
let ThemesController = class ThemesController {
    constructor(themeService) {
        this.themeService = themeService;
    }
    getThemes() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.themeService.getThemes();
        });
    }
    getThemeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.themeService.getThemeById(id);
        });
    }
    createTheme(createThemeDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.themeService.createTheme(createThemeDto.name);
        });
    }
    deleteTheme(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.themeService.deleteTheme(id);
        });
    }
};
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ThemesController.prototype, "getThemes", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ThemesController.prototype, "getThemeById", null);
tslib_1.__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_theme_dto_1.CreateThemeDto !== "undefined" && create_theme_dto_1.CreateThemeDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ThemesController.prototype, "createTheme", null);
tslib_1.__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ThemesController.prototype, "deleteTheme", null);
ThemesController = tslib_1.__decorate([
    (0, common_1.Controller)('theme'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof themes_service_1.ThemesService !== "undefined" && themes_service_1.ThemesService) === "function" ? _a : Object])
], ThemesController);
exports.ThemesController = ThemesController;


/***/ }),

/***/ "./apps/gessit-api/src/app/themes/themes.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const theme_schema_1 = __webpack_require__("./apps/gessit-api/src/app/themes/theme.schema.ts");
const themes_controller_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.controller.ts");
const themes_service_1 = __webpack_require__("./apps/gessit-api/src/app/themes/themes.service.ts");
let ThemesModule = class ThemesModule {
};
ThemesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: theme_schema_1.Theme.name, schema: theme_schema_1.ThemeSchema }])],
        controllers: [themes_controller_1.ThemesController],
        providers: [themes_service_1.ThemesService],
        exports: [themes_service_1.ThemesService]
    })
], ThemesModule);
exports.ThemesModule = ThemesModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/themes/themes.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const theme_schema_1 = __webpack_require__("./apps/gessit-api/src/app/themes/theme.schema.ts");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
let ThemesService = class ThemesService {
    constructor(themeModel) {
        this.themeModel = themeModel;
    }
    getThemeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            return this.themeModel.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
        });
    }
    getThemes() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.themeModel.find({});
        });
    }
    createTheme(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((yield this.getThemes()).filter(p => p.name === name).length > 0) {
                throw new common_1.HttpException('A Theme with this name already exists!', common_1.HttpStatus.BAD_REQUEST);
            }
            const newTheme = new this.themeModel({
                _id: new mongoose_1.Types.ObjectId(),
                name
            });
            return newTheme.save();
        });
    }
    deleteTheme(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            return this.themeModel.findOneAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
        });
    }
    existing(themeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const theme = yield this.themeModel.findOne({ _id: new mongoose_1.Types.ObjectId(themeId) });
            if (!theme) {
                throw new common_1.HttpException(`Theme with id ${themeId} does not exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
ThemesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(theme_schema_1.Theme.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ThemesService);
exports.ThemesService = ThemesService;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/create-thread.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateThreadDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateThreadDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "image", void 0);
exports.CreateThreadDto = CreateThreadDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/thread.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadSchema = exports.Thread = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Thread = class Thread {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Thread.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "content", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Thread.prototype, "views", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], Thread.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Thread.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "image", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], Thread.prototype, "messages", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _c : Object)
], Thread.prototype, "creator", void 0);
Thread = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Thread);
exports.Thread = Thread;
exports.ThreadSchema = mongoose_1.SchemaFactory.createForClass(Thread);


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/threads.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const threads_service_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.service.ts");
const update_thread_dto_1 = __webpack_require__("./apps/gessit-api/src/app/threads/update-thread.dto.ts");
const create_thread_dto_1 = __webpack_require__("./apps/gessit-api/src/app/threads/create-thread.dto.ts");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
let ThreadsController = class ThreadsController {
    constructor(threadService) {
        this.threadService = threadService;
    }
    getThreads(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.getThreads(communityId);
        });
    }
    getThreadById(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.getThreadById(communityId, threadId);
        });
    }
    createThread(req, createThreadDto, communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.createThread(req, communityId, createThreadDto);
        });
    }
    likeThread(req, communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.likeThread(req, communityId, threadId);
        });
    }
    viewThread(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.viewThread(communityId, threadId);
        });
    }
    updateThread(req, communityId, threadId, updateThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.updateThread(req, communityId, threadId, updateThreadDto);
        });
    }
    deleteThread(req, communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.deleteThread(req, communityId, threadId);
        });
    }
};
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':communityId/thread'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ThreadsController.prototype, "getThreads", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Get)(':communityId/thread/:threadId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ThreadsController.prototype, "getThreadById", null);
tslib_1.__decorate([
    (0, common_1.Post)(':communityId/thread'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof create_thread_dto_1.CreateThreadDto !== "undefined" && create_thread_dto_1.CreateThreadDto) === "function" ? _d : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ThreadsController.prototype, "createThread", null);
tslib_1.__decorate([
    (0, common_1.Post)(':communityId/thread/:threadId/like'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ThreadsController.prototype, "likeThread", null);
tslib_1.__decorate([
    (0, app_module_1.Public)(),
    (0, common_1.Post)(':communityId/thread/:threadId/view'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ThreadsController.prototype, "viewThread", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':communityId/thread/:threadId'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, typeof (_f = typeof update_thread_dto_1.UpdateThreadDto !== "undefined" && update_thread_dto_1.UpdateThreadDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ThreadsController.prototype, "updateThread", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':communityId/thread/:threadId'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('communityId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('threadId', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ThreadsController.prototype, "deleteThread", null);
ThreadsController = tslib_1.__decorate([
    (0, common_1.Controller)('community'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof threads_service_1.ThreadsService !== "undefined" && threads_service_1.ThreadsService) === "function" ? _a : Object])
], ThreadsController);
exports.ThreadsController = ThreadsController;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/threads.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const common_1 = __webpack_require__("@nestjs/common");
const thread_schema_1 = __webpack_require__("./apps/gessit-api/src/app/threads/thread.schema.ts");
const threads_controller_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.controller.ts");
const threads_service_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.service.ts");
const users_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.module.ts");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
let ThreadsModule = class ThreadsModule {
};
ThreadsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: thread_schema_1.Thread.name, schema: thread_schema_1.ThreadSchema }]), users_module_1.UsersModule, communities_module_1.CommunitiesModule],
        controllers: [threads_controller_1.ThreadsController],
        providers: [threads_service_1.ThreadsService]
    })
], ThreadsModule);
exports.ThreadsModule = ThreadsModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/threads.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const thread_schema_1 = __webpack_require__("./apps/gessit-api/src/app/threads/thread.schema.ts");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.service.ts");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
let ThreadsService = class ThreadsService {
    constructor(communityModel, threadModel, usersService, communitiesService) {
        this.communityModel = communityModel;
        this.threadModel = threadModel;
        this.usersService = usersService;
        this.communitiesService = communitiesService;
    }
    getThreadById(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            return (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(communityId) } },
                { $match: { "threads._id": new mongoose_1.Types.ObjectId(threadId) } },
                { $unwind: { path: "$members", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: { $eq: ["$$thread._id", new mongoose_1.Types.ObjectId(threadId)] }
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.creator",
                        foreignField: "_id",
                        as: "threads.creator"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.creator",
                        foreignField: "_id",
                        as: "threads.messages.creator"
                    } },
                { $set: {
                        "threads.messages.creator": "$threads.messages.creator"
                    } },
                { $group: {
                        _id: "$threads._id",
                        title: {
                            $first: "$threads.title"
                        },
                        content: {
                            $first: "$threads.content"
                        },
                        views: {
                            $first: "$threads.views"
                        },
                        likes: {
                            $first: "$threads.likes"
                        },
                        creationDate: {
                            $first: "$threads.creationDate"
                        },
                        image: {
                            $first: "$threads.image"
                        },
                        messages: {
                            $push: "$threads.messages"
                        },
                        creator: {
                            $first: "$threads.creator"
                        }
                    } },
                { $unset: ["creator.password", "creator.__v", "messages.creator.password", "messages.creator.__v"] }
            ]))[0];
        });
    }
    getThreads(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId);
            return (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(communityId) } },
                { $unwind: { path: "$members", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: true
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.creator",
                        foreignField: "_id",
                        as: "threads.creator"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.creator",
                        foreignField: "_id",
                        as: "threads.messages.creator"
                    } },
                { $set: {
                        "threads.messages.creator": "$threads.messages.creator"
                    } },
                { $group: {
                        _id: "$threads._id",
                        title: {
                            $first: "$threads.title"
                        },
                        content: {
                            $first: "$threads.content"
                        },
                        views: {
                            $first: "$threads.views"
                        },
                        likes: {
                            $first: "$threads.likes"
                        },
                        creationDate: {
                            $first: "$threads.creationDate"
                        },
                        image: {
                            $first: "$threads.image"
                        },
                        messages: {
                            $push: "$threads.messages"
                        },
                        creator: {
                            $first: "$threads.creator"
                        }
                    } },
                { $unset: ["creator.password", "creator.__v", "messages.creator.password", "messages.creator.__v"] }
            ]));
        });
    }
    createThread(req, communityId, createThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId);
            if ((yield this.communitiesService.getCommunityById(communityId)).members.filter(p => p._id.equals(req.user.id)).length === 0) {
                if ((yield this.communitiesService.getCommunityById(communityId)).owner._id.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                    const newThread = new this.threadModel(Object.assign(Object.assign({}, createThreadDto), { _id: new mongoose_1.Types.ObjectId(), views: 0, creationDate: new Date(), creator: req.user.id }));
                    return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId) }, { $push: { threads: newThread } });
                }
                else {
                    throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            else {
                const newThread = new this.threadModel(Object.assign(Object.assign({}, createThreadDto), { _id: new mongoose_1.Types.ObjectId(), views: 0, creationDate: new Date(), creator: req.user.id }));
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId) }, { $push: { threads: newThread } });
            }
        });
    }
    likeThread(req, communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            let community;
            if ((yield this.communityModel.find({ $and: [{ _id: new mongoose_1.Types.ObjectId(communityId) }, { threads: { $elemMatch: { _id: new mongoose_1.Types.ObjectId(threadId), likes: { $in: [req.user.id] } } } }] })).length === 0) {
                community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId), "threads._id": new mongoose_1.Types.ObjectId(threadId) }, { $push: { "threads.$.likes": req.user.id } }, { new: true });
            }
            else {
                community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId), "threads._id": new mongoose_1.Types.ObjectId(threadId) }, { $pull: { "threads.$.likes": req.user.id } }, { new: true });
            }
            return community.threads.filter(p => p._id.equals(new mongoose_1.Types.ObjectId(threadId)))[0];
        });
    }
    viewThread(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            let community = yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId), "threads._id": new mongoose_1.Types.ObjectId(threadId) }, { $inc: { "threads.$.views": 1 } });
            return community.threads.filter(p => p._id.equals(new mongoose_1.Types.ObjectId(threadId)))[0];
        });
    }
    updateThread(req, communityId, threadId, thread) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            if ((yield this.getThreadById(communityId, threadId)).creator.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                const oldThread = yield this.getThreadById(communityId, threadId);
                const newThread = Object.assign(Object.assign({}, oldThread), thread);
                yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId) }, { $pull: { threads: oldThread } });
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId) }, { $push: { threads: newThread } });
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    deleteThread(req, communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(communityId, threadId);
            if ((yield this.getThreadById(communityId, threadId)).creator.equals(req.user.id) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                const thread = yield this.getThreadById(communityId, threadId);
                return yield this.communityModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(communityId) }, { $pull: { threads: thread } });
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    existing(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: new mongoose_1.Types.ObjectId(communityId) });
            if (!community) {
                throw new common_1.HttpException(`Community with id ${communityId} does not exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (threadId) {
                if (!(community.threads.filter(thread => thread._id.equals(new mongoose_1.Types.ObjectId(threadId))).length > 0)) {
                    throw new common_1.HttpException(`Thread with id ${threadId} doesn't exist in the community with id ${communityId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
};
ThreadsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(thread_schema_1.Thread.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object, typeof (_d = typeof communities_service_1.CommunitiesService !== "undefined" && communities_service_1.CommunitiesService) === "function" ? _d : Object])
], ThreadsService);
exports.ThreadsService = ThreadsService;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/update-thread.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateThreadDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateThreadDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "image", void 0);
exports.UpdateThreadDto = UpdateThreadDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(/^\d{4}[./-]\d{2}[./-]\d{2}$/),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateUserDto.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "image", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./apps/gessit-api/src/app/users/update-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(/^\d{4}[./-]\d{2}[./-]\d{2}$/),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateUserDto.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "image", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "registerDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "image", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "following", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "followers", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'Community',
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "createdCommunities", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'Community',
        default: []
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "joinedCommunities", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/gessit-api/src/app/users/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const roles_decorator_1 = __webpack_require__("./apps/gessit-api/src/app/auth/roles.decorator.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/shared/pipes/object.id.pipe.ts");
const create_user_dto_1 = __webpack_require__("./apps/gessit-api/src/app/users/create-user.dto.ts");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
const update_user_dto_1 = __webpack_require__("./apps/gessit-api/src/app/users/update-user.dto.ts");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUsers();
        });
    }
    getUserById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserById(id);
        });
    }
    getUserByUsername(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserByUsername(username);
        });
    }
    followUser(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.followUser(req, id);
        });
    }
    unfollowUser(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.unfollowUser(req, id);
        });
    }
    createUser(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.createUser(createUserDto.username, createUserDto.birthDate, createUserDto.emailAddress, createUserDto.phoneNumber, createUserDto.password, createUserDto.image);
        });
    }
    updateUser(req, id, updateUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.updateUser(req, id, updateUserDto);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "getUserById", null);
tslib_1.__decorate([
    (0, common_1.Get)(':username'),
    tslib_1.__param(0, (0, common_1.Param)('username')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "getUserByUsername", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/follow'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "followUser", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/unfollow'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "unfollowUser", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_j = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UsersController.prototype, "updateUser", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
const user_schema_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.schema.ts");
const users_controller_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.controller.ts");
const users_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/users.service.ts");
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]), (0, common_1.forwardRef)(() => communities_module_1.CommunitiesModule)],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/gessit-api/src/app/users/role.enum.ts");
const bcrypt = __webpack_require__("bcrypt");
const user_schema_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.schema.ts");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.service.ts");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
let UsersService = class UsersService {
    constructor(userModel, communityModel, communitiesService) {
        this.userModel = userModel;
        this.communityModel = communityModel;
        this.communitiesService = communitiesService;
    }
    getUserByUsername(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ username: username });
        });
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.aggregate([
                { $lookup: {
                        from: "users",
                        localField: "following",
                        foreignField: "_id",
                        as: "following"
                    } },
                { $lookup: {
                        from: "users",
                        localField: "followers",
                        foreignField: "_id",
                        as: "followers"
                    } },
                { $unset: ["password", "__v"] }
            ]);
        });
    }
    getUserById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            return (yield this.userModel.aggregate([
                { $match: { "_id": new mongoose_1.Types.ObjectId(id) } },
                { $lookup: {
                        from: "users",
                        localField: "following",
                        foreignField: "_id",
                        as: "following"
                    } },
                { $lookup: {
                        from: "users",
                        localField: "followers",
                        foreignField: "_id",
                        as: "followers"
                    } },
                { $unset: ["password", "__v"] }
            ]))[0];
        });
    }
    addJoinedCommunity(communityId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(userId.toString());
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $push: { joinedCommunities: communityId } }, { new: true });
        });
    }
    addCreatedCommunity(communityId, userId) {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(userId.toString());
            const user = yield this.userModel.findOne({ _id: userId });
            try {
                for (var _b = tslib_1.__asyncValues(user.createdCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const createdCommunityId = _c.value;
                    yield this.communityModel.updateMany({ _id: new mongoose_1.Types.ObjectId(createdCommunityId), "owner._id": new mongoose_1.Types.ObjectId(userId) }, { $push: { "owner.$[_id]createdCommunities": communityId } });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $push: { createdCommunities: communityId } }, { new: true });
        });
    }
    removeJoinedCommunity(communityId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(userId.toString());
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (community.owner._id.equals(userId)) {
                yield this.communityModel.updateMany({ _id: communityId, "owner._id": userId }, { $pull: { "owner.$.joinedCommunities": communityId } });
            }
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { joinedCommunities: communityId } }, { new: true });
        });
    }
    removeCreatedCommunity(communityId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(userId.toString());
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { createdCommunities: communityId } }, { new: true });
        });
    }
    followUser(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            const user = yield this.getUserById(id);
            const loggedInUser = yield this.getUserById(req.user.id);
            if (!(loggedInUser._id.equals(user._id))) {
                if (!((yield this.userModel.find({ $and: [{ _id: req.user.id }, { following: { $in: new mongoose_1.Types.ObjectId(id) } }] })).length > 0)) {
                    const resultUser = yield this.userModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $push: { "followers": new mongoose_1.Types.ObjectId(req.user.id) } }, { new: true });
                    const resultLoggedIn = yield this.userModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(req.user.id) }, { $push: { "following": new mongoose_1.Types.ObjectId(id) } }, { new: true });
                    return [resultLoggedIn, resultUser];
                }
                else {
                    throw new common_1.HttpException('Already following this user!', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Can not follow yourself!', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    unfollowUser(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            const user = yield this.getUserById(id);
            const loggedInUser = yield this.getUserById(req.user.id);
            if (!(loggedInUser._id.equals(user._id))) {
                if (!((yield this.userModel.find({ $and: [{ _id: req.user.id }, { following: { $in: new mongoose_1.Types.ObjectId(id) } }] })).length === 0)) {
                    const resultUser = yield this.userModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, { $pull: { "followers": new mongoose_1.Types.ObjectId(req.user.id) } }, { new: true });
                    const resultLoggedIn = yield this.userModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(req.user.id) }, { $pull: { "following": new mongoose_1.Types.ObjectId(id) } }, { new: true });
                    return [resultLoggedIn, resultUser];
                }
                else {
                    throw new common_1.HttpException('You do not follow this user!', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Can not unfollow yourself!', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    createUser(username, birthDate, emailAddress, phoneNumber, password, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            password = yield bcrypt.hashSync(password, 10);
            birthDate = new Date(birthDate);
            birthDate.setHours(birthDate.getHours() + 1);
            if (birthDate > new Date()) {
                throw new common_1.HttpException(`Birthdate ${birthDate} lies in the future!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if ((yield this.getUsers()).filter(p => p.username === username).length > 0) {
                throw new common_1.HttpException(`Username ${username} already in use!`, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = new this.userModel({
                _id: new mongoose_1.Types.ObjectId(),
                username,
                birthDate,
                emailAddress,
                phoneNumber,
                password,
                registerDate: new Date(),
                image,
                roles: [role_enum_1.Role.User]
            });
            return this.userModel.create(newUser);
        });
    }
    updateUser(req, id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.existing(id);
            if (req.user.id.equals(new mongoose_1.Types.ObjectId(id)) || req.user.roles.includes(role_enum_1.Role.Admin)) {
                if (user.username) {
                    if ((yield this.getUsers()).filter(p => p.username === user.username && !(p._id.equals(new mongoose_1.Types.ObjectId(id)))).length > 0) {
                        throw new common_1.HttpException(`Username ${user.username} already in use!`, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                if (user.birthDate) {
                    user.birthDate = new Date(user.birthDate);
                    user.birthDate.setHours(user.birthDate.getHours() + 1);
                    if (user.birthDate > new Date()) {
                        throw new common_1.HttpException(`Birthdate ${user.birthDate} lies in the future!`, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                if (user.password) {
                    user.password = yield bcrypt.hashSync(user.password, 10);
                }
                user._id = new mongoose_1.Types.ObjectId(id);
                const ownedCommunities = (yield this.communitiesService.getCommunities()).filter(p => p.owner._id.equals(user._id));
                ownedCommunities.forEach((comm) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    yield this.communityModel.updateOne({ _id: new mongoose_1.Types.ObjectId(comm._id) }, { $set: { owner: Object.assign(Object.assign({}, (yield this.getUserById(id))), user) } });
                }));
                return this.userModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, user);
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    existing(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
            if (!user) {
                throw new common_1.HttpException(`User with id ${userId} does not exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => communities_service_1.CommunitiesService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof communities_service_1.CommunitiesService !== "undefined" && communities_service_1.CommunitiesService) === "function" ? _c : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
const validation_filter_1 = __webpack_require__("./apps/gessit-api/src/app/shared/filters/validation.filter.ts");
const validation_exception_1 = __webpack_require__("./apps/gessit-api/src/app/shared/filters/validation.exception.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.enableCors();
        app.useGlobalFilters(new validation_filter_1.ValidationFilter);
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe({
            exceptionFactory: (errors) => {
                const messages = errors.map(error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`);
                return new validation_exception_1.ValidationException(messages);
            }
        }));
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map