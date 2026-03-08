/* eslint-disable react/jsx-no-undef */
"use client"

import { Button } from "@/components/ui/button"
import { File, ImageIcon, Plus } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { useRef } from "react"

export default function AttachmentPopover() {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    function openImagePicker() {
        imageInputRef.current?.click()
    }

    function openFilePicker() {
        fileInputRef.current?.click()
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        console.log("image:", file)
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        console.log("file:", file)
    }
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 w-12">
                        <Plus />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-44 flex flex-col gap-2">
                    <Button variant="ghost" className="flex justify-between" onClick={openImagePicker}>
                        <ImageIcon className="mr-2" size={16} />
                        Upload Image
                    </Button>
                    <Button variant="ghost" className="flex justify-between" onClick={openFilePicker}>
                        <File className="mr-2" size={16} />
                        Upload File
                    </Button>
                </PopoverContent>
            </Popover>
            <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={handleImageChange} />
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
        </>
    )
}