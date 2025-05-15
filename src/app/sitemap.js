import getAllContentList from '@/fetch/getAllContentList';

export default async function sitemap() {
  const items = await getAllContentList();
  const newsDetails = items.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/`,
    },
    ...newsDetails,
    ...featureDetails,
  ];
}
