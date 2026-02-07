import Header from "~/components/Header/Header";
import accessManagementImg from "~/assets/AccessManagement/accessManagementImg.png"
export default function AccessManagement(){
    return (
        <div>
            <Header img={accessManagementImg} title="Gestão de acessos" subtitle="Monitore e gerencie os acessos ao sistema" />
        </div>
    )
}