import { LogisticGrowthDiagram } from "./LogisticGrowthDiagram";
import { CarbonCycleDiagram } from "./CarbonCycleDiagram";
import { BiomagnificationDiagram } from "./BiomagnificationDiagram";
import { EutrophicationDiagram } from "./EutrophicationDiagram";
import { DeforestationDiagram } from "./DeforestationDiagram";

// Diagrams are referenced from content data by a stable string key, so the
// content stays plain serializable data while the visuals live in code.
export const diagramRegistry: Record<string, { title: string; Component: React.ComponentType }> = {
  "logistic-growth": { title: "Logistic growth curve with carrying capacity", Component: LogisticGrowthDiagram },
  "carbon-cycle": { title: "Carbon cycle", Component: CarbonCycleDiagram },
  "biomagnification": { title: "Biomagnification up a food chain", Component: BiomagnificationDiagram },
  "eutrophication": { title: "Eutrophication of a pond", Component: EutrophicationDiagram },
  "deforestation": { title: "Deforestation: before and after", Component: DeforestationDiagram },
};

export type DiagramKey = keyof typeof diagramRegistry;

export function Diagram({ diagramKey, showCaption = true }: { diagramKey: string; showCaption?: boolean }) {
  const entry = diagramRegistry[diagramKey];
  if (!entry) return null;
  const { title, Component } = entry;
  return (
    <figure className="my-4 flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4">
      <Component />
      {showCaption && <figcaption className="mt-2 text-xs text-gray-500">{title}</figcaption>}
    </figure>
  );
}
