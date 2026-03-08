"use client"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

import AttachmentPopover from "./AttachmentPopover"
import { useState } from "react"

export default function MessageInput() {
    const [message, setMessage] = useState<string>('')
    function handleSubmit(){
        setMessage('')
    }
    return (
        <div className="p-5">
            <Field>
                <ButtonGroup className="rounded-2xl">
                    <AttachmentPopover />
                    <Input
                        placeholder="Type a message..."
                        className="h-12 flex-1 focus:outline-none focus:ring-0 focus-visible:ring-0"
                        value={message??""}
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                    <Button variant="outline" className="h-12 w-12 cursor-pointer" onClick={() => handleSubmit()}>
                        <Send />
                    </Button>
                </ButtonGroup>
            </Field>
        </div>
    )
}
