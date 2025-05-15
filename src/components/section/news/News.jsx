'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import Pager from '@/components/common/Pager';
import CardListNew from '@/components/ui/CardListNews';
import getContentList from '@/fetch/getContentList';
import getTagArea from '@/fetch/getTagArea';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contentDirectory } from '@/constants/config';

export default function News({ children }) {
  const searchParams = useSearchParams();

  const [params, setParams] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [list, setList] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (searchParams.get('topic')) {
      setContent('');
      setSearchKeyWord('');
      setTitle('ニュース');
    } else if (searchParams.get('search')) {
      setContent(contentDirectory.search);
      setSearchKeyWord(searchParams.get('search'));
    } else if (searchParams.get('tag_id')) {
      setContent(contentDirectory.search);
      fetchTagArea(
        searchParams.get('tag_category_id'),
        searchParams.get('tag_id'),
      );
    } else {
      setSearchKeyWord('');
      setContent(contentDirectory.news);
    }

    const params = Array.from(searchParams.entries()).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value }),
      {},
    );
    setParams(params);

    async function fetchTagArea(categoryid, id) {
      const data = await getTagArea(categoryid, id);
      setSearchKeyWord('#' + data?.[0]?.tag_nm);
    }

    async function fetchData() {
      const { list, pageInfo } = await getContentList(params);
      setList(list);
      setPageInfo(pageInfo);
      setCategoryTitle(list?.[0]?.contents_type_ext_col_01);
    }
    fetchData();
  }, [searchParams, title, content]);

  function renderListTitle() {
    if (searchKeyWord) {
      return `「${searchKeyWord}」の${content.title}`;
    } else if (content) {
      return `${content.title}`;
    } else {
      return `${categoryTitle} ${title}一覧`;
    }
  }

  const Wrapper = ({ children }) => (
    <section className='c-article__list'>
      <div className='c-heading__wrapper'>
        <h2 className='c-heading--lv2 u-display-flex-grow-1'>
          {renderListTitle()}
        </h2>
      </div>
      {children}
    </section>
  );

  return (
    <>
      <Breadcrumb
        paths={[{ label: content ? content.title : categoryTitle }]}
      />
      <PageTitle
        title={content ? content.title : categoryTitle}
        subTitle={content ? content.subtitle : list?.[0]?.contents_type_nm}
      />
      <div className='l-container--large l-container--contents'>
        <main>
          <Wrapper>
            <>
              {list === null && (
                <div className='c-spinner'>
                  <div className='c-spinner__circle'></div>
                </div>
              )}
              {list?.length === 0 && <p>記事がありません。</p>}
              {list?.length > 0 && (
                <>
                  <CardListNew data={list} />
                  {Object.keys(pageInfo).length > 0 && (
                    <Pager pageInfo={pageInfo} searchParams={params} />
                  )}
                </>
              )}
            </>
          </Wrapper>
        </main>
        {children}
      </div>
    </>
  );
}
