import { IUser } from './../model/user.model';
import MessageRepository , {IMessage} from './../model/messages.model'
import { RoomMemberRepository, IRoomMember } from '../model/room-members';
import { UserRepository } from '../model/user.model';
import ReceiversRepository , {IReceiver} from "./../model/receivers.model"
import RoomRepository ,  { IRoom } from "../model/rooms.model"
import ConversationServices from './room.services';
import { setError } from '../utils/error-format';

export default class MessageServices {

    async oneTOoneMessage (message:string , sender:number , receiver:number)  {
        try {

            const users =  [sender , receiver]

            const roomRep:RoomRepository = new RoomRepository();

            let room = await roomRep.findOne({users , type: "private"})

            if(!room) {
                const srv = new ConversationServices().createConversation()

                room = await srv.createRoom(users)
            }

            const msgRep = new MessageRepository();

            const msg = await msgRep.create({sender , room:+room?.id! , message , type:"text"})

            const receiverRep = new ReceiversRepository()

            const receivers = room.users.filter((users:IUser) => users.id !== sender).map((user:IUser) => {
                return {receiver: user.id , message: msg.id}
            })

            await receiverRep.createMany(receivers)

            return msg

        } catch (error) {
            throw error
        }
    }
}

