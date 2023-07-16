export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="mockup-code">
                <pre><code>Profile</code></pre>
                <span className="ml-4 mt-4 p-2 rounded bg-gray-900">{params.id}</span>
            </div>
        </div>
    )
}