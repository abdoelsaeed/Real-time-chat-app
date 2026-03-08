import { SearchChat } from "./SearchChat";
import UserInfo from "./UserInfo";

export default function ChatHeader() {
    return(
        <div className="p-5 py-3.5 flex justify-between items-center bg-[#E8F0FC] dark:bg-[#0f1626] border-b "> 
            <UserInfo showOnline={true} />
            <SearchChat/>
        </div>
    )
};
