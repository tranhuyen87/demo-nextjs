export default async function getDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${id}`,
    {
      credentials: 'include',
    },
  );
  const data = await res.json();
  //console.log(data);
  return data.details;
}
