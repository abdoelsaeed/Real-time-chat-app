import { ThemeToggle } from "@/app/_components/ThemeToggle";
import UserInfo from "./UserInfo";

export default function UserProfile() {
    return(
        <div className=" mb-3 border-b border-t  py-3">
            <div className="flex justify-between items-center">
                <UserInfo showOnline={true}/>
                <ThemeToggle/>
            </div>
        </div>
    )
};
