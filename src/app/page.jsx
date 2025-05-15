import TagArea from '@/components/common/TagArea';
import Hero from '@/components/section/top/Hero';
import Ranking from '@/components/common/Ranking';
import CardListNews from '@/components/ui/CardListNews';
import getContentList from '@/fetch/getContentNews';
import Link from 'next/link';

export default async function Page() {
  const { list } = await getContentList();

  return (
    <div className='l-container is-top'>
      <Hero />
      <main>
        <section className='l-container--large l-container--contents'>
          <div className='u-display-flex u-display-flex-align-items-center u-mb-40'>
            <div className='u-display-flex-grow-1'>
              <h2 className='c-heading--lv1'>NEWS HEADLINE</h2>
              <p className='c-heading--sub'>岡山・香川のニュース</p>
            </div>
            <div className='u-display-flex-shrink-0'>
              <Link href='/news/' className='c-button'>
                View All
              </Link>
            </div>
          </div>
          <CardListNews data={list} />
        </section>
        <Ranking />
      </main>
      <div className='l-container--large'>
        <TagArea />
      </div>
    </div>
  );
}
