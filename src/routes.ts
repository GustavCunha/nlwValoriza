import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

const authenticateUserController = new AuthenticateUserController();

const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

// -=-=- Rotas para as Tags -=-=-
router.post(
    "/tags",
    ensureAuthenticated, 
    ensureAdmin, 
    createTagController.handle
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

// -=-=- Rotas para os Usuários -=-=-
router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

// -=-=- Rotas para os Elogios -=-=-
router.post(
    "/compliments", 
    ensureAuthenticated,
    createComplimentController.handle
);

export { router };