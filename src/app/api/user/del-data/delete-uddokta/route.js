
export const POST = async (request) => {
    try {
        const { uddoktaId } = await request.json();
        
        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}
