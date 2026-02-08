import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Header from "~/components/Header/Header";
import associationImg from "~/assets/Associations/associationImg.png";
import styles from "./associations.module.css";

import { getUsers } from "~/services/Users/usersService.api";
import { getAccessProfiles } from "~/services/ProfileManagement/profileAccessService.api";
import { getSystems } from "~/services/Systems/systemsService.api";
import { useConfirm } from "~/components/ConfirmationDialog/UseConfirm";

export default function Associations() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [systems, setSystems] = useState([]);

  const [userSearch, setUserSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedLaboratory, setSelectedLaboratory] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const { confirm, ConfirmDialog } = useConfirm();
  const canConfirm =
    !!selectedUser &&
    !!selectedProfile &&
    !!selectedLaboratory &&
    !!selectedSystem;

  useEffect(() => {
    async function load() {
      setUsers(await getUsers());
      setProfiles(await getAccessProfiles());
      setSystems(await getSystems());
    }
    load();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = userSearch.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term),
    );
  }, [users, userSearch]);

  const onConfirmAssociation = async () => {
    const ok = await confirm({
      title: "Atenção",
      message: `Tem certeza que deseja associar esse usuário às permissões escolhidas?`,
    });
    if (!ok) return;
    console.log({
      user: selectedUser,
      profile: selectedProfile,
      laboratory: selectedLaboratory,
      system: selectedSystem,
    });
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedProfile(null);
    setSelectedLaboratory(null);
    setSelectedSystem(null);
  };

  return (
    <div>
      <Header
        img={associationImg}
        title="Associação"
        subtitle="Associe usuários a perfis, laboratórios e sistemas"
      />

      <div className={styles["association-wrapper"]}>
        <div className={styles["association-row"]}>
          <div className={styles["association-card"]}>
            <h3>Usuários</h3>

            <div className={styles["search-with-icon"]}>
              <FontAwesomeIcon icon={faSearch} />
              <input
                placeholder="Buscar usuário"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>

            <div className={styles["scrollable-container"]}>
              {filteredUsers.length == 0 ? (
                <div className={styles["empty-state"]}>
                  <h3>Nenhum usuário encontrado</h3>
                  <p>
                    Ainda não há usuários cadastrados
                    {userSearch ? " para esse filtro" : ""}.
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`${styles["list-item"]} ${
                      selectedUser?.id === user.id ? styles["active"] : ""
                    }`}
                    onClick={() => onSelectUser(user)}
                  >
                    <span className={styles["title"]}>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles["association-card"]}>
            <h3>Associações</h3>

            {!selectedUser ? (
              <p className={styles["empty-text"]}>
                Selecione um usuário para visualizar associações
              </p>
            ) : (
              <>
                <div className={styles["selected-user"]}>
                  <span className={styles["title"]}>Usuário Selecionado</span>
                  <span>{selectedUser.name}</span>
                </div>

                <div className={styles["association-info"]}>
                  <span className={styles["title"]}>Perfil Atual</span>
                  <span>
                    {selectedProfile?.name || "Nenhum perfil selecionado"}
                  </span>

                  <span className={styles["title"]}>Laboratórios</span>
                  <span>
                    {selectedLaboratory?.name ||
                      "Nenhum laboratório selecionado"}
                  </span>

                  <span className={styles["title"]}>Sistemas</span>
                  <span>
                    {selectedSystem?.name || "Nenhum sistema selecionado"}
                  </span>
                </div>

                <button
                  className={styles["btn-confirm"]}
                  onClick={onConfirmAssociation}
                  disabled={!canConfirm}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                  Confirmar associação
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles["association-row"]}>
          <div className={styles["association-card"]}>
            <h3>Perfis</h3>
            <ul className={styles["selectable-list"]}>
              {profiles.map((p) => (
                <li
                  key={p.id}
                  className={
                    selectedProfile?.id === p.id ? styles["active"] : ""
                  }
                  onClick={() => setSelectedProfile(p)}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles["association-card"]}>
            <h3>Laboratórios</h3>

            {!selectedUser ? (
              <p className={styles["empty-text"]}>
                Nenhum laboratório existente, selecione um usuário para começar a selecionar
              </p>
            ) : selectedUser.laboratories?.length === 0 ? (
              <p className={styles["empty-text"]}>
                Nenhum laboratório existente para o usuário selecionado
              </p>
            ) : (
              <ul className={styles["selectable-list"]}>
                {selectedUser.laboratories.map((lab) => (
                  <li
                    key={lab.id}
                    className={
                      selectedLaboratory?.id === lab.id ? styles["active"] : ""
                    }
                    onClick={() => setSelectedLaboratory(lab)}
                  >
                    {lab.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles["association-card"]}>
            <h3>Sistemas</h3>
            <ul className={styles["selectable-list"]}>
              {systems.map((sys) => (
                <li
                  key={sys.id}
                  className={
                    selectedSystem?.id === sys.id ? styles["active"] : ""
                  }
                  onClick={() => setSelectedSystem(sys)}
                >
                  {sys.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {ConfirmDialog}
    </div>
  );
}
