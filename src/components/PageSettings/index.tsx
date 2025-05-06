import { ElementNode, ElementType } from "@/types/dom";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getNumericValue } from "@/utils/getNumericValue";
import { ChangeEvent } from "react";
import { InputField } from "../Form/InputField";
import { RadioGroupField } from "../Form/RadioGroupField";
import { TextareaField } from "../Form/TextAreaField";
import styles from "./PageSettings.module.css";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface PageSettingsProps {
  selectedElement: ElementNode;
  updateElement: (id: string, updatedFields: Partial<ElementNode>) => void;
}

const PageSettings: React.FC<PageSettingsProps> = ({ selectedElement, updateElement }) => {
  const { id, type } = selectedElement;
  const isMobile = useBreakpoint(992);

  const handleStyleChange = (styleKey: string, value: string) => {
    updateElement(id, {
      styles: { ...selectedElement.styles, [styleKey]: value },
    });
  };

  const handleAttributeChange = (attrKey: string, value: string) => {
    updateElement(id, {
      attributes: { ...selectedElement.attributes, [attrKey]: value },
    });
  };

  const handleContentChange = (value: string) => {
    updateElement(id, { content: value });
  };

  const renderContainerSettings = () => (
    <>
      <InputField
        label="Background Color"
        type="color"
        value={selectedElement.styles?.backgroundColor || "#e0f7fa"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
        data-testid="background-color-input"
      />
      <InputField
        label="Page width"
        type="range"
        value={getNumericValue(selectedElement.styles?.maxWidth as string | undefined, "100")}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("maxWidth", `${e.target.value}%`)}
        min="50"
        max="100"
        data-testid="page-width-input"
      />
    </>
  );

  const renderTextSettings = () => (
    <>
      <InputField
        label="Text color"
        type="color"
        value={selectedElement.styles?.color || "#333"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("color", e.target.value)}
        data-testid="text-color-input"
      />
      <InputField
        label="Font size"
        type="range"
        value={getNumericValue(selectedElement.styles?.fontSize as string | undefined, "24")}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("fontSize", `${e.target.value}px`)}
        min={type === ElementType.PARAGRAPH ? "12" : "24"}
        max={type === ElementType.PARAGRAPH ? "24" : "48"}
        data-testid="font-size-input"
      />
      <RadioGroupField
        label="Font weight"
        name="fontWeight"
        value={(selectedElement.styles?.fontWeight as string) ?? "normal"}
        onChange={(value: string) => handleStyleChange("fontWeight", value)}
        options={[
          { label: "Lighter", value: "lighter" },
          { label: "Normal", value: "normal" },
          { label: "Bold", value: "bold" },
        ]}
      />
      <RadioGroupField
        label="Text align"
        name="textAlign"
        value={(selectedElement.styles?.textAlign as string) ?? "start"}
        onChange={(value: string) => handleStyleChange("textAlign", value)}
        options={[
          { label: "Start", value: "start" },
          { label: "Center", value: "center" },
          { label: "End", value: "end" },
        ]}
      />
      <TextareaField
        label="Content"
        value={selectedElement.content || ""}
        onChange={({ target: { value } }) => handleContentChange(value)}
        data-testid="content-textarea"
      />
    </>
  );

  const renderImageSettings = () => (
    <>
      <InputField
        label="Image URL"
        type="text"
        value={(selectedElement.attributes as { src?: string })?.src || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("src", e.target.value)}
        placeholder="Enter image URL"
        data-testid="image-url-input"
      />
      <InputField
        label="Alt Text"
        type="text"
        value={(selectedElement.attributes as { alt?: string })?.alt || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("alt", e.target.value)}
        placeholder="Enter alt text"
        data-testid="alt-text-input"
      />
    </>
  );

  const renderButtonSettings = () => (
    <>
      <InputField
        label="Button Text"
        type="text"
        value={selectedElement.content || ""}
        onChange={({ target: { value } }) => handleContentChange(value)}
        placeholder="Enter button text"
        data-testid="button-text-input"
      />
      <InputField
        label="Background Color"
        type="color"
        value={selectedElement.styles?.backgroundColor || "#3b82f6"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
        data-testid="button-bg-color-input"
      />
    </>
  );

  const renderLinkSettings = () => (
    <>
      <InputField
        label="Link Text"
        type="text"
        value={selectedElement.content || ""}
        onChange={({ target: { value } }) => handleContentChange(value)}
        placeholder="Enter link text"
      />
      <InputField
        label="URL"
        type="text"
        value={(selectedElement.attributes as { href?: string })?.href || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAttributeChange("href", e.target.value)}
        placeholder="Enter URL"
      />
      <InputField
        label="Text Color"
        type="color"
        value={selectedElement.styles?.color || "#3b82f6"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleStyleChange("color", e.target.value)}
      />
    </>
  );

  const renderSettingsByType = () => {
    switch (type) {
      case ElementType.PAGE:
      case ElementType.CONTAINER:
        return renderContainerSettings();
      case ElementType.HEADING:
      case ElementType.PARAGRAPH:
        return renderTextSettings();
      case ElementType.IMAGE:
        return renderImageSettings();
      case ElementType.BUTTON:
        return renderButtonSettings();
      case ElementType.LINK:
        return renderLinkSettings();
      default:
        return null;
    }
  };

  return (
    <div className={styles.container} data-testid="settings-modal">
      {!isMobile && <h3 className={styles.heading}>{capitalizeFirstLetter(type)} settings</h3>}
      <div className={styles.content}>{renderSettingsByType()}</div>
    </div>
  );
};

export { PageSettings, type PageSettingsProps };
