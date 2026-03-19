import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "~/styles/commonGrid.css";
import Modal from "~/components/Modal/Modal";
import { useConfirm } from "~/components/ConfirmationDialog/UseConfirm";
import styles from "./profileManagement.module.css";
import { useMediaQuery } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { use, useMemo, useCallback, useState, useEffect } from "react";
import Tooltip from "~/components/Tooltip/Tooltip";
import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";
import { useToast } from "~/providers/Toast/useToast";
import profileAccessImg from "~/assets/ProfileManagement/ProfileAccessImg.png";
import {
  getAccessPermissions,
  getAccessProfiles,
} from "~/services/ProfileManagement/profileAccessService.api";
import Header from "~/components/Header/Header";
import { getProfileStatus } from "~/services/ProfileManagement/profileAccessService.api";
import MobileGridFooter from "~/components/MobileGridFooter/MobileGridFooter";
const permissionsPromise = getAccessPermissions();
const profilesPromise = getAccessProfiles();
const profileStatusPromise = getProfileStatus();

export default function ProfileManagement() {
  const [status, setStatus] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [profileId, setProfileId] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileStatus, setProfileStatus] = useState(1);
  const [profilePermissions, setProfilePermissions] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { showLoading, hideLoading } = useGlobalLoading();
  const { confirm, ConfirmDialog } = useConfirm();
  const toast = useToast();
  const MAX_NAME_LENGTH = 60;
  const MAX_DESCRIPTION_LENGTH = 200;
  const permissions = use(permissionsPromise);
  const rows = use(profilesPromise);
  const profileFilterStatus = use(profileStatusPromise);

  const filteredRows = useMemo(() => {
    const s = String(search || "")
      .toLowerCase()
      .trim();
    return (rows || []).filter((row) => {
      if (s) {
        const name = String(row?.name || "").toLowerCase();
        if (!name.includes(s)) return false;
      }
      if (status !== 0) {
        if (status != row?.profileStatusId) return false;
      }

      return true;
    });
  }, [rows, search, status]);

  const totalRows = filteredRows.length;
  const lastPage = Math.max(
    0,
    Math.ceil(totalRows / paginationModel.pageSize) - 1,
  );
  const safePage = Math.min(paginationModel.page, lastPage);
  const showingText =
    totalRows === 0
      ? "0 de 0"
      : `${safePage * paginationModel.pageSize + 1}-${Math.min((safePage + 1) * paginationModel.pageSize, totalRows)} de ${totalRows}`;

  const isMobile = useMediaQuery("(max-width:700px)");
  const desktopColumns = useMemo(
    () => [
      {
        field: "actions",
        headerName: "Ações",
        minWidth: 80,
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Perfil",
        flex: 1,
        minWidth: isMobile ? 100 : 120,
        renderCell: (params) => {
          const text = String(params.value ?? "");
          const disabled = !text.trim();

          return (
            <Tooltip content={text} placement="top" disabled={disabled}>
              <span>{text}</span>
            </Tooltip>
          );
        },
      },
      {
        field: "description",
        headerName: "Descrição",
        flex: 1,
        minWidth: 220,
        renderCell: (params) => {
          const text = String(params.value ?? "");
          const disabled = !text.trim();

          return (
            <Tooltip content={text} placement="top" disabled={disabled}>
              <span>{text}</span>
            </Tooltip>
          );
        },
      },
      {
        field: "permissions",
        headerName: "Permissões ativas",
        minWidth: 160,
        renderCell: (params) => {
          const qtd = params.value?.length ?? 0;
          const text = `${qtd} ${qtd === 1 ? "permissão" : "permissões"}`;
          return (
            <Tooltip content={text} placement="top" disabled={false}>
              <span>{text}</span>
            </Tooltip>
          );
        },
      },
      {
        field: "creationDate",
        headerName: "Data de criação",
        minWidth: 150,
        renderCell: (params) => {
          const text = String(params.value ?? "");
          const disabled = !text.trim();
          return (
            <Tooltip content={text} placement="top" disabled={disabled}>
              <span>{text}</span>
            </Tooltip>
          );
        },
      },
      {
        field: "profileStatusId",
        headerName: "Status",
        flex: 1,
        minWidth: 80,
        maxWidth: 160,
        renderCell: (params) => {
          const id = Number(params.value);
          const st = profileFilterStatus.find((x) => x.id === id);

          const text = st?.name ?? "-";
          const color = st?.color ?? "#999";

          return (
            <Tooltip content={text} placement="top" disabled={false}>
              <span
                className={styles["status-btn"]}
                style={{ backgroundColor: color }}
              >
                {text}
              </span>
            </Tooltip>
          );
        },
      },
    ],
    [isMobile, profileFilterStatus],
  );

  const mobileColumns = useMemo(
    () => [
      desktopColumns.find((col) => col.field === "actions"),
      desktopColumns.find((col) => col.field === "name"),
      desktopColumns.find((col) => col.field === "profileStatusId"),
    ],
    [desktopColumns],
  );

  const onOpenNew = () => {
    setProfileId(0);
    setProfileName("");
    setProfileDescription("");
    setProfileStatus(1);
    setProfilePermissions([]);
    setOpenModal(true);
  };

  const onOpenEdit = useCallback((row) => {
    setProfileId(row.id);
    setProfileName(row.name || "");
    setProfileDescription(row.description || "");
    setProfileStatus(row?.profileStatusId);
    setProfilePermissions(row.permissions || []);
    setOpenModal(true);
  }, []);

  const confirmDelete = useCallback(
    async (row) => {
      try {
        const ok = await confirm({
          title: "Excluir",
          message: `Tem certeza que deseja excluir o perfil "${row.name}"?`,
        });
        if (!ok) return;

        showLoading("Excluindo perfil");
        setTimeout(function () {
          hideLoading();
          toast.success("Sucesso", "Perfil excluído com sucesso!");
        }, 400);
      } catch (error) {
        toast.error("Erro", error);
      }
    },
    [confirm, toast, showLoading, hideLoading],
  );

  const togglePermission = (permission) => {
    setProfilePermissions((prev) =>
      prev.includes(permission.id)
        ? prev.filter((p) => p !== permission.id)
        : [...prev, permission.id],
    );
  };

  const onSubmitModal = async (e) => {
    e.preventDefault();

    const name = (profileName || "").trim();
    const description = (profileDescription || "").trim();

    if (!name) {
      toast.error("Erro", "O campo Nome é obrigatório.");
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      toast.error(
        "Erro",
        `O campo Nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.`,
      );
      return;
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error(
        "Erro",
        `O campo Descrição deve ter no máximo ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
      return;
    }
    if (!profilePermissions || profilePermissions.length === 0) {
      toast.error("Erro", "Selecione ao menos uma permissão para o perfil.");
      return;
    }

    var mensagem =
      profileId == 0
        ? "Criando perfil de acesso"
        : "Atualizando perfil de acesso";
    var mensagemSucesso =
      profileId == 0
        ? "Perfil de acesso criado com sucesso!"
        : "Perfil de acesso atualizado com sucesso!";
    showLoading(mensagem);
    setOpenModal(false);
    setTimeout(function () {
      hideLoading();
      toast.success("Sucesso", mensagemSucesso);
    }, 1000);
  };
  const columns = useMemo(() => {
    const base = isMobile ? mobileColumns : desktopColumns;

    return base.map((col) =>
      col.field !== "actions"
        ? col
        : {
            ...col,
            renderCell: (params) => (
              <div className={"grid-actions"}>
                <Tooltip content="Editar" placement="right" disabled={false}>
                  <button onClick={() => onOpenEdit(params.row)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </Tooltip>
                <Tooltip content="Remover" placement="right" disabled={false}>
                  <button
                    className={styles.danger}
                    onClick={() => confirmDelete(params.row)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </Tooltip>
              </div>
            ),
          },
    );
  }, [isMobile, mobileColumns, desktopColumns, onOpenEdit, confirmDelete]);
  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  return (
    <div>
      <Header
        img={profileAccessImg}
        title="Perfis de Acesso"
        subtitle="Gerencie os perfis e permissões de acesso do sistema"
      />
      <div className="grid-wrapper">
        <div className="grid-header-wrapper">
          <input
            type="text"
            className={styles["access-search"]}
            placeholder="Buscar perfil..."
            name="access-search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPaginationModel((prev) => ({ ...prev, page: 0 }));
            }}
          />
          {!isMobile && (
            <Select
              className={styles["select-user-state-list"]}
              size="small"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPaginationModel((prev) => ({ ...prev, page: 0 }));
              }}
            >
              <MenuItem value={0}>Todos os status</MenuItem>
              {profileFilterStatus.map((status) => {
                return (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          {!isMobile && (
            <button className={styles["btn-new-profile"]} onClick={onOpenNew}>
              Novo perfil
            </button>
          )}
        </div>
        <DataGrid
          className={filteredRows.length <= paginationModel.pageSize ? "grid-fit-content" : "grid-with-min-height"}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={filteredRows}
          columns={columns}
          rowSelection={false}
          disableRowSelectionOnClick
          disableColumnMenu
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{
            page: safePage,
            pageSize: paginationModel.pageSize,
          }}
          onPaginationModelChange={setPaginationModel}
          slots={isMobile ? { footer: MobileGridFooter } : undefined}
          slotProps={
            isMobile
              ? {
                  footer: {
                    paginationModel: {
                      page: safePage,
                      pageSize: paginationModel.pageSize,
                    },
                    setPaginationModel,
                    safePage,
                    lastPage,
                    showingText,
                  },
                }
              : undefined
          }
        />
      </div>
      {isMobile && (
        <div className={styles["wrapper-btn-new-profile-mobile"]}>
          <button
            className={styles["btn-new-profile-mobile"]}
            onClick={onOpenNew}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
      <Modal
        open={openModal}
        title={
          profileId === 0 ? "Novo perfil de acesso" : "Editar perfil de acesso"
        }
        onClose={() => setOpenModal(false)}
        modalClassName={styles["modal-md"]}
        footer={(close) => (
          <>
            <div className={styles["modal-actions"]}>
              <button
                type="submit"
                form="profile-form"
                className={styles["btn-submit-profile"]}
              >
                Salvar
              </button>
              <button
                type="button"
                className={styles["btn-cancel"]}
                onClick={close}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      >
        {() => (
          <form
            className={styles["modal-form"]}
            id="profile-form"
            onSubmit={onSubmitModal}
          >
            <div className={styles.field}>
              <label>Nome *</label>
              <input
                type="text"
                maxLength={MAX_NAME_LENGTH}
                placeholder="Nome do Perfil"
                value={profileName}
                required
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Descrição</label>
              <input
                type="text"
                maxLength={MAX_DESCRIPTION_LENGTH}
                placeholder="Descrição do Perfil"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <div className={styles["switch-row"]}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={profileStatus == 1}
                    onChange={(e) => setProfileStatus(e.target.checked ? 1 : 2)}
                  />
                  <span className={styles.slider} />
                </label>
                <span className={styles["switch-label"]}>Ativo</span>
              </div>

              <div className={styles["permissions-box"]}>
                {permissions.map((permission) => (
                  <label key={permission.id} className={styles["perm-item"]}>
                    <input
                      type="checkbox"
                      checked={profilePermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission)}
                    />
                    {permission.name}
                  </label>
                ))}
              </div>
            </div>
          </form>
        )}
      </Modal>
      {ConfirmDialog}
    </div>
  );
}