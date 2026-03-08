import ConversationItem from "./ConversationItem";

export default function ConversationsList() {
    return (
<div className="mt-3 flex-1 min-h-0 overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">            
    <p className="font-sans text-xl text-offline mb-2">Chats</p>
            <ConversationItem/>
            <ConversationItem/>
            <ConversationItem />            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
        </div>
    )
};
