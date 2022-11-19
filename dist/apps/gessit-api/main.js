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
const app_service_1 = __webpack_require__("./apps/gessit-api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/gessit-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const app_controller_1 = __webpack_require__("./apps/gessit-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/gessit-api/src/app/app.service.ts");
const communities_module_1 = __webpack_require__("./apps/gessit-api/src/app/communities/communities.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/gessit'), communities_module_1.CommunitiesModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
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

/***/ "./apps/gessit-api/src/app/communities/communities.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const common_1 = __webpack_require__("@nestjs/common");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/schemas/community.schema.ts");
const communities_controller_1 = __webpack_require__("./apps/gessit-api/src/app/communities/controllers/communities.controller.ts");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/services/communities.service.ts");
const communities_repository_1 = __webpack_require__("./apps/gessit-api/src/app/communities/repositories/communities.repository.ts");
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

/***/ "./apps/gessit-api/src/app/communities/controllers/communities.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const communities_service_1 = __webpack_require__("./apps/gessit-api/src/app/communities/services/communities.service.ts");
const create_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/dto/create-community.dto.ts");
const update_community_dto_1 = __webpack_require__("./apps/gessit-api/src/app/communities/dto/update-community.dto.ts");
const object_id_pipe_1 = __webpack_require__("./apps/gessit-api/src/app/communities/pipes/object.id.pipe.ts");
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
            return yield this.communityService.getCommunityById(id);
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
            return yield this.communityService.deleteCommunity(id);
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
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
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
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof update_community_dto_1.UpdateCommunityDto !== "undefined" && update_community_dto_1.UpdateCommunityDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommunitiesController.prototype, "updateCommunity", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', object_id_pipe_1.ObjectIdPipe)),
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

/***/ "./apps/gessit-api/src/app/communities/dto/create-community.dto.ts":
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

/***/ "./apps/gessit-api/src/app/communities/dto/update-community.dto.ts":
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

/***/ "./apps/gessit-api/src/app/communities/pipes/object.id.pipe.ts":
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
}
exports.ObjectIdPipe = ObjectIdPipe;


/***/ }),

/***/ "./apps/gessit-api/src/app/communities/repositories/communities.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const community_schema_1 = __webpack_require__("./apps/gessit-api/src/app/communities/schemas/community.schema.ts");
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
            return this.communityModel.findOneAndUpdate(communityFilterQuery, community, { new: true });
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

/***/ "./apps/gessit-api/src/app/communities/schemas/community.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitySchema = exports.Community = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Community = class Community {
};
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
    tslib_1.__metadata("design:type", typeof (_a = typeof Number !== "undefined" && Number) === "function" ? _a : Object)
], Community.prototype, "ranking", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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

/***/ "./apps/gessit-api/src/app/communities/services/communities.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const communities_repository_1 = __webpack_require__("./apps/gessit-api/src/app/communities/repositories/communities.repository.ts");
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
            return this.communityRepository.findOneAndUpdate({ _id: id }, community);
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

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

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
        app.useGlobalFilters(new validation_filter_1.ValidationFilter);
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe({
            skipMissingProperties: true,
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