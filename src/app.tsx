import { Builder } from "@/features/builder";
import MainLayout from "@/layouts/MainLayout";
import heroTemplate from "@/templates/hero.json";
import simpleTemplate from "@/templates/simple.json";
import { ElementNode } from "@/types/dom";
import { TemplateProvider, useTemplate } from "./context/TemplateContext";
import { Preview } from "./features/preview";

const template1 = simpleTemplate as ElementNode;
const template2 = heroTemplate as ElementNode;

const AppContent = () => {
  const { selectedTemplate, setSelectedTemplate } = useTemplate();

  return (
    <MainLayout>
      {selectedTemplate ? (
        <Builder rootElement={selectedTemplate} setRootElement={setSelectedTemplate} />
      ) : (
        <Preview templates={[template1, template2]} setSelectedTemplate={setSelectedTemplate} />
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
