import Header from "~/components/Header/Header";
import downloadsImg from "~/assets/Downloads/downloadsImg.png";
export default function Downloads() {
  return (
    <div>
      <Header
        img={downloadsImg}
        title={"Download de sistemas"}
        subtitle={"Baixe os sistemas disponíveis para sua instituição"}
      />
    </div>
  );
}
