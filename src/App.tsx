import { useState } from 'react'
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
import styles from './App.module.css'

export default function App() {
  const [activePage, setActivePage] = useState('colors')

  return (
    <div className={styles.shell}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className={styles.content}>
        {activePage === 'colors' && <ColorsPage />}
        {activePage === 'typography' && <TypographyPage />}
        {activePage === 'icons' && <IconsPage />}
        {activePage === 'button' && <ButtonPage />}
        {activePage === 'danger-button' && <DangerButtonPage />}
        {activePage === 'static-card' && <StaticCardPage />}
        {activePage === 'interactive-card' && <InteractiveCardPage />}
        {activePage === 'hyperlinks' && <HyperlinksPage />}
        {activePage === 'tabs' && <TabsPage />}
        {activePage === 'badge-counter' && <BadgeCounterPage />}
        {activePage === 'pagination' && <PaginationPage />}
        {activePage === 'breadcrumb' && <BreadcrumbPage />}
        {activePage === 'badge' && <BadgePage />}
        {activePage === 'badge-pointer' && <BadgePointerPage />}
        {activePage === 'inline-loader' && <InlineLoaderPage />}
        {activePage === 'skeleton' && <SkeletonPage />}
        {activePage === 'checkbox' && <CheckboxPage />}
        {activePage === 'radio' && <RadioPage />}
        {activePage === 'switch' && <SwitchPage />}
        {activePage === 'chips' && <ChipsPage />}
      </main>
    </div>
  )
}
