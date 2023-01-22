export interface TranslationFile {
  [key: string]: string | TranslationFile;
}

export interface QuestionProps {
  question: string;
}

export interface EditorLoaderProps {
  editor: any;
}

export interface TabsProps {
  tabs: { id: number; name: string; isActive: boolean; content: string }[];
  setTabs: React.Dispatch<
    React.SetStateAction<
      { id: number; name: string; isActive: boolean; content: string }[]
    >
  >;
}

export interface ControlButtonProps {
  children: any;
  onClick: () => void;
}

export interface UseMainState {
  theme: string;
  changeTheme: (reqTheme: string) => void;
}

export interface UseLanguageState {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
