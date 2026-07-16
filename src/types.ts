export interface Alert {
  id: string;
  title: string;
  time: string;
  severity: "critical" | "warning" | "success" | "info";
  description: string;
  resolved: boolean;
  user?: string;
  ip?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "success" | "warning" | "error" | "info";
  iconName: string;
}

export interface SystemStatus {
  name: string;
  status: "critical" | "warning" | "success";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  actions?: string[];
}

export interface DepartmentRisk {
  name: string;
  riskScore: number;
  status: "critical" | "warning" | "success";
}

export interface SOCStats {
  employeesOnline: number;
  privilegedSessions: number;
  criticalAlerts: number;
  highRiskUsers: number;
  blockedSessions: number;
  protectedSystems: number;
  resolvedThreats: number;
  avgResponseTime: string;
  aiAccuracy: string;
}
