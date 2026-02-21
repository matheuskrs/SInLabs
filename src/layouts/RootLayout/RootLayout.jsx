import { Outlet, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";

export default function RootLayout() {
  const navigation = useNavigation();
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    if (navigation.state === "loading") showLoading("Carregando página");
    else hideLoading();
  }, [navigation, navigation.state, showLoading, hideLoading]);

  return <Outlet />;
}
