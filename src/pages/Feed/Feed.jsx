import Header from "~/components/Header/Header";
import feedImg from "~/assets/Feed/feedImg.png";
import styles from "./feed.module.css";
import FeedPost from "~/components/FeedPost/FeedPost";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getFeed,
  getFeedCategories,
  extractShareGuidFromSearch,
  getSharedPostByGuid,
} from "~/services/Feed/feedService.api";
import { getLaboratories } from "~/services/Laboratories/laboratoriesService.api";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";
import { useToast } from "~/providers/Toast/useToast";
export default function Feed() {
  const isTablet = useMediaQuery("(max-width:1024px)");
  const { search } = useLocation();
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sharedPost, setSharedPost] = useState(null);

  const [selectedLabId, setSelectedLabId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { showLoading, hideLoading } = useGlobalLoading();
  const notifiedRef = useRef(false);
  const scrolledToSharedRef = useRef(false);

  useEffect(() => {
    async function loadData() {
      const shareGuid = extractShareGuidFromSearch(search);

      showLoading("Carregando notícias");
      try {
        const [feedData, labsData, categoriesData, sharedData] =
          await Promise.all([
            getFeed(),
            getLaboratories(),
            getFeedCategories(),
            shareGuid ? getSharedPostByGuid(shareGuid) : Promise.resolve(null),
          ]);
        setPosts(feedData ?? []);
        setLabs(labsData ?? []);
        setCategories(categoriesData ?? []);
        setSharedPost(sharedData?.post ?? null);

        if (shareGuid && sharedData && !notifiedRef.current) {
          notifiedRef.current = true;
          toast.success(
            "Sucesso",
            `Você acessou um post compartilhado!
            Confira o primeiro post em destaque.`,
          );
        }
      } finally {
        hideLoading();
      }
    }
    loadData();
  }, [search, showLoading, hideLoading, toast]);

  useEffect(() => {
    const shareGuid = extractShareGuidFromSearch(search);

    if (!shareGuid) return;
    if (!sharedPost?.isSharedPost) return;
    if (scrolledToSharedRef.current) return;

    scrolledToSharedRef.current = true;

    requestAnimationFrame(() => {
      const el = document.getElementById("shared-post");
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.remove("sharedFlash");
      void el.offsetWidth;
      el.classList.add("sharedFlash");

      setTimeout(() => {
        el.classList.remove("sharedFlash");
      }, 2000);
    });
  }, [sharedPost, search]);
  const mergedPosts = useMemo(() => {
    if (!sharedPost) return posts ?? [];
    const rest = (posts ?? []).filter((p) => p.id !== sharedPost.id);
    return [sharedPost, ...rest];
  }, [posts, sharedPost]);

  const filteredPosts = useMemo(() => {
    return mergedPosts.filter((post) => {
      if (post?.isSharedPost) return true;

      const matchCategory =
        selectedCategoryId === 0 || post?.category?.id === selectedCategoryId;

      if (!matchCategory) return false;

      const isForAllLabs = !post?.targetedLaboratory?.id;

      const matchLab =
        selectedLabId === 0 ||
        isForAllLabs ||
        post?.targetedLaboratory?.id === selectedLabId;

      return matchLab;
    });
  }, [mergedPosts, selectedLabId, selectedCategoryId]);

  const isInitialLoading =
    posts.length === 0 && labs.length === 0 && categories.length === 0;

  return (
    <div className={styles["main"]}>
      <Header
        img={feedImg}
        title="Feed de notícias"
        subtitle="Acompanhe as novidades e comunicados"
      />

      {isTablet && (
        <div className={`${styles["filters-card"]} ${styles["highlight"]}`}>
          <div className={styles["filters-header"]}>
            <FontAwesomeIcon icon={faFilter} />
            <span>Filtros</span>
          </div>

          <div className={styles["filters-fields"]}>
            <div className={styles["filter-field"]}>
              <label>Laboratório</label>
              <Select
                className={styles["select-filter"]}
                size="small"
                value={selectedLabId}
                onChange={(e) => setSelectedLabId(e.target.value)}
              >
                <MenuItem value={0}>Todos</MenuItem>
                {labs.map((lab) => (
                  <MenuItem key={lab.id} value={lab.id}>
                    {lab.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className={styles["filter-field"]}>
              <label>Tipo</label>
              <Select
                className={styles["select-filter"]}
                size="small"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <MenuItem value={0}>Todos</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className={styles["content"]}>
        <div className={styles["feed-wrapper"]}>
          {isInitialLoading ? (
            <div className={styles["feed-loading"]}>
              <CircularProgress size={22} />
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <FeedPost key={post.id} post={post} />)
          ) : null}
        </div>

        {!isTablet && (
          <div className={styles["filters-card"]}>
            <div className={styles["filters-header"]}>
              <FontAwesomeIcon icon={faFilter} />
              <span>Filtros</span>
            </div>

            <div className={styles["filters-fields"]}>
              <div className={styles["filter-field"]}>
                <label>Laboratório</label>
                <Select
                  className={styles["select-filter"]}
                  size="small"
                  value={selectedLabId}
                  onChange={(e) => setSelectedLabId(e.target.value)}
                >
                  <MenuItem value={0}>Todos</MenuItem>
                  {labs.map((lab) => (
                    <MenuItem key={lab.id} value={lab.id}>
                      {lab.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className={styles["filter-field"]}>
                <label>Tipo</label>
                <Select
                  className={styles["select-filter"]}
                  size="small"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <MenuItem value={0}>Todos</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
