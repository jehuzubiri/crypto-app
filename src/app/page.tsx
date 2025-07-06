import HomePage from "@/pages/Home";
// import { getSSRLatestCryptos } from "@/services/apis";

export default async function Page() {
  console.log("Page component is being rendered");

  // const crptoList = await getSSRLatestCryptos();

  // return <HomePage crptoList={crptoList} />;
  return (
    <HomePage
      crptoList={{
        ok: true,
        data: [],
      }}
    />
  );
}
