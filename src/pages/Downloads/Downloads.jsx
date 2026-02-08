import { useEffect, useMemo, useState } from "react";
import { MenuItem, Select, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Header from "~/components/Header/Header";
import downloadsImg from "~/assets/Downloads/downloadsImg.png";
import styles from "./downloads.module.css";

import {
  getSystems,
  getSystemCategories,
} from "~/services/Systems/systemsService.api";
import DownloadCard from "~/components/DownloadCard/DownloadCard";

export default function Downloads() {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [systems, setSystems] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [systemCategories, setSystemCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [orderBy, setOrderBy] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const page = 1;
  useEffect(() => {
    async function load() {
      const data = await getSystems();
      setSystems(Array.isArray(data) ? data : []);
    }
    load();

    async function loadSystemCategories() {
      const data = await getSystemCategories();
      setSystemCategories(Array.isArray(data) ? data : []);
    }
    loadSystemCategories();
  }, []);

  function parseSizeToBytes(size) {
    if (!size) return Number.POSITIVE_INFINITY;

    const s = String(size).trim().toLowerCase();

    const match = s.match(/([\d.,]+)\s*(b|kb|mb|gb|tb)?/i);
    if (!match) return Number.POSITIVE_INFINITY;

    const raw = match[1].replace(",", ".");
    const value = Number(raw);
    if (!Number.isFinite(value)) return Number.POSITIVE_INFINITY;

    const unit = (match[2] || "b").toLowerCase();
    const multipliers = {
      b: 1,
      kb: 1024,
      mb: 1024 ** 2,
      gb: 1024 ** 3,
      tb: 1024 ** 4,
    };

    return value * (multipliers[unit] ?? 1);
  }
  const filteredSystems = useMemo(() => {
    const term = (searchFilter || "").trim().toLowerCase();

    const matchSearch = (sys) =>
      !term || (sys.name || "").toLowerCase().includes(term);

    const matchCategory = (sys) =>
      categoryFilter === 0 ? true : sys.categoryId === categoryFilter;

    return (systems || []).filter(
      (sys) => matchSearch(sys) && matchCategory(sys),
    );
  }, [systems, searchFilter, categoryFilter]);

  const orderedSystems = useMemo(() => {
    const data = [...filteredSystems];

  switch (orderBy) {
      case 1: // nome
        return data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case 2: // tamanho
        return data.sort(
          (a, b) => parseSizeToBytes(a.size) - parseSizeToBytes(b.size),
        );
      default:
        return data;
    }
  }, [filteredSystems, orderBy]);

  const totalItems = orderedSystems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedSystems = orderedSystems.slice(startIndex, startIndex + pageSize);
  const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pagedSystems.length, totalItems);
  const showingText = `Mostrando ${showingFrom} a ${showingTo} de ${totalItems} sistemas`;

  return (
    <div>
      <Header
        img={downloadsImg}
        title={"Download de sistemas"}
        subtitle={"Baixe os sistemas disponíveis para sua instituição"}
      />

      <div className={styles["sys-card-wrapper"]}>
        <div className={styles["cards-header-wrapper"]}>
          <div className={styles["search-with-icon"]}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles["search-icon"]}
            />
            <input
              type="text"
              className={styles["systems-search"]}
              placeholder="Buscar sistemas..."
              name="systems-search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          {!isMobile && (
            <Select
              className={styles["select-filter"]}
              size="small"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value={0}>Todas as categorias</MenuItem>
              {systemCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          )}

          {!isMobile && (
            <Select
              className={styles["select-filter"]}
              size="small"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <MenuItem value="" disabled>
                Ordenar por
              </MenuItem>
              <MenuItem value={1}>Nome</MenuItem>
              <MenuItem value={2}>Tamanho (menor para maior)</MenuItem>
            </Select>
          )}
        </div>

        <div className={styles["cards-container"]}>
          {pagedSystems.map((sys) => (
            <DownloadCard key={sys.id} sys={sys} />
          ))}
        </div>

        {pagedSystems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <h3>Nenhum sistema encontrado</h3>
            <p>
              Não encontramos sistemas disponíveis
              {searchFilter ? " para esse filtro" : ""}.
            </p>
          </div>
        ) : null}
        <div className={styles["pagination-wrapper"]}>
          <div className={styles["pagination-left"]}>
            Itens por página:
            <Select
              size="small"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </div>

          {showingText && (
            <span className={styles["pagination-text"]}>{showingText}</span>
          )}
        </div>
      </div>
    </div>
  );
}
