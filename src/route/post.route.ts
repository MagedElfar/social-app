import Controller, { APIRoute , Methods} from '../app/controller';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addPostHandler,
            localMiddleware:[],
            auth:true
        },
    ]
    return r;
}


export default routes