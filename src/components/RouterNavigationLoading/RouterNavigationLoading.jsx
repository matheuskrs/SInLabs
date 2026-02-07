import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";

const MIN_DURATION = 400;

export function RouterNavigationLoading() {
  const { hideLoading } = useGlobalLoading();
  setTimeout(() => {
    hideLoading();
  }, MIN_DURATION)
  return null;
}
