import ChatHeader from "../_components/ChatHeader";
import MessageInput from "../_components/MessageInput";
import Messages from "../_components/Messages";

export default function page() {
    return( 
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <ChatHeader />
            <Messages/>
            <MessageInput />
        </div>
    )
};
