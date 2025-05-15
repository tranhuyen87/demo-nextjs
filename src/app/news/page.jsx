import { Suspense } from 'react';
import Banner from '@/components/common/Banner';
import TagArea from '@/components/common/TagArea';
import News from '@/components/section/news/News';
import { METADATA } from '@/constants/config';

export const metadata = {
  title: METADATA.NEWS,
};

export default function Page() {
  return (
    <main className='l-container'>
      <Suspense>
        <News />
        <div className='l-container--large'>
          <TagArea />
        </div>
      </Suspense>
    </main>
  );
}
