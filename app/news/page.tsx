// Dummy imports
import Link from 'next/link'
import Image from 'next/image'

async function getData() {  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/news/list`); 
  if (!res.ok) {  
    throw new Error('Failed to fetch news data');  
  }
  return res.json();  
}  

export default async function newsPage() {
  //const posts = await getPosts()
  const data = await getData(); 
  //console.log(data)
  return (
    <>
    <div className='news-contents'>
        <div className="main-img">
          <Image
              src="/images/main.jpg"
              alt="最新の岡山・香川のニュースをまとめました"
              width={500}
              height={500}
          />
        </div>
        <h2 className='main-ttl'><span>最新の岡山・香川のニュースをまとめました</span></h2>
        <div className='tobira-list'>
        {data.list.map((newsItem: any, index: number) => (  
          <div key={index} className="tobira-data">  
            <Link href={`/news/${newsItem.topics_id}`}>
              <div className="img-box">
              <Image
                src={newsItem.ext_1.url}
                alt={newsItem.ext_1.desc}
                width={200}
                height={200}
              />
              </div>
              <h3 className='tobira-data_ttl'>{newsItem.subject}</h3>  
            </Link>
            <div className="tobira-data_info">
            <p className="date">{newsItem.ymd}</p>
            <ul className="tag">
               
            </ul>
          </div>
          </div>  
        ))}
        </div>
    </div>
    </>
  )
}

