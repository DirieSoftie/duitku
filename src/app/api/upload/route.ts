export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const text = await file.text()
    return Response.json({
        content: text
    })
}