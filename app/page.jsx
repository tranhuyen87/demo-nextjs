import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="contents">
      <main className="main">
        <div className="News-link">
          <Link href="/news/">News</Link>
        </div>
      </main>
    </div>
  );
}
