"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const database_2 = __importDefault(require("../utils/database"));
class BaseRepository extends database_2.default {
    constructor(table) {
        super();
        this.table = table;
        this.db = database_1.default;
    }
    findMany(query = {}, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.db(this.table).where(query);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.db(this.table)
                    .where(query).first();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [id] = yield this.db(this.table).insert(item);
                const data = yield this.findOne({ id });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createMany(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db(this.table).insert(items);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db(this.table).where({ id }).update(item);
                return yield this.findOne({ id });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateByUser(user, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db(this.table).where({ user }).update(item);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db(this.table).where(query).delete();
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = BaseRepository;
