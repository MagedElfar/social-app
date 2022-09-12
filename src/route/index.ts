import Controller from "../app/controller";
import AuthController from "../controllers/auth.controllers";
import Friends from "../controllers/friends.controllers";
import LikesController from "../controllers/likes.controllers";
import PostImagesController from "../controllers/post-images.controllers";
import UserController from "../controllers/user.controllers";
import PostController from "./../controllers/post.controllers"

const routes:Controller [] = [
    new AuthController(""),
    new UserController("/users"),
    new Friends("/friends"),
    new PostController("/posts"),
    new LikesController("/likes"),
    new PostImagesController("/images")
]

export default routes