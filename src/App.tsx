import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  FolderKanban,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  LogOut,
  Moon,
  MoreHorizontal,
  NotebookPen,
  Paintbrush2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  Video,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ThemeMode = 'light' | 'dark';
type SectionId =
  | 'dashboard'
  | 'schedule'
  | 'tasks'
  | 'projects'
  | 'business-ideas'
  | 'business-plans'
  | 'expenses'
  | 'income'
  | 'goals'
  | 'plans'
  | 'notes'
  | 'photos'
  | 'videos'
  | 'documents'
  | 'achievements'
  | 'journal'
  | 'analytics'
  | 'ai'
  | 'settings';

type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Cancelled';
type TaskPriority = 'Low' | 'Medium' | 'High' | 'Important';
type ScheduleCategory =
  | 'Study'
  | 'College'
  | 'Work'
  | 'Project'
  | 'Business'
  | 'Personal'
  | 'Exercise'
  | 'Other';
type ProjectStatus = 'Idea' | 'Planning' | 'Active' | 'Completed' | 'Paused';
type IdeaStatus = 'Idea' | 'Researching' | 'Planning' | 'Testing' | 'Active' | 'Successful' | 'Failed' | 'Archived';

type RangeKey = 'Today' | 'Tomorrow' | 'Week' | 'Month';

type ActionType =
  | 'Task'
  | 'Schedule'
  | 'Note'
  | 'Expense'
  | 'Income'
  | 'Project'
  | 'Business Idea'
  | 'Plan'
  | 'Photo'
  | 'Video'
  | 'Document'
  | 'Goal';

interface Profile {
  name: string;
  bio: string;
  status: string;
  goals: string[];
  quote: string;
  photo: string;
}

interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: TaskPriority;
  category: string;
  status: TaskStatus;
  progress: number;
  notes: string;
  tags: string[];
}

interface ScheduleItem {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: ScheduleCategory;
  priority: 'Low' | 'Medium' | 'High' | 'Important';
  notes: string;
  reminder: string;
  completed: boolean;
  recurring: 'None' | 'Daily' | 'Weekly' | 'Monthly';
}

interface ProjectItem {
  id: number;
  name: string;
  description: string;
  startDate: string;
  targetDate: string;
  status: ProjectStatus;
  progress: number;
  technologies: string[];
  goals: string[];
  tasks: string[];
  notes: string;
  photos: string[];
  links: string[];
  achievements: string[];
}

interface BusinessIdea {
  id: number;
  name: string;
  description: string;
  problem: string;
  solution: string;
  targetCustomers: string;
  market: string;
  businessModel: string;
  resources: string;
  startupCost: number;
  expectedRevenue: number;
  expectedProfit: number;
  marketingStrategy: string;
  competitors: string;
  advantages: string;
  risks: string;
  nextSteps: string;
  status: IdeaStatus;
  opportunityScore: number;
}

interface BusinessPlan {
  id: number;
  name: string;
  vision: string;
  mission: string;
  problem: string;
  solution: string;
  targetAudience: string;
  pricing: string;
  investment: number;
  revenueForecast: number;
  expenseForecast: number;
  profitForecast: number;
  status: string;
}

interface ExpenseItem {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
  paymentMethod: string;
  notes: string;
}

interface IncomeItem {
  id: number;
  source: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  notes: string;
}

interface GoalItem {
  id: number;
  title: string;
  description: string;
  type: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'On Track' | 'Behind' | 'Completed' | 'At Risk';
}

interface PlanItem {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Draft' | 'Active' | 'Done';
  actionSteps: string[];
  pinned: boolean;
}

interface NoteItem {
  id: number;
  title: string;
  content: string;
  tags: string[];
  category: string;
  pinned: boolean;
  archived: boolean;
}

interface PhotoItem {
  id: number;
  title: string;
  album: string;
  date: string;
  description: string;
  tags: string[];
  location?: string;
  url: string;
  important: boolean;
}

interface VideoItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  album: string;
  tags: string[];
  url: string;
  important: boolean;
}

interface DocumentItem {
  id: number;
  name: string;
  category: string;
  description: string;
  date: string;
  tags: string[];
  important: boolean;
  url?: string;
}

interface AchievementItem {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  relatedProject: string;
  notes: string;
}

interface JournalEntry {
  id: number;
  date: string;
  title: string;
  whatIDid: string;
  whatILearned: string;
  whatWentWell: string;
  needImprove: string;
  tomorrowPlan: string;
  mood: string;
}

interface ReminderItem {
  id: number;
  title: string;
  time: string;
  type: 'Task' | 'Deadline' | 'Goal' | 'Project';
}

const navItems: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'tasks', label: 'Tasks', icon: ClipboardList },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'business-ideas', label: 'Business Ideas', icon: Lightbulb },
  { id: 'business-plans', label: 'Business Plans', icon: Briefcase },
  { id: 'expenses', label: 'Expenses', icon: Wallet },
  { id: 'income', label: 'Income', icon: CircleDollarSign },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'plans', label: 'Important Plans', icon: Star },
  { id: 'notes', label: 'Notes', icon: NotebookPen },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Paintbrush2 },
];

const initialProfile: Profile = {
  name: 'Afnan Rahman',
  bio: 'Product-minded builder, lifelong learner, and founder in the making.',
  status: 'Focused on building systems that turn ideas into momentum.',
  goals: ['AI/ML Engineer Path', 'Launch digital product', 'Grow business income'],
  quote: 'Success is built one well-planned day at a time.',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
};

const initialTasks: TaskItem[] = [
  {
    id: 1,
    title: 'Finalize portfolio landing page',
    description: 'Polish case studies and CTA flow for the new portfolio.',
    dueDate: '2026-09-14',
    dueTime: '15:00',
    priority: 'High',
    category: 'Work',
    status: 'In Progress',
    progress: 72,
    notes: 'Need final review from mentor.',
    tags: ['Portfolio', 'UI'],
  },
  {
    id: 2,
    title: 'Prepare ML model notes',
    description: 'Summarize model deployment notes and experiment results.',
    dueDate: '2026-09-13',
    dueTime: '18:30',
    priority: 'Important',
    category: 'Study',
    status: 'Not Started',
    progress: 20,
    notes: 'Use notebook and references.',
    tags: ['AI', 'Study'],
  },
  {
    id: 3,
    title: 'Review business plan pitch',
    description: 'Update pitch deck and revenue assumptions.',
    dueDate: '2026-09-15',
    dueTime: '10:00',
    priority: 'Medium',
    category: 'Business',
    status: 'Completed',
    progress: 100,
    notes: 'Reviewed with co-founder.',
    tags: ['Business', 'Pitch'],
  },
];

const initialSchedules: ScheduleItem[] = [
  {
    id: 1,
    title: 'Deep work session',
    date: '2026-09-13',
    startTime: '09:00',
    endTime: '11:30',
    category: 'Work',
    priority: 'Important',
    notes: 'Focus on dashboard development sprint.',
    reminder: '15 min before',
    completed: false,
    recurring: 'Weekly',
  },
  {
    id: 2,
    title: 'College lecture',
    date: '2026-09-13',
    startTime: '13:00',
    endTime: '14:30',
    category: 'College',
    priority: 'High',
    notes: 'Attend data structures lecture.',
    reminder: 'At time',
    completed: false,
    recurring: 'Weekly',
  },
  {
    id: 3,
    title: 'Gym workout',
    date: '2026-09-14',
    startTime: '18:00',
    endTime: '19:00',
    category: 'Exercise',
    priority: 'Medium',
    notes: 'Strength routine and stretching.',
    reminder: '30 min before',
    completed: false,
    recurring: 'Daily',
  },
];

const initialProjects: ProjectItem[] = [
  {
    id: 1,
    name: 'Life & Business Hub',
    description: 'A comprehensive personal dashboard for productivity, finance, and business systems.',
    startDate: '2026-08-01',
    targetDate: '2026-09-20',
    status: 'Active',
    progress: 78,
    technologies: ['React', 'TypeScript', 'Tailwind'],
    goals: ['Launch MVP', 'Track monthly goals', 'Build complete dashboard'],
    tasks: ['Build dashboard', 'Add AI assistant', 'Create analytics'],
    notes: 'Strong momentum and clean UI.',
    photos: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'],
    links: ['https://example.com'],
    achievements: ['Prototype complete'],
  },
  {
    id: 2,
    name: 'AI Course Tracker',
    description: 'Track courses, assignments, and learning milestones for my AI/ML roadmap.',
    startDate: '2026-07-12',
    targetDate: '2026-11-30',
    status: 'Planning',
    progress: 42,
    technologies: ['Python', 'Notion', 'Analytics'],
    goals: ['Finish roadmap', 'Track projects', 'Practice weekly'],
    tasks: ['List courses', 'Set milestones', 'Track reviews'],
    notes: 'Need to align with career goals.',
    photos: [],
    links: [],
    achievements: ['Roadmap created'],
  },
];

const initialIdeas: BusinessIdea[] = [
  {
    id: 1,
    name: 'StudyBuddy AI',
    description: 'AI learning buddy for students to create study plans and exam prep.',
    problem: 'Students struggle with unmanaged revision and weak personal planning.',
    solution: 'Adaptive weekly study planner with flashcards and performance insights.',
    targetCustomers: 'College and university students',
    market: 'Education tech',
    businessModel: 'Subscription + institutional licensing',
    resources: 'AI model, backend, app design, content team',
    startupCost: 1800,
    expectedRevenue: 8500,
    expectedProfit: 5200,
    marketingStrategy: 'Content marketing, campus partnerships, launch on social media',
    competitors: 'Quizlet, Notion AI, study planning apps',
    advantages: 'Warm, practical product built around student routines',
    risks: 'Acquisition cost and feature overload',
    nextSteps: 'Validate with 20 student interviews and MVP demo',
    status: 'Researching',
    opportunityScore: 8,
  },
  {
    id: 2,
    name: 'Freelance Ops OS',
    description: 'A lightweight operating system for freelancers to manage clients, work, and revenue.',
    problem: 'Freelancers lose time juggling projects and payments.',
    solution: 'Dashboard for tasks, finances, proposals, and client communication.',
    targetCustomers: 'Freelancers and small agencies',
    market: 'Productivity SaaS',
    businessModel: 'Monthly SaaS subscription',
    resources: 'Frontend, backend, CRM logic, marketing',
    startupCost: 2200,
    expectedRevenue: 12000,
    expectedProfit: 7400,
    marketingStrategy: 'SEO, creator partnerships, GitHub showcase',
    competitors: 'Notion templates, Trello, agency tools',
    advantages: 'Simplified niche workflow and strong personalization',
    risks: 'Low entry barrier',
    nextSteps: 'Create landing page and test conversion funnel',
    status: 'Planning',
    opportunityScore: 7,
  },
];

const initialBusinessPlans: BusinessPlan[] = [
  {
    id: 1,
    name: 'Growth Studio',
    vision: 'Become the go-to modern studio for digital systems and productivity design.',
    mission: 'Help founders and individuals build simpler, smarter workflows.',
    problem: 'People keep losing momentum from scattered tools and unstructured planning.',
    solution: 'Bundle planning, dashboards, and optimization support into a practical service model.',
    targetAudience: 'Professionals, founders, and creators',
    pricing: '$300-$1200 per package',
    investment: 4000,
    revenueForecast: 16000,
    expenseForecast: 6500,
    profitForecast: 9500,
    status: 'Active',
  },
];

const initialExpenses: ExpenseItem[] = [
  { id: 1, amount: 32.5, date: '2026-09-13', category: 'Food', description: 'Lunch and coffee', paymentMethod: 'Cash', notes: 'Workday meal' },
  { id: 2, amount: 80, date: '2026-09-12', category: 'Education', description: 'AI course subscription', paymentMethod: 'Card', notes: 'Monthly learning' },
  { id: 3, amount: 150, date: '2026-09-09', category: 'Technology', description: 'Cloud hosting', paymentMethod: 'Card', notes: 'Product tools' },
  { id: 4, amount: 60, date: '2026-09-06', category: 'Travel', description: 'Ride to meetup', paymentMethod: 'Cash', notes: 'Transit' },
];

const initialIncome: IncomeItem[] = [
  { id: 1, source: 'Freelancing', amount: 450, date: '2026-09-08', category: 'Business', description: 'Landing page design', notes: 'Paid upfront' },
  { id: 2, source: 'Business', amount: 620, date: '2026-09-04', category: 'Business', description: 'Consulting project', notes: 'Monthly plan' },
  { id: 3, source: 'YouTube', amount: 110, date: '2026-09-01', category: 'Content', description: 'Ad revenue', notes: 'Monetized channel' },
];

const initialGoals: GoalItem[] = [
  {
    id: 1,
    title: 'AI/ML Engineer Path',
    description: 'Build strong fundamentals and portfolio-ready projects.',
    type: 'Career',
    startDate: '2026-07-01',
    targetDate: '2026-12-31',
    progress: 80,
    status: 'On Track',
  },
  {
    id: 2,
    title: 'Launch my digital product',
    description: 'Create and release a focused SaaS or workflow product.',
    type: 'Business',
    startDate: '2026-08-15',
    targetDate: '2026-10-15',
    progress: 55,
    status: 'Behind',
  },
];

const initialPinnedPlans: PlanItem[] = [
  {
    id: 1,
    title: 'Career transition strategy',
    description: 'Refine portfolio, networking, and learning roadmap for the next quarter.',
    date: '2026-09-20',
    priority: 'High',
    status: 'Active',
    actionSteps: ['Update resume', 'Identify 3 portfolio projects', 'Reach out to 10 mentors'],
    pinned: true,
  },
  {
    id: 2,
    title: 'Business validation sprint',
    description: 'Test product assumptions and pricing with early customer interviews.',
    date: '2026-09-25',
    priority: 'Critical',
    status: 'Draft',
    actionSteps: ['Interview 10 students', 'Track demand', 'Prepare landing page'],
    pinned: true,
  },
];

const initialNotes: NoteItem[] = [
  {
    id: 1,
    title: 'Morning focus rules',
    content: 'Use first 2 hours for deep work. Keep phone out of reach. Review momentum at lunch.',
    tags: ['Focus', 'Habits'],
    category: 'Personal',
    pinned: true,
    archived: false,
  },
  {
    id: 2,
    title: 'Idea: digital planner',
    content: 'Could build a minimalist planner with habit tracking, weekly analysis, and auto-summarized journal prompts.',
    tags: ['Product', 'Idea'],
    category: 'Business',
    pinned: false,
    archived: false,
  },
];

const initialPhotos: PhotoItem[] = [
  {
    id: 1,
    title: 'Launch day',
    album: 'Projects',
    date: '2026-08-17',
    description: 'The first dashboard prototype was deployed.',
    tags: ['Launch', 'Dashboard'],
    location: 'Dhaka',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    important: true,
  },
  {
    id: 2,
    title: 'Study setup',
    album: 'College',
    date: '2026-09-02',
    description: 'Focused workspace for machine learning study blocks.',
    tags: ['Study', 'Workspace'],
    location: 'Home',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    important: false,
  },
];

const initialVideos: VideoItem[] = [
  {
    id: 1,
    title: 'Project walkthrough',
    description: 'Experience the product demo and feature flow overview.',
    date: '2026-08-20',
    category: 'Projects',
    album: 'Projects',
    tags: ['Demo', 'Product'],
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    important: true,
  },
];

const initialDocuments: DocumentItem[] = [
  { id: 1, name: 'Business proposal.pdf', category: 'Business', description: 'Client pitch deck package', date: '2026-09-08', tags: ['Pitch', 'Startup'], important: true },
  { id: 2, name: 'AI course roadmap.docx', category: 'Education', description: 'Career learning roadmap for ML track', date: '2026-08-28', tags: ['AI', 'Roadmap'], important: false },
];

const initialAchievements: AchievementItem[] = [
  {
    id: 1,
    title: 'Completed ML project',
    date: '2026-09-10',
    description: 'Built a complete ML experiment workflow and deployed a small solution.',
    category: 'Project',
    relatedProject: 'Life & Business Hub',
    notes: 'Excellent learning cycle.',
  },
  {
    id: 2,
    title: 'Built personal dashboard',
    date: '2026-09-13',
    description: 'Created a structured productivity system to centralize work, life, and business tasks.',
    category: 'Achievement',
    relatedProject: 'Life & Business Hub',
    notes: 'This is now my daily operating system.',
  },
];

const initialJournal: JournalEntry[] = [
  {
    id: 1,
    date: '2026-09-12',
    title: 'A focused and productive day',
    whatIDid: 'Worked on the dashboard, aligned goals, and reviewed a business idea.',
    whatILearned: 'Clearer design without overbuilding is a huge advantage.',
    whatWentWell: 'I stayed deep-focused for the majority of the day.',
    needImprove: 'Reduce idle task switching during the evening.',
    tomorrowPlan: 'Finalize portfolio sections and prepare two study blocks.',
    mood: 'Motivated',
  },
];

const initialReminders: ReminderItem[] = [
  { id: 1, title: 'Submit portfolio draft', time: 'Today, 8:00 PM', type: 'Deadline' },
  { id: 2, title: 'Review AI learning goals', time: 'Tomorrow, 10:00 AM', type: 'Goal' },
  { id: 3, title: 'Project sync call', time: 'Thu, 5:00 PM', type: 'Project' },
];

const productivityData = [
  { day: 'Mon', value: 78 },
  { day: 'Tue', value: 82 },
  { day: 'Wed', value: 69 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 86 },
  { day: 'Sat', value: 74 },
  { day: 'Sun', value: 88 },
];

const expenseChartData = [
  { month: 'Jan', value: 320 },
  { month: 'Feb', value: 280 },
  { month: 'Mar', value: 420 },
  { month: 'Apr', value: 360 },
  { month: 'May', value: 450 },
  { month: 'Jun', value: 480 },
  { month: 'Jul', value: 390 },
];

const profitChartData = [
  { month: 'Jan', income: 900, expense: 420 },
  { month: 'Feb', income: 980, expense: 380 },
  { month: 'Mar', income: 1100, expense: 450 },
  { month: 'Apr', income: 1200, expense: 500 },
  { month: 'May', income: 1320, expense: 550 },
  { month: 'Jun', income: 1450, expense: 620 },
];

const projectProgressData = [
  { name: 'Life Hub', value: 78 },
  { name: 'AI Path', value: 64 },
  { name: 'Growth Studio', value: 52 },
  { name: 'StudyBuddy', value: 36 },
];

const spendingByCategory = [
  { name: 'Food', value: 120 },
  { name: 'Travel', value: 90 },
  { name: 'Education', value: 180 },
  { name: 'Tech', value: 240 },
  { name: 'Bills', value: 150 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const formatPercent = (value: number) => `${value}%`;

const readStorageValue = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
};

const saveStorageValue = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getPriorityTone = (priority: string) => {
  switch (priority) {
    case 'Important':
    case 'High':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300';
    case 'Medium':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300';
    case 'Low':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200';
  }
};

const getStatusTone = (status: string) => {
  if (status === 'Completed' || status === 'Successful') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300';
  if (status === 'In Progress' || status === 'Active' || status === 'On Track') return 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300';
  if (status === 'Behind' || status === 'Planning' || status === 'Researching') return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300';
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200';
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('life-hub-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');
  const [authenticated, setAuthenticated] = useState<boolean>(() => readStorageValue('life-hub-auth', false));
  const [authForm, setAuthForm] = useState({ email: 'demo@hub.com', password: 'demo123' });
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState<TaskItem[]>(() => readStorageValue('life-hub-tasks', initialTasks));
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => readStorageValue('life-hub-schedules', initialSchedules));
  const [projects, setProjects] = useState<ProjectItem[]>(() => readStorageValue('life-hub-projects', initialProjects));
  const [ideas, setIdeas] = useState<BusinessIdea[]>(() => readStorageValue('life-hub-ideas', initialIdeas));
  const [plansData, setPlansData] = useState<BusinessPlan[]>(() => readStorageValue('life-hub-business-plans', initialBusinessPlans));
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => readStorageValue('life-hub-expenses', initialExpenses));
  const [income, setIncome] = useState<IncomeItem[]>(() => readStorageValue('life-hub-income', initialIncome));
  const [goals, setGoals] = useState<GoalItem[]>(() => readStorageValue('life-hub-goals', initialGoals));
  const [importantPlans, setImportantPlans] = useState<PlanItem[]>(() => readStorageValue('life-hub-important-plans', initialPinnedPlans));
  const [notes, setNotes] = useState<NoteItem[]>(() => readStorageValue('life-hub-notes', initialNotes));
  const [photos, setPhotos] = useState<PhotoItem[]>(() => readStorageValue('life-hub-photos', initialPhotos));
  const [videos, setVideos] = useState<VideoItem[]>(() => readStorageValue('life-hub-videos', initialVideos));
  const [documents, setDocuments] = useState<DocumentItem[]>(() => readStorageValue('life-hub-documents', initialDocuments));
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => readStorageValue('life-hub-achievements', initialAchievements));
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => readStorageValue('life-hub-journal', initialJournal));
  const [reminders, setReminders] = useState<ReminderItem[]>(() => readStorageValue('life-hub-reminders', initialReminders));
  const [quickAddType, setQuickAddType] = useState<ActionType | null>(null);
  const [profile] = useState<Profile>(initialProfile);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('life-hub-theme', theme);
  }, [theme]);

  useEffect(() => {
    saveStorageValue('life-hub-auth', authenticated);
  }, [authenticated]);

  useEffect(() => saveStorageValue('life-hub-tasks', tasks), [tasks]);
  useEffect(() => saveStorageValue('life-hub-schedules', schedules), [schedules]);
  useEffect(() => saveStorageValue('life-hub-projects', projects), [projects]);
  useEffect(() => saveStorageValue('life-hub-ideas', ideas), [ideas]);
  useEffect(() => saveStorageValue('life-hub-business-plans', plansData), [plansData]);
  useEffect(() => saveStorageValue('life-hub-expenses', expenses), [expenses]);
  useEffect(() => saveStorageValue('life-hub-income', income), [income]);
  useEffect(() => saveStorageValue('life-hub-goals', goals), [goals]);
  useEffect(() => saveStorageValue('life-hub-important-plans', importantPlans), [importantPlans]);
  useEffect(() => saveStorageValue('life-hub-notes', notes), [notes]);
  useEffect(() => saveStorageValue('life-hub-photos', photos), [photos]);
  useEffect(() => saveStorageValue('life-hub-videos', videos), [videos]);
  useEffect(() => saveStorageValue('life-hub-documents', documents), [documents]);
  useEffect(() => saveStorageValue('life-hub-achievements', achievements), [achievements]);
  useEffect(() => saveStorageValue('life-hub-journal', journalEntries), [journalEntries]);
  useEffect(() => saveStorageValue('life-hub-reminders', reminders), [reminders]);

  const totalIncome = useMemo(
    () => income.reduce((sum, item) => sum + item.amount, 0),
    [income],
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses],
  );

  const totalProfit = totalIncome - totalExpenses;

  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.filter((task) => task.status !== 'Completed').length;
  const monthlyProgress = Math.round((completedTasks / Math.max(tasks.length, 1)) * 100);

  const todaySchedule = schedules.filter((entry) => entry.date === '2026-09-13').length;
  const activeProjects = projects.filter((project) => project.status === 'Active' || project.status === 'Planning').length;

  const monthlyCategories = useMemo(() => {
    const byCategory = new Map<string, number>();
    expenses.forEach((expense) => {
      byCategory.set(expense.category, (byCategory.get(expense.category) ?? 0) + expense.amount);
    });
    return [...byCategory.entries()].map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const filteredResults = useMemo(() => {
    const allItems = [
      ...tasks.map((item) => ({ type: 'Task', title: item.title, description: item.description })),
      ...schedules.map((item) => ({ type: 'Schedule', title: item.title, description: item.notes })),
      ...projects.map((item) => ({ type: 'Project', title: item.name, description: item.description })),
      ...ideas.map((item) => ({ type: 'Business Idea', title: item.name, description: item.description })),
      ...plansData.map((item) => ({ type: 'Business Plan', title: item.name, description: item.mission })),
      ...notes.map((item) => ({ type: 'Note', title: item.title, description: item.content })),
      ...goals.map((item) => ({ type: 'Goal', title: item.title, description: item.description })),
    ];

    if (!searchTerm.trim()) return allItems;

    return allItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, tasks, schedules, projects, ideas, plansData, notes, goals]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (authForm.email && authForm.password) {
      setAuthenticated(true);
    }
  };

  const addQuickItem = (type: ActionType) => {
    setQuickAddType(type);
  };

  const handleQuickAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!quickAddType) return;

    const form = new FormData(event.target as HTMLFormElement);
    const title = String(form.get('title') || '');

    switch (quickAddType) {
      case 'Task': {
        const newTask: TaskItem = {
          id: Date.now(),
          title,
          description: String(form.get('description') || 'New task'),
          dueDate: String(form.get('dueDate') || '2026-09-15'),
          dueTime: String(form.get('dueTime') || '09:00'),
          priority: (String(form.get('priority') || 'Medium') as TaskPriority),
          category: String(form.get('category') || 'Work'),
          status: 'Not Started',
          progress: 0,
          notes: '',
          tags: [String(form.get('category') || 'Work')],
        };
        setTasks((current) => [newTask, ...current]);
        break;
      }
      case 'Schedule': {
        const newSchedule: ScheduleItem = {
          id: Date.now(),
          title,
          date: String(form.get('date') || '2026-09-15'),
          startTime: String(form.get('startTime') || '09:00'),
          endTime: String(form.get('endTime') || '10:00'),
          category: (String(form.get('category') || 'Work') as ScheduleCategory),
          priority: (String(form.get('priority') || 'Medium') as 'Low' | 'Medium' | 'High' | 'Important'),
          notes: String(form.get('notes') || 'New schedule'),
          reminder: String(form.get('reminder') || '15 min before'),
          completed: false,
          recurring: 'None',
        };
        setSchedules((current) => [newSchedule, ...current]);
        break;
      }
      case 'Note': {
        const newNote: NoteItem = {
          id: Date.now(),
          title,
          content: String(form.get('content') || 'New note'),
          category: String(form.get('category') || 'Personal'),
          tags: ['Quick note'],
          pinned: false,
          archived: false,
        };
        setNotes((current) => [newNote, ...current]);
        break;
      }
      case 'Expense': {
        const newExpense: ExpenseItem = {
          id: Date.now(),
          amount: Number(form.get('amount') || 0),
          date: String(form.get('date') || '2026-09-13'),
          category: String(form.get('category') || 'Food'),
          description: String(form.get('description') || title),
          paymentMethod: String(form.get('paymentMethod') || 'Card'),
          notes: String(form.get('notes') || ''),
        };
        setExpenses((current) => [newExpense, ...current]);
        break;
      }
      case 'Income': {
        const newIncome: IncomeItem = {
          id: Date.now(),
          source: String(form.get('source') || 'Freelancing'),
          amount: Number(form.get('amount') || 0),
          date: String(form.get('date') || '2026-09-13'),
          category: String(form.get('category') || 'Business'),
          description: String(form.get('description') || title),
          notes: String(form.get('notes') || ''),
        };
        setIncome((current) => [newIncome, ...current]);
        break;
      }
      case 'Project': {
        const newProject: ProjectItem = {
          id: Date.now(),
          name: title,
          description: String(form.get('description') || 'New project'),
          startDate: String(form.get('startDate') || '2026-09-13'),
          targetDate: String(form.get('targetDate') || '2026-10-15'),
          status: 'Idea',
          progress: 10,
          technologies: ['New'],
          goals: ['Define scope'],
          tasks: ['Set milestones'],
          notes: 'Created from quick add',
          photos: [],
          links: [],
          achievements: [],
        };
        setProjects((current) => [newProject, ...current]);
        break;
      }
      case 'Business Idea': {
        const newIdea = {
          id: Date.now(),
          name: title,
          description: String(form.get('description') || 'New business idea'),
          problem: 'Problem to solve',
          solution: 'Solution concept',
          targetCustomers: 'Target users',
          market: 'Niche market',
          businessModel: 'Subscription or consulting',
          resources: 'Time, skills, product',
          startupCost: 1500,
          expectedRevenue: 4000,
          expectedProfit: 2500,
          marketingStrategy: 'Organic outreach',
          competitors: 'Direct competitors',
          advantages: 'Clear differentiation',
          risks: 'Validation risk',
          nextSteps: 'Run customer interviews',
          status: 'Idea',
          opportunityScore: 6,
        } satisfies BusinessIdea;
        setIdeas((current) => [newIdea, ...current]);
        break;
      }
      case 'Photo': {
        const newPhoto: PhotoItem = {
          id: Date.now(),
          title,
          album: 'Memories',
          date: String(form.get('date') || '2026-09-13'),
          description: String(form.get('description') || 'New personal memory'),
          tags: ['Quick add'],
          location: 'Private archive',
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
          important: false,
        };
        setPhotos((current) => [newPhoto, ...current]);
        break;
      }
      case 'Video': {
        const newVideo: VideoItem = {
          id: Date.now(),
          title,
          description: String(form.get('description') || 'New video memory'),
          date: String(form.get('date') || '2026-09-13'),
          category: 'Personal',
          album: 'Memories',
          tags: ['Quick add'],
          url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          important: false,
        };
        setVideos((current) => [newVideo, ...current]);
        break;
      }
      case 'Document': {
        const newDocument: DocumentItem = {
          id: Date.now(),
          name: title,
          category: 'Personal',
          description: String(form.get('description') || 'New document saved privately'),
          date: String(form.get('date') || '2026-09-13'),
          tags: ['Quick add'],
          important: false,
          url: '#',
        };
        setDocuments((current) => [newDocument, ...current]);
        break;
      }
      case 'Plan': {
        const newPlan: PlanItem = {
          id: Date.now(),
          title,
          description: String(form.get('description') || 'New plan'),
          date: String(form.get('date') || '2026-09-15'),
          priority: (String(form.get('priority') || 'Medium') as PlanItem['priority']),
          status: 'Draft',
          actionSteps: ['Define next milestone'],
          pinned: false,
        };
        setImportantPlans((current) => [newPlan, ...current]);
        break;
      }
      case 'Goal': {
        const newGoal: GoalItem = {
          id: Date.now(),
          title,
          description: String(form.get('description') || 'New goal'),
          type: String(form.get('type') || 'Personal'),
          startDate: String(form.get('startDate') || '2026-09-13'),
          targetDate: String(form.get('targetDate') || '2026-12-31'),
          progress: 15,
          status: 'On Track',
        };
        setGoals((current) => [newGoal, ...current]);
        break;
      }
      default:
        break;
    }

    setQuickAddType(null);
  };

  const quickAddForm = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="panel w-full max-w-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Add: {quickAddType}</h3>
          <button className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setQuickAddType(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleQuickAdd} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input name="title" className="input" placeholder={`${quickAddType} title`} required />
          </div>

          {quickAddType === 'Task' && (
            <>
              <div>
                <label className="label">Description</label>
                <textarea name="description" className="input min-h-[90px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Due date</label>
                  <input type="date" name="dueDate" className="input" defaultValue="2026-09-15" />
                </div>
                <div>
                  <label className="label">Due time</label>
                  <input type="time" name="dueTime" className="input" defaultValue="09:00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Priority</label>
                  <select name="priority" className="input">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Important</option>
                  </select>
                </div>
                <div>
                  <label className="label">Category</label>
                  <select name="category" className="input">
                    <option>Work</option>
                    <option>Study</option>
                    <option>Business</option>
                    <option>Personal</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {quickAddType === 'Schedule' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Date</label>
                  <input type="date" name="date" className="input" defaultValue="2026-09-15" />
                </div>
                <div>
                  <label className="label">Reminder</label>
                  <select name="reminder" className="input">
                    <option>15 min before</option>
                    <option>30 min before</option>
                    <option>At time</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Start</label>
                  <input type="time" name="startTime" className="input" defaultValue="09:00" />
                </div>
                <div>
                  <label className="label">End</label>
                  <input type="time" name="endTime" className="input" defaultValue="10:00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select name="category" className="input">
                    <option>Work</option>
                    <option>Study</option>
                    <option>College</option>
                    <option>Project</option>
                    <option>Business</option>
                    <option>Personal</option>
                    <option>Exercise</option>
                  </select>
                </div>
                <div>
                  <label className="label">Priority</label>
                  <select name="priority" className="input">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Important</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Notes</label>
                <textarea name="notes" className="input min-h-[90px]" />
              </div>
            </>
          )}

          {quickAddType === 'Note' && (
            <div>
              <label className="label">Content</label>
              <textarea name="content" className="input min-h-[120px]" placeholder="Write your note here..." />
            </div>
          )}

          {(quickAddType === 'Expense' || quickAddType === 'Income') && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Amount</label>
                  <input type="number" name="amount" className="input" step="0.01" defaultValue="0" />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input type="date" name="date" className="input" defaultValue="2026-09-13" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select name="category" className="input">
                    {quickAddType === 'Expense' ? (
                      <>
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Technology</option>
                        <option>Shopping</option>
                        <option>Bills</option>
                        <option>Business</option>
                        <option>Entertainment</option>
                        <option>Other</option>
                      </>
                    ) : (
                      <>
                        <option>Freelancing</option>
                        <option>Business</option>
                        <option>YouTube</option>
                        <option>Internship</option>
                        <option>Projects</option>
                        <option>Other</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="label">Method</label>
                  <select name="paymentMethod" className="input">
                    <option>Card</option>
                    <option>Cash</option>
                    <option>Bank</option>
                    <option>Wallet</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <input name="description" className="input" placeholder="Short description" />
              </div>
            </>
          )}

          {(quickAddType === 'Project' || quickAddType === 'Goal') && (
            <>
              <div>
                <label className="label">Description</label>
                <textarea name="description" className="input min-h-[90px]" />
              </div>
              {quickAddType === 'Goal' && (
                <div>
                  <label className="label">Type</label>
                  <select name="type" className="input">
                    <option>Short-term</option>
                    <option>Long-term</option>
                    <option>Study</option>
                    <option>Career</option>
                    <option>Project</option>
                    <option>Business</option>
                    <option>Financial</option>
                    <option>Personal</option>
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Start</label>
                  <input type="date" name="startDate" className="input" defaultValue="2026-09-13" />
                </div>
                <div>
                  <label className="label">Target</label>
                  <input type="date" name="targetDate" className="input" defaultValue="2026-12-31" />
                </div>
              </div>
            </>
          )}

          {quickAddType === 'Plan' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Date</label>
                <input type="date" name="date" className="input" defaultValue="2026-09-15" />
              </div>
              <div>
                <label className="label">Priority</label>
                <select name="priority" className="input">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200" onClick={() => setQuickAddType(null)}>
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-50">
        {!authenticated ? (
          <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#dbeafe,#f8fafc_35%,#e2e8f0)] p-4 dark:bg-[radial-gradient(circle_at_top,#0f172a,#020817_40%,#0f172a)]">
            <div className="panel w-full max-w-md p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">Private Dashboard</p>
                  <h1 className="text-2xl font-bold">My Life & Business Hub</h1>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    className="input"
                    type="email"
                    value={authForm.email}
                    onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input
                    className="input"
                    type="password"
                    value={authForm.password}
                    onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                  />
                </div>

                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 font-medium text-white shadow-sm hover:bg-primary-500">
                  <LogIn className="h-4 w-4" />
                  Sign in securely
                </button>
              </form>

              <div className="mt-6 rounded-2xl bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Demo access: demo@hub.com / demo123
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1600px] gap-5 p-3 md:p-6">
            <aside className="hidden w-72 shrink-0 flex-col rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75 xl:flex">
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-sky-500 p-3 text-white shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">Private</p>
                  <h1 className="text-lg font-bold">My Life Hub</h1>
                </div>
              </div>

              <nav className="space-y-1.5">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      activeSection === id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Important</p>
                  <Star className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-3 space-y-2">
                  {importantPlans.slice(0, 2).map((plan) => (
                    <div key={plan.id} className="rounded-xl bg-white p-2 dark:bg-slate-900">
                      <p className="text-sm font-medium">{plan.title}</p>
                      <p className="text-xs text-slate-500">{plan.priority}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <main className="flex-1 rounded-3xl border border-slate-200 bg-white/70 p-3 shadow-soft backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75 md:p-5">
              <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/70 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <img src={profile.photo} alt={profile.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">Profile</p>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{profile.name}</h2>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-3">
                  <div className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 md:flex">
                    <Search className="h-4 w-4" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                      placeholder="Search tasks, notes, projects, plans..."
                    />
                  </div>

                  <button
                    onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                    className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>

                  <button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <Bell className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setAuthenticated(false)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <span className="hidden md:inline">Logout</span>
                    <LogOut className="h-4 w-4 md:hidden" />
                  </button>
                </div>
              </header>

              <div className="mb-6 grid gap-3 md:grid-cols-3">
                <div className="panel p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{profile.status}</p>
                </div>
                <div className="panel p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current goals</p>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{profile.goals[0]}</p>
                </div>
                <div className="panel p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quote</p>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">“{profile.quote}”</p>
                </div>
              </div>

              {searchTerm && (
                <div className="mb-6 rounded-2xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-500/10">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">Global search</p>
                    <span className="chip">{filteredResults.length} matches</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {filteredResults.slice(0, 6).map((item, index) => (
                      <div key={`${item.type}-${index}`} className="rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-900">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
                        <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
                        <p className="mt-1 line-clamp-2 text-slate-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary-600">Overview</p>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h3>
                    </div>
                    <button
                      onClick={() => setQuickAddType('Task')}
                      className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                    >
                      <Plus className="h-4 w-4" />
                      Quick Add
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Today's Schedule" value={todaySchedule.toString()} accent="sky" />
                    <StatCard icon={<ClipboardList className="h-5 w-5" />} label="Today's Tasks" value={tasks.length.toString()} accent="violet" />
                    <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Completed Tasks" value={completedTasks.toString()} accent="emerald" />
                    <StatCard icon={<FolderKanban className="h-5 w-5" />} label="Active Projects" value={activeProjects.toString()} accent="amber" />
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
                    <div className="panel p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Today's Progress</h4>
                        <span className="chip">{monthlyProgress}%</span>
                      </div>
                      <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500" style={{ width: `${monthlyProgress}%` }} />
                      </div>
                      <div className="grid gap-3 md:grid-cols-3">
                        <InfoPill label="Pending" value={pendingTasks.toString()} />
                        <InfoPill label="Monthly income" value={formatCurrency(totalIncome)} />
                        <InfoPill label="Current profit" value={formatCurrency(totalProfit)} />
                      </div>
                    </div>

                    <div className="panel p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quick Add</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {[
                          'Task', 'Schedule', 'Note', 'Expense', 'Income', 'Project', 'Business Idea', 'Plan', 'Photo', 'Video', 'Document', 'Goal',
                        ].map((type) => (
                          <button
                            key={type}
                            onClick={() => addQuickItem(type as ActionType)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-medium text-slate-700 hover:border-primary-300 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:bg-primary-500/10"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Weekly productivity</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={productivityData}>
                            <defs>
                              <linearGradient id="prodFill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#2fa3ff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2fa3ff" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#2fa3ff" fill="url(#prodFill)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Monthly expenses</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={expenseChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Income vs expenses</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={profitChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} />
                            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Project progress</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={projectProgressData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                              {projectProgressData.map((entry, index) => (
                                <Cell key={`${entry.name}-${index}`} fill={['#2fa3ff', '#34d399', '#fbbf24', '#a78bfa'][index % 4]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <MiniSummaryCard title="Monthly Expenses" value={formatCurrency(totalExpenses)} details="Current cycle spending" />
                    <MiniSummaryCard title="Monthly Income" value={formatCurrency(totalIncome)} details="Revenue from all channels" />
                    <MiniSummaryCard title="Current Profit" value={formatCurrency(totalProfit)} details="Net performance" />
                  </div>
                </div>
              )}

              {activeSection === 'schedule' && (
                <SectionShell title="Daily Schedule" subtitle="Calendar and timeline view">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(['Today', 'Tomorrow', 'Week', 'Month'] as RangeKey[]).map((range) => (
                      <button key={range} className="chip hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-500/10 dark:hover:text-primary-300">
                        {range}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {schedules.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</p>
                            <p className="text-sm text-slate-500">{item.date} • {item.startTime} - {item.endTime}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={getStatusTone(item.completed ? 'Completed' : 'In Progress')}>{item.completed ? 'Completed' : 'Scheduled'}</span>
                            <span className={getPriorityTone(item.priority)}>{item.priority}</span>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 md:grid-cols-3">
                          <InfoPill label="Category" value={item.category} />
                          <InfoPill label="Reminder" value={item.reminder} />
                          <InfoPill label="Recurring" value={item.recurring} />
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.notes}</p>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'tasks' && (
                <SectionShell title="Task Manager" subtitle="Kanban workflow and priority planning">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {['Today', 'Upcoming', 'Completed', 'High Priority', 'Category'].map((filter) => (
                      <button key={filter} className="chip hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-500/10 dark:hover:text-primary-300">
                        {filter}
                      </button>
                    ))}
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {['To Do', 'In Progress', 'Completed'].map((column) => (
                      <div key={column} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{column}</p>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => {
                              if (column === 'To Do') return task.status === 'Not Started';
                              if (column === 'In Progress') return task.status === 'In Progress';
                              return task.status === 'Completed';
                            })
                            .map((task) => (
                              <div key={task.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{task.title}</p>
                                    <p className="mt-1 text-xs text-slate-500">{task.category}</p>
                                  </div>
                                  <span className={getPriorityTone(task.priority)}>{task.priority}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{task.description}</p>
                                <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                                  <div className="h-full rounded-full bg-primary-500" style={{ width: `${task.progress}%` }} />
                                </div>
                                <p className="mt-2 text-xs text-slate-500">Due {task.dueDate} • {task.progress}%</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'projects' && (
                <SectionShell title="Projects" subtitle="Track progress, milestones, and outcomes">
                  <div className="grid gap-4 lg:grid-cols-2">
                    {projects.map((project) => (
                      <div key={project.id} className="panel overflow-hidden p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h4>
                          <span className={getStatusTone(project.status)}>{project.status}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500" style={{ width: `${project.progress}%` }} />
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="chip">{tech}</span>
                          ))}
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                          <InfoPill label="Start" value={project.startDate} />
                          <InfoPill label="Target" value={project.targetDate} />
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                            View detailed page <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'business-ideas' && (
                <SectionShell title="Business Ideas Vault" subtitle="Review opportunities, models, and validation next steps">
                  <div className="grid gap-4 lg:grid-cols-2">
                    {ideas.map((idea) => (
                      <div key={idea.id} className="panel p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{idea.name}</h4>
                            <p className="mt-1 text-sm text-slate-500">Opportunity score: {idea.opportunityScore}/10</p>
                          </div>
                          <span className={getStatusTone(idea.status)}>{idea.status}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{idea.description}</p>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                          <InfoPill label="Startup cost" value={formatCurrency(idea.startupCost)} />
                          <InfoPill label="Expected profit" value={formatCurrency(idea.expectedProfit)} />
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <p><strong>Problem:</strong> {idea.problem}</p>
                          <p><strong>Solution:</strong> {idea.solution}</p>
                          <p><strong>Target:</strong> {idea.targetCustomers}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'business-plans' && (
                <SectionShell title="Business Plans" subtitle="Detailed planning, forecasting, and operations">
                  <div className="grid gap-4 lg:grid-cols-2">
                    {plansData.map((plan) => (
                      <div key={plan.id} className="panel p-4">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{plan.name}</h4>
                          <span className={getStatusTone(plan.status)}>{plan.status}</span>
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                          <InfoPill label="Required investment" value={formatCurrency(plan.investment)} />
                          <InfoPill label="Profit forecast" value={formatCurrency(plan.profitForecast)} />
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <p><strong>Vision:</strong> {plan.vision}</p>
                          <p><strong>Mission:</strong> {plan.mission}</p>
                          <p><strong>Problem:</strong> {plan.problem}</p>
                          <p><strong>Solution:</strong> {plan.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'expenses' && (
                <SectionShell title="Expense Tracker" subtitle="Track spending, bills, and category trends">
                  <div className="mb-4 grid gap-3 md:grid-cols-4">
                    <InfoPill label="Today's expenses" value={formatCurrency(expenses.filter((e) => e.date === '2026-09-13').reduce((sum, item) => sum + item.amount, 0))} />
                    <InfoPill label="Weekly expenses" value={formatCurrency(expenses.reduce((sum, item) => sum + item.amount, 0) * 0.75)} />
                    <InfoPill label="Monthly expenses" value={formatCurrency(totalExpenses)} />
                    <InfoPill label="Yearly expenses" value={formatCurrency(totalExpenses * 12)} />
                  </div>
                  <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Spending by category</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={spendingByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                              {spendingByCategory.map((s, index) => (
                                <Cell key={`${s.name}-${index}`} fill={['#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f87171'][index % 5]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="panel p-5">
                      <div className="space-y-3">
                        {expenses.map((expense) => (
                          <div key={expense.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-slate-900 dark:text-white">{expense.description}</p>
                              <span className="font-semibold text-rose-500">-{formatCurrency(expense.amount)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                              <span>{expense.category}</span>
                              <span>{expense.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionShell>
              )}

              {activeSection === 'income' && (
                <SectionShell title="Income & Profit Tracker" subtitle="Overview of revenue, costs, and net gain">
                  <div className="mb-5 grid gap-3 md:grid-cols-3">
                    <InfoPill label="Total income" value={formatCurrency(totalIncome)} />
                    <InfoPill label="Total expenses" value={formatCurrency(totalExpenses)} />
                    <InfoPill label="Net profit" value={formatCurrency(totalProfit)} />
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Monthly profit overview</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={profitChartData}>
                            <defs>
                              <linearGradient id="incomeFill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeFill)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="panel p-5">
                      <div className="space-y-3">
                        {income.map((entry) => (
                          <div key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-slate-900 dark:text-white">{entry.source}</p>
                              <span className="font-semibold text-emerald-500">+{formatCurrency(entry.amount)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                              <span>{entry.category}</span>
                              <span>{entry.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionShell>
              )}

              {activeSection === 'goals' && (
                <SectionShell title="Goals & Plans" subtitle="Short-, mid-, and long-term goals with progress tracking">
                  <div className="grid gap-4 lg:grid-cols-2">
                    {goals.map((goal) => (
                      <div key={goal.id} className="panel p-4">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{goal.title}</h4>
                          <span className={getStatusTone(goal.status)}>{goal.status}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{goal.description}</p>
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${goal.progress}%` }} />
                          </div>
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                          <InfoPill label="Type" value={goal.type} />
                          <InfoPill label="Target" value={goal.targetDate} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'plans' && (
                <SectionShell title="Important Plans" subtitle="Pinned plans, milestones, and critical actions">
                  <div className="space-y-4">
                    {importantPlans.map((plan) => (
                      <div key={plan.id} className="panel p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.title}</h4>
                            <p className="text-sm text-slate-500">{plan.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {plan.pinned && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                            <span className={getPriorityTone(plan.priority)}>{plan.priority}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                          {plan.actionSteps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'notes' && (
                <SectionShell title="Notes" subtitle="Quick thinking, ideas, and personal references">
                  <div className="grid gap-4 lg:grid-cols-2">
                    {notes.map((note) => (
                      <div key={note.id} className="panel p-4">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{note.title}</h4>
                          {note.pinned && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{note.content}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <span key={tag} className="chip">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'photos' && (
                <SectionShell title="Photo Vault" subtitle="Private memories and important images">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {photos.map((photo) => (
                      <div key={photo.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                        <img src={photo.url} alt={photo.title} className="h-52 w-full object-cover" />
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-slate-900 dark:text-white">{photo.title}</p>
                            {photo.important && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{photo.album} • {photo.date}</p>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{photo.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'videos' && (
                <SectionShell title="Video Vault" subtitle="Memories, tutorials, and project walkthroughs">
                  <div className="grid gap-4 md:grid-cols-2">
                    {videos.map((video) => (
                      <div key={video.id} className="panel overflow-hidden p-3">
                        <video className="h-56 w-full rounded-xl object-cover" controls src={video.url} />
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{video.title}</h4>
                            <p className="text-xs text-slate-500">{video.category} • {video.album}</p>
                          </div>
                          {video.important && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'documents' && (
                <SectionShell title="Document Vault" subtitle="Files, certificates, and key records">
                  <div className="space-y-3">
                    {documents.map((document) => (
                      <div key={document.id} className="panel flex items-center justify-between gap-3 p-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{document.name}</p>
                          <p className="text-sm text-slate-500">{document.category} • {document.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {document.important && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                          <button className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium dark:bg-slate-800">Open</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'achievements' && (
                <SectionShell title="Achievements" subtitle="Milestones and wins across work, study, and business">
                  <div className="space-y-4">
                    {achievements.map((entry) => (
                      <div key={entry.id} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                            <Trophy className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{entry.title}</p>
                            <p className="text-sm text-slate-500">{entry.date} • {entry.category}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{entry.description}</p>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'journal' && (
                <SectionShell title="Journal" subtitle="Daily reflections and personal insights">
                  <div className="space-y-4">
                    {journalEntries.map((entry) => (
                      <div key={entry.id} className="panel p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{entry.title}</h4>
                          <span className="chip">{entry.mood}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">{entry.date}</p>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          <InfoPill label="What I did" value={entry.whatIDid} />
                          <InfoPill label="What I learned" value={entry.whatILearned} />
                          <InfoPill label="What went well" value={entry.whatWentWell} />
                          <InfoPill label="Need improve" value={entry.needImprove} />
                        </div>
                        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                          <strong>Tomorrow's plan:</strong> {entry.tomorrowPlan}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionShell>
              )}

              {activeSection === 'analytics' && (
                <SectionShell title="Analytics" subtitle="Personal performance, project health, and financial trends">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Productivity</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={productivityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="panel p-5">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Financial summary</h4>
                      <div className="space-y-3">
                        <InfoPill label="Income" value={formatCurrency(totalIncome)} />
                        <InfoPill label="Expenses" value={formatCurrency(totalExpenses)} />
                        <InfoPill label="Profit" value={formatCurrency(totalProfit)} />
                        <InfoPill label="Task completion" value={formatPercent((completedTasks / tasks.length) * 100)} />
                      </div>
                    </div>
                  </div>
                </SectionShell>
              )}

              {activeSection === 'ai' && (
                <SectionShell title="My AI Assistant" subtitle="Private analysis based only on your own stored information">
                  <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                    <div className="panel p-5">
                      <p className="mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">Example prompts</p>
                      <div className="space-y-2">
                        {[
                          'What do I need to do today?',
                          'Show my pending tasks.',
                          'How much did I spend this month?',
                          'What are my active projects?',
                          'Which business ideas are active?',
                          'What goals are behind schedule?',
                          'Summarize my week.',
                          'Create a plan for tomorrow.',
                        ].map((question) => (
                          <button
                            key={question}
                            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          >
                            {question}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="panel p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary-600">AI summary</p>
                      <h4 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Your current overview</h4>
                      <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <p>You have {pendingTasks} pending tasks and {completedTasks} completed tasks. Your personal productivity trend is strong and your biggest focus today is moving the life dashboard and portfolio work forward.</p>
                        <p>Your active projects are {projects.filter((p) => p.status === 'Active' || p.status === 'Planning').map((p) => p.name).join(', ')}.</p>
                        <p>This month you earned {formatCurrency(totalIncome)} and spent {formatCurrency(totalExpenses)}, leaving a net profit of {formatCurrency(totalProfit)}.</p>
                      </div>
                    </div>
                  </div>
                </SectionShell>
              )}

              {activeSection === 'settings' && (
                <SectionShell title="Settings" subtitle="Customize your dashboard preferences">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="panel p-5">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Appearance</h4>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => setTheme('light')}
                          className={`rounded-xl px-4 py-2 text-sm font-medium ${theme === 'light' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                        >
                          Light mode
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`rounded-xl px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                        >
                          Dark mode
                        </button>
                      </div>
                    </div>
                    <div className="panel p-5">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Preferences</h4>
                      <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <p>Dashboard widgets: enabled</p>
                        <p>Widget order: custom</p>
                        <p>Notifications: active</p>
                        <p>Private mode: secure</p>
                      </div>
                    </div>
                  </div>
                </SectionShell>
              )}
            </main>
          </div>
        )}

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 xl:hidden">
          <div className="grid grid-cols-5 gap-2 text-xs">
            {['dashboard', 'tasks', 'schedule', 'projects', 'more'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item === 'more' ? 'settings' : (item as SectionId))}
                className="rounded-xl px-2 py-2 text-center text-slate-600 dark:text-slate-300"
              >
                {item === 'dashboard' ? 'Home' : item === 'tasks' ? 'Tasks' : item === 'schedule' ? 'Calendar' : item === 'projects' ? 'Projects' : 'More'}
              </button>
            ))}
          </div>
        </div>

        {quickAddType && quickAddForm}
      </div>
    </div>
  );
}

function SectionShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-600">Module</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <div className="chip">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  const colors: Record<string, string> = {
    sky: 'from-sky-500 to-cyan-500',
    violet: 'from-violet-500 to-indigo-500',
    emerald: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${colors[accent]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/80">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}

function MiniSummaryCard({ title, value, details }: { title: string; value: string; details: string }) {
  return (
    <div className="panel p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{details}</p>
    </div>
  );
}

export default App;
