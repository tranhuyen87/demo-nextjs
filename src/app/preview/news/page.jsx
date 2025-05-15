'use client';

import DetailBody from '@/components/section/twoColumn/DetailBody';
import Breadcrumb from '@/components/common/Breadcrumb';
import TagArea from '@/components/common/TagArea';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import getNewsPreview from '@/fetch/getNewsPreview';

export default function Page() {
  return (
    <Suspense>
      <PreviewArticle />
    </Suspense>
  );
}

function PreviewArticle() {
  const preview_token = useSearchParams().get('preview_token');
  const [data, setData] = useState();
  const [paths, setPaths] = useState([{}]);
  const [params, setParams] = useState({});

  useEffect(() => {
    const articleInfo = async () => {
      try {
        const info = await getNewsPreview(preview_token);
        setData(info);
        setPaths([
          {
            href: `/news?topic=${info.contents_type_nm.toLowerCase()}`,
            label: info.contents_type_nm,
          },
          { label: '詳細' },
        ]);
        setParams({
          id: info.topics_id,
        });
      } catch (error) {
        console.error('Error fetching member information', error);
      }
    };

    articleInfo();
  }, [preview_token]);

  return (
    <div className='l-container'>
      <Breadcrumb paths={paths} />
      <div className='l-container--col-2 c-article'>
        <div className='l-container--col-2__main'>
          <div>
            {data && params && <DetailBody data={data} params={params} />}
          </div>
        </div>
        <div className='l-container--col-2__side'>
          <TagArea />
        </div>
      </div>
    </div>
  );
}
