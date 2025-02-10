import MainPart from '../components/HomePage/MainPart'
import ManAndWoman from '../components/HomePage/Man&WomanPart'
import SubscribeSection from '@/components/HomePage/SignUp';
import { FactoryLooks } from '@/components/HomePage/FactoryLooks ';

export default function Home() {
  return (
    <>
      <MainPart />
      <ManAndWoman />
      <SubscribeSection />
      <FactoryLooks />
    </>
  );
}
