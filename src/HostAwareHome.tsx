// HostAwareHome.tsx (TSX)
import React from "react";
import App from "./App";
import MelhoriasHospitais from "./pages/MelhoriasHospitais";
import AvaliacaoAtencaoBasica from "./pages/AvaliacaoAtencaoBasica";

/**
 * Renderiza a "home" correta com base no hostname.
 * Mantém a URL limpa (não navega, só rende o componente).
 */
const HOST_COMPONENT_MAP: Record<string, React.ComponentType> = {
  "diagnosticohospitalar.rapimed.com.br": MelhoriasHospitais,
  "diagnosticoatencaobasica.rapimed.com.br": AvaliacaoAtencaoBasica,
  // Adicione variações se precisar (staging, etc.)
  // "hosp.staging.rapimed.com.br": MelhoriasHospitais,
  // "ab.staging.rapimed.com.br": AvaliacaoAtencaoBasica,
};

type Props = {
  /** Componente padrão quando o host não está mapeado (ex.: dashvision.com.br) */
  defaultComponent?: React.ComponentType;
};

export default function HostAwareHome({ defaultComponent: Default = App }: Props) {
  const host =
    typeof window !== "undefined" ? window.location.hostname : "";

  const Comp = HOST_COMPONENT_MAP[host] ?? Default;
  return <Comp />;
}
