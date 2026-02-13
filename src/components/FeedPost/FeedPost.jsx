import {
  faCircle,
  faCommentDots,
  faHeart,
  faShare,
  faQuestionCircle,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery, CircularProgress } from "@mui/material";
import Tooltip from "~/components/Tooltip/Tooltip";
import styles from "./feedPost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  getPostComments,
  getShareUrlForPost,
} from "~/services/Feed/feedService.api";
import { useToast } from "~/providers/Toast/useToast";
import FeedComment from "~/components/FeedComment/FeedComent";
import Modal from "~/components/Modal/Modal";
import { formatRelativeDate } from "~/utils/date";

export default function FeedPost({ post }) {
  const isVerySmall = useMediaQuery("(max-width:400px)");
  const toast = useToast();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState(null);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  async function handleToggleComments() {
    const willOpen = !isCommentsOpen;
    setIsCommentsOpen(willOpen);
    if (!willOpen) return;
    if (comments !== null) return;

    try {
      setIsLoadingComments(true);
      const data = await getPostComments(post.id);
      setComments(data);
    } catch (err) {
      toast.error("Erro", err);
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  }

  function openShare() {
    const url = getShareUrlForPost(post.id);

    if (!url) {
      toast.error("Erro", "Não foi possível gerar o link de compartilhamento");
      return;
    }

    setShareUrl(url);
    setOpenShareModal(true);
  }

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Sucesso", "Link copiado para a área de transferência!");
    } catch {
      toast.error(
        "Erro",
        "Ocorreu um erro ao copiar o texto para a área de transferência.",
      );
    }
  }
  return (
    <div
      className={styles["post-wrapper"]}
      id={post?.isSharedPost ? "shared-post" : undefined}
    >
      {post?.isSharedPost ? (
        <div className={styles["shared-banner"]}>Post compartilhado</div>
      ) : null}

      <div className={styles["post-header"]}>
        <div className={styles["user-info"]}>
          <div className={styles["user-img-wrapper"]}>
            {post ? <img src={post.userAvatarUrl} /> : null}
          </div>

          <div className={styles["user-details"]}>
            <span className={styles["username"]}>
              {post ? post.creatorName : ""}
            </span>

            <div className={styles["user-lab-profile"]}>
              <span className={styles["user-profile"]}>
                {post ? post.creatorProfile : ""}
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
              {post ? formatRelativeDate(post.createdAt) : ""}
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
          <p>{post ? post.text : ""}</p>
        </div>

        {post && post.postImg ? (
          <div className={styles["body-img-wrapper"]}>
            <img src={post.postImg} />
          </div>
        ) : null}
      </div>

      <div className={styles["post-footer"]}>
        <div className={styles["footer-actions"]}>
          <Tooltip content="Curtir" placement="top">
            <button className={styles["footer-action"]}>
              <FontAwesomeIcon icon={faHeart} />
              <span>{post?.likesCount ?? 12}</span>
            </button>
          </Tooltip>
          <Tooltip content="Comentar" placement="top">
            <button
              type="button"
              className={styles["footer-action"]}
              onClick={handleToggleComments}
              aria-expanded={isCommentsOpen}
            >
              <FontAwesomeIcon icon={faCommentDots} />
              <span>{post?.commentsCount ?? 4}</span>
            </button>
          </Tooltip>
          <Tooltip content="Compartilhar" placement="top">
            <button className={styles["footer-action"]} onClick={openShare}>
              <FontAwesomeIcon icon={faShare} />
            </button>
          </Tooltip>
        </div>

        {isCommentsOpen && (
          <div className={styles["comments-area"]}>
            {isLoadingComments ? (
              <div className={styles["comments-loading"]}>
                <CircularProgress size={18} />
              </div>
            ) : comments?.length ? (
              <ul className={styles["comments-list"]}>
                {comments.map((c) => (
                  <FeedComment key={c.id} comment={c} postId={post.id} />
                ))}
              </ul>
            ) : (
              <div className={styles["comments-empty"]}>
                Nenhum comentário foi encontrado. Seja o primeiro a comentar!
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        open={openShareModal}
        title="Compartilhar"
        onClose={() => setOpenShareModal(false)}
      >
        <div className={styles["share-modal"]}>
          <div className={styles["share-modal-title"]}>
            Compartilhe o seu post!
          </div>

          <div className={styles["share-modal-wrapper"]}>
            <input
              id={`share-input-${post?.id}`}
              type="text"
              value={shareUrl}
              readOnly
              className={styles["share-modal-input"]}
            />
            <Tooltip content="Copiar" placement="top" asChild>
              <button
                type="button"
                onClick={copyShare}
                className={styles["share-modal-copy"]}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </div>
  );
}
