import Controller from "../app/controller";
import AuthController from "../controllers/auth.controllers";
import Friends from "../controllers/friends.controllers";
import UserController from "../controllers/user.controllers";

const routes:Controller [] = [
    new AuthController(""),
    new UserController("/users"),
    new Friends("/friends")
]

export default routes