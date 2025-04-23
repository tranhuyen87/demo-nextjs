import Link from 'next/link'
import Image from 'next/image'

export async function generateStaticParams() {
  const newsList = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news/list').then((res) => res.json())
  return newsList.list.map((newsId: any) => ({
      slug: `${newsId.topics_id}`,
  }))
}

async function getData(slug) {
  //console.log(slug)
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/rcms-api/1/news/details/${slug}`);
  return res.json()
}

export default async function Page(props) {
  const data = await getData(props.params.slug)
  console.log(data)
  return (
    <>
      <div className='news-contents'>
        <div className="detail-mainv">
          <Image
            src={data.details.ext_1.url}
            alt={data.details.ext_1.desc}
            width={200}
            height={200}
          />
        </div>
        <p className="date">{data.details.ymd}</p>
        <h1 className='detail_ttl'>{data.details.subject}</h1>
        <div className="details" dangerouslySetInnerHTML={{ __html: data.details.contents }}>
        </div>
      </div>
    </>
      
  );
}