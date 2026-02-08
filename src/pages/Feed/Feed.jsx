import Header from "~/components/Header/Header";
import feedImg from "~/assets/Feed/feedImg.png";
import styles from "./feed.module.css";
import FeedPost from "../../components/FeedPost/FeedPost";
import { useEffect, useMemo, useState } from "react";
import {
  getFeed,
  getFeedCategories,
} from "../../services/Feed/feedService.api";
import { getLaboratories } from "../../services/Laboratories/laboratoriesService.api";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, MenuItem } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedLabId, setSelectedLabId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    async function loadData() {
      const [feedData, labsData, categoriesData] = await Promise.all([
        getFeed(),
        getLaboratories(),
        getFeedCategories(),
      ]);

      setPosts(feedData ?? []);
      setLabs(labsData ?? []);
      setCategories(categoriesData ?? []);
    }

    loadData();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchLab =
        selectedLabId === 0 || post?.targetedLaboratory?.id === selectedLabId;

      const matchCategory =
        selectedCategoryId === 0 || post?.category?.id === selectedCategoryId;

      return matchLab && matchCategory;
    });
  }, [posts, selectedLabId, selectedCategoryId]);

  return (
    <div className={styles["main"]}>
      <Header
        img={feedImg}
        title="Feed de notícias"
        subtitle="Acompanhe as novidades e comunicados"
      />

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

      <div className={styles["feed-wrapper"]}>
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => <FeedPost key={post.id} post={post} />)
          : null}
      </div>
    </div>
  );
}
