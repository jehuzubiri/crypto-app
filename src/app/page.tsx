import HomePage from "@/pages/Home";
import { getLatestCryptosSSR, getTrendingCryptosSSR } from "@/services/apis";

export default async function Page() {
  const cryptoList = await getLatestCryptosSSR();
  const cryptoTrending = await getTrendingCryptosSSR();

  return <HomePage cryptoList={cryptoList} cryptoTrending={cryptoTrending} />;
}
