import ConversationsList from "../(dashboard)/chat/_components/ConversationsList";
import SidebarHeader from "../(dashboard)/chat/_components/SidebarHeader";
import { SidebarSearch } from "../(dashboard)/chat/_components/SidebarSearch";
import UserProfile from "../(dashboard)/chat/_components/UserProfile";
import Stories from "../(dashboard)/chat/_components/Stories";


export default function Sidebar() {
    return (
        <div className="w-80 border-r h-screen flex flex-col p-3 bg-[#E8F0FC] dark:bg-[#0f1626]">
            <SidebarHeader />
            <SidebarSearch />
            <UserProfile />
            <Stories/>
            <ConversationsList />
        </div>
    )
}