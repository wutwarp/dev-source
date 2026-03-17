import Categories from '@/components/Categories';
import ImageSlider from "@/components/ImageSlider";
import ScrollingLogos from '@/components/ScrollingLogos';

export default function Home() {
  return (
    <div>
      <ImageSlider />
      <Categories />
      <ScrollingLogos />
    </div>
  );
}
