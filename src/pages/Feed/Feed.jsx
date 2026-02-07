import Header from "~/components/Header/Header";
import feedImg from "~/assets/Feed/feedImg.png";
export default function Feed() {
  return (
    <div>
      <Header
        img={feedImg}
        title="Feed de notícias"
        subtitle="Acompanhe as novidades e comunicados"
      />
    </div>
  );
}
