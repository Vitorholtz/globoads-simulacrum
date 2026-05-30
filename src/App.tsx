import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import ColorsPage from './pages/Colors/ColorsPage'
import TypographyPage from './pages/Typography/TypographyPage'
import IconsPage from './pages/Icons/IconsPage'
import ButtonPage from './pages/Button/ButtonPage'
import DangerButtonPage from './pages/DangerButton/DangerButtonPage'
import StaticCardPage from './pages/StaticCard/StaticCardPage'
import InteractiveCardPage from './pages/InteractiveCard/InteractiveCardPage'
import HyperlinksPage from './pages/Hyperlinks/HyperlinksPage'
import TabsPage from './pages/Tabs/TabsPage'
import BadgeCounterPage from './pages/BadgeCounter/BadgeCounterPage'
import PaginationPage from './pages/Pagination/PaginationPage'
import BreadcrumbPage from './pages/Breadcrumb/BreadcrumbPage'
import BadgePage from './pages/Badge/BadgePage'
import BadgePointerPage from './pages/BadgePointer/BadgePointerPage'
import InlineLoaderPage from './pages/InlineLoader/InlineLoaderPage'
import SkeletonPage from './pages/Skeleton/SkeletonPage'
import CheckboxPage from './pages/Checkbox/CheckboxPage'
import RadioPage from './pages/Radio/RadioPage'
import SwitchPage from './pages/Switch/SwitchPage'
import ChipsPage from './pages/Chips/ChipsPage'
import TextFieldPage from './pages/TextField/TextFieldPage'
import TextareaPage from './pages/Textarea/TextareaPage'
import SelectPage from './pages/Select/SelectPage'
import ComboboxPage from './pages/Combobox/ComboboxPage'
import DatePickerPage from './pages/DatePicker/DatePickerPage'
import CollapsePage from './pages/Collapse/CollapsePage'
import AccordionPage from './pages/Accordion/AccordionPage'
import TooltipPage from './pages/Tooltip/TooltipPage'
import InfoPanelPage from './pages/InfoPanel/InfoPanelPage'
import ToastPage from './pages/Toast/ToastPage'
import DimensionsEffectsPage from './pages/DimensionsEffects/DimensionsEffectsPage'
import EffectsPage from './pages/Effects/EffectsPage'
import AvatarPage from './pages/Avatar/AvatarPage'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/colors" replace />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/danger-button" element={<DangerButtonPage />} />
          <Route path="/static-card" element={<StaticCardPage />} />
          <Route path="/interactive-card" element={<InteractiveCardPage />} />
          <Route path="/hyperlinks" element={<HyperlinksPage />} />
          <Route path="/tabs" element={<TabsPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/badge-pointer" element={<BadgePointerPage />} />
          <Route path="/badge-counter" element={<BadgeCounterPage />} />
          <Route path="/inline-loader" element={<InlineLoaderPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/checkbox" element={<CheckboxPage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/switch" element={<SwitchPage />} />
          <Route path="/chips" element={<ChipsPage />} />
          <Route path="/text-field" element={<TextFieldPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/combobox" element={<ComboboxPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="/collapse" element={<CollapsePage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
          <Route path="/info-panel" element={<InfoPanelPage />} />
          <Route path="/toast" element={<ToastPage />} />
          <Route path="/dimensions" element={<DimensionsEffectsPage />} />
          <Route path="/effects" element={<EffectsPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
        </Routes>
      </main>
    </div>
  )
}
