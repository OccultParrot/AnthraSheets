export default function Body() {
    return (
        <>
            {Array(100).fill((<p>Test</p>)).map((i) => i)}
        </>
    )
}