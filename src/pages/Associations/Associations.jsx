// import styles from "./associations.module.css";
import associationImg from "~/assets/Associations/associationImg.png";
import Header from "../../components/Header/Header";
export default function Associations() {
  return (
    <div>
      <Header
        img={associationImg}
        title="Associação"
        subtitle="Associe usuários a perfis, laboratórios e sistemas"
      />
    </div>
  );
}
