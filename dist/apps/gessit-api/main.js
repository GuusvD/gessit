/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/gessit-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.service.ts");
const app_module_1 = __webpack_require__("./apps/gessit-api/src/app/app.module.ts");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.login(req.body);
        });
    }
    getProfile(req) {
        return req.user;
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('auth/login'),
    (0, app_module_1.Public)(),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/gessit-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const auth_module_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.module.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/gessit-api/src/app/auth/jwt-auth.guard.ts");
const common_2 = __webpack_require__("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_2.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
const app_controller_1 = __webpack_require__("./apps/gessit-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/gessit-api/src/app/app.service.ts");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
const threads_module_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.module.ts");
const user_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/gessit'), communities_module_1.CommunitiesModule, threads_module_1.ThreadsModule, auth_module_1.AuthModule, user_module_1.UsersModule],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
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

/***/ "./apps/gessit-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/gessit-api/src/app/auth/auth.service.ts");
const local_strategy_1 = __webpack_require__("./apps/gessit-api/src/app/auth/local.strategy.ts");
const jwt_strategy_1 = __webpack_require__("./apps/gessit-api/src/app/auth/jwt.strategy.ts");
const user_module_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.module.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const constant_1 = __webpack_require__("./apps/gessit-api/src/app/auth/constant.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '60s' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
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
const user_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.service.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(username, pass) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne(username);
            if (user && user.password === pass) {
                const { password } = user, result = tslib_1.__rest(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { username: user.username, sub: user.userId };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UsersService !== "undefined" && user_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constant_1 = __webpack_require__("./apps/gessit-api/src/app/auth/constant.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constant_1.jwtConstants.secret,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { userId: payload.sub, username: payload.username };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


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

/***/ "./apps/gessit-api/src/app/communities/communities.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.service.ts");
const create_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/create-community.dto.ts");
const update_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/update-community.dto.ts");
const mongoose_1 = __webpack_require__("mongoose");
let CommunitiesController = class CommunitiesController {
    constructor(communityService) {
        this.communityService = communityService;
    }
    getCommunities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getCommunities();
        });
    }
    getCommunityById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.getCommunityById(new mongoose_1.Types.ObjectId(id));
        });
    }
    createCommunity(createCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.createCommunity(createCommunityDto.name, createCommunityDto.description, createCommunityDto.image, createCommunityDto.isOpen);
        });
    }
    updateCommunity(id, updateCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.updateCommunity(id, updateCommunityDto);
        });
    }
    deleteCommunity(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityService.deleteCommunity(new mongoose_1.Types.ObjectId(id));
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommunitiesController.prototype, "getCommunities", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommunitiesController.prototype, "getCommunityById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_community_dto_1.CreateCommunityDto !== "undefined" && create_community_dto_1.CreateCommunityDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommunitiesController.prototype, "createCommunity", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof update_community_dto_1.UpdateCommunityDto !== "undefined" && update_community_dto_1.UpdateCommunityDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommunitiesController.prototype, "updateCommunity", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
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
const communities_repository_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.repository.ts");
let CommunitiesModule = class CommunitiesModule {
};
CommunitiesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: community_schema_1.Community.name, schema: community_schema_1.CommunitySchema }])],
        controllers: [communities_controller_1.CommunitiesController],
        providers: [communities_service_1.CommunitiesService, communities_repository_1.CommunitiesRepository]
    })
], CommunitiesModule);
exports.CommunitiesModule = CommunitiesModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/communities.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/community.schema.ts");
let CommunitiesRepository = class CommunitiesRepository {
    constructor(communityModel) {
        this.communityModel = communityModel;
    }
    findOne(communityFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityModel.findOne(communityFilterQuery);
        });
    }
    find(communitiesFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityModel.find(communitiesFilterQuery);
        });
    }
    create(community) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCommunity = new this.communityModel(community);
            return newCommunity.save();
        });
    }
    findOneAndUpdate(communityFilterQuery, community) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityModel.findOneAndUpdate(communityFilterQuery, community);
        });
    }
    findOneAndDelete(communityFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityModel.findOneAndDelete(communityFilterQuery);
        });
    }
};
CommunitiesRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CommunitiesRepository);
exports.CommunitiesRepository = CommunitiesRepository;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/communities.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const communities_repository_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.repository.ts");
const mongoose_1 = __webpack_require__("mongoose");
let CommunitiesService = class CommunitiesService {
    constructor(communityRepository) {
        this.communityRepository = communityRepository;
    }
    getCommunityById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityRepository.findOne({ _id: id });
        });
    }
    getCommunities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityRepository.find({});
        });
    }
    createCommunity(name, description, image, isOpen) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityRepository.create({
                _id: new mongoose_1.Types.ObjectId(),
                name,
                description,
                ranking: 0,
                creationDate: new Date(),
                image,
                isOpen
            });
        });
    }
    updateCommunity(id, community) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            community._id = new mongoose_1.Types.ObjectId(community._id);
            return this.communityRepository.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, community);
        });
    }
    deleteCommunity(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.communityRepository.findOneAndDelete({ _id: id });
        });
    }
};
CommunitiesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof communities_repository_1.CommunitiesRepository !== "undefined" && communities_repository_1.CommunitiesRepository) === "function" ? _a : Object])
], CommunitiesService);
exports.CommunitiesService = CommunitiesService;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/community.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitySchema = exports.Community = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
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
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateCommunityDto.prototype, "isOpen", void 0);
exports.UpdateCommunityDto = UpdateCommunityDto;


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
], CreateThreadDto.prototype, "communityId", void 0);
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


var _a, _b;
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
], Thread.prototype, "communityId", void 0);
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
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Thread.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Thread.prototype, "dislikes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Thread.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "image", void 0);
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
const mongoose_1 = __webpack_require__("mongoose");
const threads_service_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.service.ts");
const update_thread_dto_1 = __webpack_require__("./apps/gessit-api/src/app/threads/update-thread.dto.ts");
const create_thread_dto_1 = __webpack_require__("./apps/gessit-api/src/app/threads/create-thread.dto.ts");
let ThreadsController = class ThreadsController {
    constructor(threadService) {
        this.threadService = threadService;
    }
    getThreads() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.getThreads();
        });
    }
    getThreadById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.getThreadById(new mongoose_1.Types.ObjectId(id));
        });
    }
    createThread(createThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.createThread(createThreadDto.communityId, createThreadDto.title, createThreadDto.content, createThreadDto.image);
        });
    }
    updateThread(id, updateThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.updateThread(id, updateThreadDto);
        });
    }
    deleteThread(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.threadService.deleteThread(new mongoose_1.Types.ObjectId(id));
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ThreadsController.prototype, "getThreads", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ThreadsController.prototype, "getThreadById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_thread_dto_1.CreateThreadDto !== "undefined" && create_thread_dto_1.CreateThreadDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ThreadsController.prototype, "createThread", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof update_thread_dto_1.UpdateThreadDto !== "undefined" && update_thread_dto_1.UpdateThreadDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ThreadsController.prototype, "updateThread", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ThreadsController.prototype, "deleteThread", null);
ThreadsController = tslib_1.__decorate([
    (0, common_1.Controller)('thread'),
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
const threads_repository_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.repository.ts");
let ThreadsModule = class ThreadsModule {
};
ThreadsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: thread_schema_1.Thread.name, schema: thread_schema_1.ThreadSchema }])],
        controllers: [threads_controller_1.ThreadsController],
        providers: [threads_service_1.ThreadsService, threads_repository_1.ThreadsRepository]
    })
], ThreadsModule);
exports.ThreadsModule = ThreadsModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/threads.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const thread_schema_1 = __webpack_require__("./apps/gessit-api/src/app/threads/thread.schema.ts");
let ThreadsRepository = class ThreadsRepository {
    constructor(threadModel) {
        this.threadModel = threadModel;
    }
    findOne(threadFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadModel.findOne(threadFilterQuery);
        });
    }
    find(threadFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadModel.find(threadFilterQuery);
        });
    }
    create(thread) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newThread = new this.threadModel(thread);
            return newThread.save();
        });
    }
    findOneAndUpdate(threadFilterQuery, thread) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadModel.findOneAndUpdate(threadFilterQuery, thread);
        });
    }
    findOneAndDelete(threadFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadModel.findOneAndDelete(threadFilterQuery);
        });
    }
};
ThreadsRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(thread_schema_1.Thread.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ThreadsRepository);
exports.ThreadsRepository = ThreadsRepository;


/***/ }),

/***/ "./apps/gessit-api/src/app/threads/threads.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const threads_repository_1 = __webpack_require__("./apps/gessit-api/src/app/threads/threads.repository.ts");
let ThreadsService = class ThreadsService {
    constructor(threadRepository) {
        this.threadRepository = threadRepository;
    }
    getThreadById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadRepository.findOne({ _id: id });
        });
    }
    getThreads() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadRepository.find({});
        });
    }
    createThread(communityId, title, content, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadRepository.create({
                _id: new mongoose_1.Types.ObjectId(),
                communityId,
                title,
                content,
                views: 0,
                likes: 0,
                dislikes: 0,
                creationDate: new Date(),
                image
            });
        });
    }
    updateThread(id, thread) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            thread._id = new mongoose_1.Types.ObjectId(thread._id);
            return this.threadRepository.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, thread);
        });
    }
    deleteThread(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.threadRepository.findOneAndDelete({ _id: id });
        });
    }
};
ThreadsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof threads_repository_1.ThreadsRepository !== "undefined" && threads_repository_1.ThreadsRepository) === "function" ? _a : Object])
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
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateThreadDto.prototype, "views", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateThreadDto.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateThreadDto.prototype, "dislikes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "image", void 0);
exports.UpdateThreadDto = UpdateThreadDto;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./apps/gessit-api/src/app/users/user.service.ts");
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [user_service_1.UsersService],
        exports: [user_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/gessit-api/src/app/users/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'maria',
                password: 'guess',
            },
        ];
    }
    findOne(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.username === username);
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
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