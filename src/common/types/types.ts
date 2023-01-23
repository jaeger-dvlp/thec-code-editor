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

export interface StackProps {
  stack: string;
}

export interface UseThemeState {
  theme: string;
  changeTheme: (reqTheme: string) => void;
}

export interface UseLanguageState {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseMainState {
  currentChallenge: {
    id: string;
    title: string;
    difficulty: string;
    stack: string;
    points: number;
    question: string;
    starterCode: string;
  };
}

export interface AlertPopupState {
  inHTML: boolean;
  isActive: boolean;
  content: string;
  isLoading: boolean;
  onClick: () => void;
}

export interface ConfirmPopupState {
  inHTML: boolean;
  isActive: boolean;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ActivateAlertPopupProps {
  content: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export interface ActivateConfirmPopupProps {
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface UsePopupState {
  alertPopup: AlertPopupState;
  confirmPopup: ConfirmPopupState;
  ActivateAlertPopup: (props: ActivateAlertPopupProps) => void;
  ActivateConfirmPopup: (props: ActivateConfirmPopupProps) => void;
  DeactivateAlertPopup: () => void;
  DeactivateConfirmPopup: () => void;
}
