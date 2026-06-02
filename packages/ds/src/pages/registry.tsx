import type { ComponentType } from 'react'
import {
  PlaygroundPage,
  ColorsPage,
  TypographyPage,
  IconsPage,
  DimensionsEffectsPage,
  EffectsPage,
  TransitionsPage,
  ButtonPage,
  DangerButtonPage,
  StaticCardPage,
  InteractiveCardPage,
  HyperlinksPage,
  TabsPage,
  PaginationPage,
  BreadcrumbPage,
  BadgePage,
  BadgePointerPage,
  BadgeCounterPage,
  InlineLoaderPage,
  SkeletonPage,
  TextFieldPage,
  TextareaPage,
  SelectPage,
  ComboboxPage,
  CheckboxPage,
  RadioPage,
  SwitchPage,
  ChipsPage,
  DatePickerPage,
  CollapsePage,
  AccordionPage,
  InfoPanelPage,
  ToastPage,
  TooltipPage,
  AvatarPage,
} from './lazy'

/**
 * Single source of truth for the page registry.
 *
 * Both the router ({@link ../App.tsx}) and the navigation
 * ({@link ../components/docs/Sidebar/Sidebar.tsx}) derive from this list — adding a
 * page means adding one entry here, nothing else.
 *
 * Lazy components are declared in {@link ./lazy.ts} to satisfy the
 * react-refresh/only-export-components lint rule.
 *
 * Order within the array is the order rendered in the sidebar.
 */

export const CATEGORIES = [
  'Playground',
  'Foundation',
  'Actions',
  'Structures',
  'Navigations',
  'Indicators',
  'Inputs',
  'Utilities',
  'Alerts',
  'Overlays',
  'Visual resources',
] as const

export type PageCategory = (typeof CATEGORIES)[number]

export interface PageDef {
  /** Route path, e.g. `/colors`. Also used as the React key. */
  path: string
  /** Sidebar label. */
  label: string
  /** Material Symbols icon name. */
  icon: string
  /** Sidebar grouping. */
  category: PageCategory
  /** Page component. Omit for items that are listed but not yet routable. */
  component?: ComponentType
  /** Renders the item as non-clickable (no route is registered for it). */
  disabled?: boolean
  /** Small badge shown next to the label, e.g. "Em breve". */
  badge?: string
}

export const PAGES: PageDef[] = [
  // ── Playground ──
  {
    path: '/playground',
    label: 'Playground',
    icon: 'science',
    category: 'Playground',
    component: PlaygroundPage,
  },

  // ── Foundation ──
  {
    path: '/colors',
    label: 'Colors',
    icon: 'palette',
    category: 'Foundation',
    component: ColorsPage,
  },
  {
    path: '/typography',
    label: 'Typography',
    icon: 'format_size',
    category: 'Foundation',
    component: TypographyPage,
  },
  {
    path: '/icons',
    label: 'Iconography',
    icon: 'grid_view',
    category: 'Foundation',
    component: IconsPage,
  },
  {
    path: '/dimensions',
    label: 'Dimensões',
    icon: 'straighten',
    category: 'Foundation',
    component: DimensionsEffectsPage,
  },
  {
    path: '/effects',
    label: 'Efeitos',
    icon: 'auto_awesome',
    category: 'Foundation',
    component: EffectsPage,
  },
  {
    path: '/transitions',
    label: 'Transições',
    icon: 'animation',
    category: 'Foundation',
    component: TransitionsPage,
  },

  // ── Actions ──
  {
    path: '/button',
    label: 'Button',
    icon: 'smart_button',
    category: 'Actions',
    component: ButtonPage,
  },
  {
    path: '/danger-button',
    label: 'Button · Danger',
    icon: 'warning',
    category: 'Actions',
    component: DangerButtonPage,
  },

  // ── Structures ──
  {
    path: '/static-card',
    label: 'Static Cards',
    icon: 'crop_square',
    category: 'Structures',
    component: StaticCardPage,
  },
  {
    path: '/interactive-card',
    label: 'Interactive Cards',
    icon: 'touch_app',
    category: 'Structures',
    component: InteractiveCardPage,
  },

  // ── Navigations ──
  {
    path: '/hyperlinks',
    label: 'Hyperlinks',
    icon: 'link',
    category: 'Navigations',
    component: HyperlinksPage,
  },
  { path: '/tabs', label: 'Tabs', icon: 'tab', category: 'Navigations', component: TabsPage },
  {
    path: '/pagination',
    label: 'Pagination',
    icon: 'more_horiz',
    category: 'Navigations',
    component: PaginationPage,
  },
  {
    path: '/breadcrumb',
    label: 'Breadcrumb',
    icon: 'route',
    category: 'Navigations',
    component: BreadcrumbPage,
  },
  {
    path: '/summary-stepper',
    label: 'Summary Stepper',
    icon: 'checklist',
    category: 'Navigations',
    disabled: true,
    badge: 'Em breve',
  },

  // ── Indicators ──
  {
    path: '/badge',
    label: 'Badge Status',
    icon: 'label',
    category: 'Indicators',
    component: BadgePage,
  },
  {
    path: '/badge-pointer',
    label: 'Badge Pointer',
    icon: 'fiber_manual_record',
    category: 'Indicators',
    component: BadgePointerPage,
  },
  {
    path: '/badge-counter',
    label: 'Badge Counter',
    icon: 'badge',
    category: 'Indicators',
    component: BadgeCounterPage,
  },
  {
    path: '/inline-loader',
    label: 'Inline Loader',
    icon: 'motion_blur',
    category: 'Indicators',
    component: InlineLoaderPage,
  },
  {
    path: '/skeleton',
    label: 'Skeleton',
    icon: 'hide_image',
    category: 'Indicators',
    component: SkeletonPage,
  },

  // ── Inputs ──
  {
    path: '/text-field',
    label: 'Text Field',
    icon: 'text_fields',
    category: 'Inputs',
    component: TextFieldPage,
  },
  {
    path: '/textarea',
    label: 'Textarea',
    icon: 'subject',
    category: 'Inputs',
    component: TextareaPage,
  },
  {
    path: '/select',
    label: 'Select',
    icon: 'arrow_drop_down_circle',
    category: 'Inputs',
    component: SelectPage,
  },
  {
    path: '/combobox',
    label: 'Combobox',
    icon: 'search_check',
    category: 'Inputs',
    component: ComboboxPage,
  },
  {
    path: '/checkbox',
    label: 'Checkbox',
    icon: 'check_box',
    category: 'Inputs',
    component: CheckboxPage,
  },
  {
    path: '/radio',
    label: 'Radio Button',
    icon: 'radio_button_checked',
    category: 'Inputs',
    component: RadioPage,
  },
  {
    path: '/switch',
    label: 'Switch',
    icon: 'toggle_on',
    category: 'Inputs',
    component: SwitchPage,
  },
  { path: '/chips', label: 'Chips', icon: 'sell', category: 'Inputs', component: ChipsPage },
  {
    path: '/date-picker',
    label: 'Date Picker',
    icon: 'edit_calendar',
    category: 'Inputs',
    component: DatePickerPage,
  },
  // ── Utilities ──
  {
    path: '/collapse',
    label: 'Collapse',
    icon: 'unfold_more',
    category: 'Utilities',
    component: CollapsePage,
  },
  {
    path: '/accordion',
    label: 'Accordion',
    icon: 'expand_all',
    category: 'Utilities',
    component: AccordionPage,
  },

  // ── Alerts ──
  {
    path: '/info-panel',
    label: 'Info Panel',
    icon: 'info',
    category: 'Alerts',
    component: InfoPanelPage,
  },
  {
    path: '/toast',
    label: 'Toast',
    icon: 'notification_important',
    category: 'Alerts',
    component: ToastPage,
  },

  // ── Overlays ──
  {
    path: '/tooltip',
    label: 'Tooltip',
    icon: 'tooltip',
    category: 'Overlays',
    component: TooltipPage,
  },

  // ── Visual resources ──
  {
    path: '/avatar',
    label: 'Avatar',
    icon: 'account_circle',
    category: 'Visual resources',
    component: AvatarPage,
  },
]

/** Path the index route ("/") redirects to. */
export const DEFAULT_PATH = '/colors'

type PagePath = (typeof PAGES)[number]['path']

/** Type-safe route constants derived from PAGES. Keys are SCREAMING_SNAKE_CASE. */
export const ROUTES = Object.fromEntries(
  PAGES.map((p) => [p.path.slice(1).replace(/-/g, '_').toUpperCase(), p.path])
) as Record<string, PagePath>
