import {
  faCircle,
  faCommentDots,
  faHeart,
  faShare,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";
import Tooltip from "~/components/Tooltip/Tooltip";
import styles from "./feedPost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FeedPost({ post }) {
  const isVerySmall = useMediaQuery("(max-width:400px)");

  return (
    <div className={styles["post-wrapper"]}>
      <div className={styles["post-header"]}>
        <div className={styles["user-info"]}>
          <div className={styles["user-img-wrapper"]}>
            {post ? <img src={post.userAvatarUrl} /> : null}
          </div>

          <div className={styles["user-details"]}>
            <span className={styles["username"]}>
              {post ? post.creatorName : "João Silva"}
            </span>

            <div className={styles["user-lab-profile"]}>
              <span className={styles["user-profile"]}>
                {post ? post.creatorProfile : "Coordenador"}
              </span>

              <FontAwesomeIcon
                icon={faCircle}
                className={styles["system-version-dot"]}
              />

              <span className={styles["user-laboratory"]}>
                {post && post.targetedLaboratory
                  ? post.targetedLaboratory.name
                  : "Todos"}
              </span>
            </div>

            <div className={styles["post-creation-date"]}>
              {post ? post.createdAt : "2025-10-22 10:30"}
            </div>
          </div>
        </div>

        <div className={styles["post-category"]}>
          {isVerySmall ? (
            <Tooltip content={post?.category?.name ?? "Anúncio"}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className={styles["category-icon"]}
              />
            </Tooltip>
          ) : (
            <span className={styles["post-category-text"]}>
              {post ? post.category?.name : "Anúncio"}
            </span>
          )}
        </div>
      </div>

      <div className={styles["post-body"]}>
        <div className={styles["body-title"]}>
          <p>
            {post
              ? post.text
              : "Novo sistema acadêmico disponível! Acesse o portal e confira as novidades na gestão de matrículas."}
          </p>
        </div>

        {post && post.postImg ? (
          <div className={styles["body-img-wrapper"]}>
            <img src={post.postImg} />
          </div>
        ) : null}
      </div>

      <div className={styles["post-footer"]}>
        <div className={styles["footer-actions"]}>
          <button className={styles["footer-action"]}>
            <FontAwesomeIcon icon={faHeart} />
            <span>{post?.likesCount ?? 12}</span>
          </button>

          <button className={styles["footer-action"]}>
            <FontAwesomeIcon icon={faCommentDots} />
            <span>{post?.commentsCount ?? 4}</span>
          </button>

          <button className={styles["footer-action"]}>
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </div>
  );
}
