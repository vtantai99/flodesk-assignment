import { BuilderSection } from "@/components/BuilderSection";
import MainLayout from "@/layouts/MainLayout";
import { PreviewSection } from "./components/PreviewSection";
import { TemplateProvider, useTemplate } from "./context/TemplateContext";
import simpleTemplate from "@/templates/simple.json";
import heroTemplate from "@/templates/hero.json";
import { ElementNode } from "@/types/dom";

const template1 = heroTemplate as ElementNode;
const template2 = simpleTemplate as ElementNode;

const AppContent = () => {
  const { selectedTemplate, setSelectedTemplate } = useTemplate();

  return (
    <MainLayout>
      {selectedTemplate ? (
        <BuilderSection rootElement={selectedTemplate} setRootElement={setSelectedTemplate} />
      ) : (
        <PreviewSection templates={[template1, template2]} setSelectedTemplate={setSelectedTemplate} />
      )}
    </MainLayout>
  );
};

const App = () => (
  <TemplateProvider>
    <AppContent />
  </TemplateProvider>
);

export default App;
