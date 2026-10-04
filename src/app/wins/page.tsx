import fs from 'fs';
import path from 'path';
import rawWinsData from '@/data/wins';
import WinsClient from './WinsClient';

export default async function WinsPage() {
  const winsData = rawWinsData.map(win => {
    const dir = path.join(process.cwd(), 'public', 'photos', win.id);
    let images: string[] = [];
    if (fs.existsSync(dir)) {
      images = fs.readdirSync(dir)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        .map(f => `/photos/${win.id}/${f}`);
    }
    return { ...win, images };
  });

  return <WinsClient winsData={winsData} />;
}