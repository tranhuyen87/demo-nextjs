import Image from "next/image";
import Link from 'next/link'
export default function Header() {
  return(
    <>
    <header className="header">
      <div className="logo">
      <Link href="/">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </Link>        
      </div>
    </header>
    </>
  )
}