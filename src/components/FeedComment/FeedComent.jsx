import {
  faArrowRight,
  faHeart,
  faCommentDots,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { useState, useMemo, useRef, useEffect } from "react";
import { getPostCommentReplies } from "~/services/Feed/feedService.api";
import { useToast } from "~/providers/Toast/useToast";
import styles from "./feedComment.module.css";
import Tooltip from "~/components/Tooltip/Tooltip";
import SmartImage from "~/components/SmartImage/SmartImage";
const COMMENT_TRUNCATE_LIMIT = 100;

export default function FeedComment({
  comment,
  postId,
  replyingParentId,
  setReplyingParentId,
}) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const toast = useToast();

  const isReply = comment.parentCommentId !== null;
  const parentId = isReply ? comment.parentCommentId : comment.id;
  const [replyText, setReplyText] = useState("");
  const replyTextareaRef = useRef(null);

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

  function handleToggleReply() {
    setReplyingParentId((current) => (current === parentId ? null : parentId));
  }

  function handleSubmitReply() {
    const value = replyText.trim();
    if (!value) return;
    toast.success("Sucesso", "Comentário enviado com sucesso!");
    setReplyText("");
    setReplyingParentId(null);
  }

  useEffect(() => {
    if (isReply) return;
    if (replyingParentId !== comment.id) return;

    if (replies === null) {
      (async () => {
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
      })();
    }
  }, [isReply, replyingParentId, comment.id, replies, postId, toast]);

  return (
    <li
      className={`${styles["comment-item"]} ${isReply ? styles["reply"] : ""} ${
        comment?.repliesCount > 0 ? styles["has-replies"] : ""
      } ${isRepliesOpen ? styles["replies-open"] : ""}`}
    >
      <div className={styles["comment-main"]}>
        <div className={styles["comment-avatar-wrapper"]}>
          {comment?.user?.avatarUrl ? (
            <SmartImage src={comment.user.avatarUrl} alt={comment?.user?.name} wrapperClassName={styles["comment-avatar"]}/>
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
            <Tooltip content="Responder" placement="top">
              <button
                className={styles["comment-action"]}
                type="button"
                onClick={handleToggleReply}
              >
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
                <FeedComment
                  key={r.id}
                  comment={r}
                  postId={postId}
                  replyingParentId={replyingParentId}
                  setReplyingParentId={setReplyingParentId}
                />
              ))}
            </ul>
          ) : (
            <div className={styles["replies-empty"]}>
              Nenhum comentário foi encontrado. Seja o primeiro a comentar!
            </div>
          )}
        </div>
      ) : null}

      {!isReply && replyingParentId === comment.id ? (
        <div className={styles["replybox"]}>
          <div className={styles["replybox-avatar"]}>
            <span className={styles["replybox-avatar-fallback"]}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>

          <div className={styles["replybox-input"]}>
            <textarea
              ref={replyTextareaRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Escreva uma resposta..."
              rows={3}
            />
            <div className={styles["replybox-footer"]}>
              <button
                type="button"
                className={styles["replybox-submit"]}
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
              >
                {isMobile ? <FontAwesomeIcon icon={faPaperPlane} /> : "Responder"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
