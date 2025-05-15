import DetailBody from '@/components/section/twoColumn/DetailBody';
import getAllContentList from '@/fetch/getAllContentList';
import getDetailsNews from '@/fetch/getDetailsNews';
import Breadcrumb from '@/components/common/Breadcrumb';
import TagArea from '@/components/common/TagArea';

export async function generateMetadata({ params }) {
  const item = await getDetailsNews(params.id);
  return {
    title: item.subject,
    description: item.introduction,
    openGraph: {
      images: [
        {
          url: item.image.url,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const items = await getAllContentList();
  const paramID = items.map((item) => ({
    id: item.topics_id.toString(),
  }));
  return paramID;
}

export default async function Page({ params }) {
  const item = await getDetailsNews(params.id);
  //console.log(item);
  const paths = [
    {
      href: `/news/`,
      label: 'ニュース',
    },
    { label: '詳細' },
  ];

  return (
    <div className='l-container'>
      <div className='u-bg-white'>
        <Breadcrumb paths={paths} />
        <div className='l-container--large c-article'>
          <main>
            <DetailBody data={item} params={params} />
          </main>
        </div>
      </div>
      <div className='l-container--large'>
        <TagArea />
      </div>
    </div>
  );
}
