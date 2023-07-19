import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="mockup-code">
        <pre><code><Link href="/profile" className='text-lime-500'>Your Profile</Link></code></pre>
      </div>
    </div>


  )
}
