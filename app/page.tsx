import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="contents">
      <main className="main">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="News-link">
        <Link
          href={{
            pathname: '/news',
            //query: { name: 'test' },
          }}
        >
          News
        </Link>
        </div>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
