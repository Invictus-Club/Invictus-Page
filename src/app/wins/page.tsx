import { getWins } from '@/lib/wins-service';
import WinsClient from './WinsClient';

export default async function WinsPage() {
  const winsData = await getWins();
  return <WinsClient winsData={winsData} />;
}