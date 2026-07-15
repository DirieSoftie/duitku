'use client'

import { useState } from "react"

export default function UploadPage() {
    const [content, setContent] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await fetch('/api/upload', { method: 'POST', body: formData})
        const data = await res.json()
        setContent(data.content)
    }

    return (
        <div>
            <h1>Hello World!</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
            {content && <pre>{content}</pre>}
        </div>
    )
}
