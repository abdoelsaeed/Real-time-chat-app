import { redirect } from "next/navigation";
import { serverFetch } from "../server/fetchWithAuth";

export async function getCurrentUser() {
    try{

        const res = await serverFetch(`${process.env.BACKEND_URL}/auth/me`, {
            method: "GET",
            cache: "no-store",
        });
        
        if (!res.ok) return null;
        
        return res.json();
    }catch(error){
        redirect('/auth/login')
    }
}