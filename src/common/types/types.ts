export interface TranslationFile {
  [key: string]: string | TranslationFile;
}

export interface QuestionProps {
  question: string;
}

export interface EditorLoaderProps {
  editor: any | null;
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
  stack: string | null;
}

export interface UseThemeState {
  theme: string;
  changeTheme: (reqTheme: string) => void;
}

export interface UseLanguageState {
  language: string;
  changeLanguage: (reqLanguage: string) => void;
}

export interface UseMainState {
  currentChallenge: {
    id: string;
    difficulty: string;
    title: {
      en: string;
      tr: string;
    };
    question: {
      en: string;
      tr: string;
    };
    stack: string;
    starterCode: string;
    code: string | null;
  } | null;
  setCurrentChallenge: React.Dispatch<
    React.SetStateAction<{
      id: string;
      difficulty: string;
      title: {
        en: string;
        tr: string;
      };
      question: {
        en: string;
        tr: string;
      };
      stack: string;
      starterCode: string;
      code: string | null;
    }>
  >;

  updateChallenge: (challenge: any) => void;
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

export interface AuthContextState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface User {
  userId?: string;
  sessionId?: string;
  challengeId?: string;
}

export interface ApiServiceClass {
  authSession: (id: string | null) => Promise<{
    isValid: boolean;
    isStarted: boolean;
    userId?: string;
    sessionId?: string;
    challengeId?: string;
    error?: any;
  }>;
  getChallenge: (sessionId: string) => Promise<any>;
}
