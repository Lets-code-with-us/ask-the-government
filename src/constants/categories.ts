export const QUESTION_CATEGORIES = [
  'Education',
  'Healthcare',
  'Infrastructure',
  'Environment',
  'Economy',
  'Public Safety',
  'Transportation',
  'Housing',
  'Technology',
  'Social Services',
  'Justice',
  'Defense',
  'Agriculture',
  'Energy',
  'Immigration',
  'Other'
] as const;

export type QuestionCategory = typeof QUESTION_CATEGORIES[number];

export const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  'Education': 'bg-blue-100 text-blue-800',
  'Healthcare': 'bg-green-100 text-green-800',
  'Infrastructure': 'bg-yellow-100 text-yellow-800',
  'Environment': 'bg-emerald-100 text-emerald-800',
  'Economy': 'bg-purple-100 text-purple-800',
  'Public Safety': 'bg-red-100 text-red-800',
  'Transportation': 'bg-indigo-100 text-indigo-800',
  'Housing': 'bg-pink-100 text-pink-800',
  'Technology': 'bg-gray-100 text-gray-800',
  'Social Services': 'bg-orange-100 text-orange-800',
  'Justice': 'bg-amber-100 text-amber-800',
  'Defense': 'bg-slate-100 text-slate-800',
  'Agriculture': 'bg-lime-100 text-lime-800',
  'Energy': 'bg-cyan-100 text-cyan-800',
  'Immigration': 'bg-rose-100 text-rose-800',
  'Other': 'bg-neutral-100 text-neutral-800'
};

export const CATEGORY_ICONS: Record<QuestionCategory, string> = {
  'Education': '🎓',
  'Healthcare': '🏥',
  'Infrastructure': '🏗️',
  'Environment': '🌱',
  'Economy': '💰',
  'Public Safety': '🛡️',
  'Transportation': '🚗',
  'Housing': '🏠',
  'Technology': '💻',
  'Social Services': '🤝',
  'Justice': '⚖️',
  'Defense': '🎖️',
  'Agriculture': '🌾',
  'Energy': '⚡',
  'Immigration': '🌍',
  'Other': '📋'
};
