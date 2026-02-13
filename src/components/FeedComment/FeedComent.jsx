import {
  faArrowRight,
  faHeart,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { useState, useMemo } from "react";
import { getPostCommentReplies } from "~/services/Feed/feedService.api";
import { useToast } from "~/providers/Toast/useToast";
import styles from "./feedComment.module.css";
import Tooltip from "~/components/Tooltip/Tooltip"
const COMMENT_TRUNCATE_LIMIT = 100;

export default function FeedComment({ comment, postId }) {
  const toast = useToast();

  const isReply = comment.parentCommentId !== null;

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [replies, setReplies] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const text = comment?.text ?? "";
  const isTruncated = text.length > COMMENT_TRUNCATE_LIMIT;

  const displayedText = useMemo(() => {
    if (expanded || !isTruncated) return text;
    return text.slice(0, COMMENT_TRUNCATE_LIMIT).trim() + "…";
  }, [expanded, isTruncated, text]);

  async function handleToggleReplies() {
    const willOpen = !isRepliesOpen;
    setIsRepliesOpen(willOpen);
    if (!willOpen) return;
    if (replies !== null) return;

    try {
      setIsLoadingReplies(true);
      const data = await getPostCommentReplies(postId, comment.id);
      setReplies(data);
    } catch (err) {
      toast.error("Erro", err);
      setReplies([]);
    } finally {
      setIsLoadingReplies(false);
    }
  }

  function handleToggleExpand() {
    setExpanded((v) => !v);
  }

  return (
    <li
      className={`${styles["comment-item"]} ${isReply ? styles["reply"] : ""} ${
        comment?.repliesCount > 0 ? styles["has-replies"] : ""
      } ${isRepliesOpen ? styles["replies-open"] : ""}`}
    >
      <div className={styles["comment-main"]}>
        <div className={styles["comment-avatar-wrapper"]}>
          {comment?.user?.avatarUrl ? (
            <img
              className={styles["comment-avatar"]}
              src={comment.user.avatarUrl}
              alt=""
            />
          ) : null}
        </div>

        <div className={styles["comment-content"]}>
          <div className={styles["comment-header"]}>
            <span className={styles["comment-author"]}>
              {comment?.user?.name ?? "Usuário"}
            </span>

            {comment?.mentionedUsername ? (
              <span className={styles["comment-mention"]}>
                <FontAwesomeIcon icon={faArrowRight} />
                <span>{comment.mentionedUsername}</span>
              </span>
            ) : null}
          </div>

          <span className={styles["comment-text"]}>{displayedText}</span>

          {isTruncated ? (
            <button
              type="button"
              className={styles["comment-see-more"]}
              onClick={handleToggleExpand}
            >
              <strong>{expanded ? "Ver menos" : "Ver mais"}</strong>
            </button>
          ) : null}

          <div className={styles["comment-actions"]}>
            <Tooltip content="Curtir" placement="top">
              <button className={styles["comment-action"]}>
                <FontAwesomeIcon icon={faHeart} />
                <span>{comment?.likesCount ?? 0}</span>
              </button>
            </Tooltip>
            <Tooltip content="Comentar" placement="top">
              <button className={styles["comment-action"]}>
                <FontAwesomeIcon icon={faCommentDots} />
              </button>
            </Tooltip>
          </div>

          {comment?.repliesCount > 0 ? (
            <button
              type="button"
              className={styles["replies-toggle"]}
              onClick={handleToggleReplies}
            >
              {isRepliesOpen
                ? "Ocultar respostas"
                : `${comment.repliesCount} respostas`}
            </button>
          ) : null}
        </div>
      </div>

      {isRepliesOpen ? (
        <div className={styles["replies-area"]}>
          {isLoadingReplies ? (
            <div className={styles["replies-loading"]}>
              <CircularProgress size={16} />
            </div>
          ) : replies?.length ? (
            <ul className={styles["replies-list"]}>
              {replies.map((r) => (
                <FeedComment key={r.id} comment={r} postId={postId} />
              ))}
            </ul>
          ) : (
            <div className={styles["replies-empty"]}>
              Nenhum comentário foi encontrado. Seja o primeiro a comentar!
            </div>
          )}
        </div>
      ) : null}
    </li>
  );
}
