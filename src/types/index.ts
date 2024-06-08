
export interface Filters {
    category: string | null;
    priority: string | null;
    team: string | null;
    tag: string | null;
  }
  
  export interface IssueItem {
    id: string;
    title: string;
    userName: string;
    userAvatar?: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
    category: 'Bug' | 'Feature' | 'Enhancement' | 'Question';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    team: string;
    tag: string[];
  }
  