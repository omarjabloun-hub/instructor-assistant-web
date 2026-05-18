export const courses = [
  {
    id: "alg-101",
    code: "ALG 101",
    title: "Introduction to Algebra",
    description: "Foundations of variables, equations, and linear systems for first-year undergrads.",
    students: 34,
    progress: 62,
    nextSession: "Mon · 9:00 AM",
    status: "active" as const,
    color: "#4f46e5",
  },
  {
    id: "geo-202",
    code: "GEO 202",
    title: "Euclidean Geometry",
    description: "Postulates, theorems, and proofs — building rigour through classical geometry.",
    students: 28,
    progress: 45,
    nextSession: "Tue · 10:30 AM",
    status: "active" as const,
    color: "#0ea5e9",
  },
  {
    id: "cal-301",
    code: "CAL 301",
    title: "Single-Variable Calculus",
    description: "Limits, derivatives, and integrals with applications to physics and economics.",
    students: 42,
    progress: 78,
    nextSession: "Wed · 1:00 PM",
    status: "active" as const,
    color: "#16a34a",
  },
  {
    id: "stat-110",
    code: "STAT 110",
    title: "Statistics for Educators",
    description: "Descriptive statistics, inference, and visualisation aimed at teachers.",
    students: 19,
    progress: 12,
    nextSession: "Thu · 2:00 PM",
    status: "draft" as const,
    color: "#d97706",
  },
  {
    id: "his-150",
    code: "HIS 150",
    title: "History of Mathematics",
    description: "How mathematical ideas evolved across cultures from antiquity to present day.",
    students: 22,
    progress: 100,
    nextSession: "Archived",
    status: "archived" as const,
    color: "#6b7280",
  },
];

export const students = [
  { id: "1", name: "Alex Johnson", email: "alex.j@school.edu", course: "ALG 101", grade: "A-", attendance: 96, status: "On track" as const },
  { id: "2", name: "Maria Rodriguez", email: "maria.r@school.edu", course: "GEO 202", grade: "B+", attendance: 88, status: "On track" as const },
  { id: "3", name: "Sam Patel", email: "sam.p@school.edu", course: "CAL 301", grade: "C", attendance: 72, status: "At risk" as const },
  { id: "4", name: "Lena Kim", email: "lena.k@school.edu", course: "ALG 101", grade: "A", attendance: 99, status: "On track" as const },
  { id: "5", name: "Marcus Brown", email: "marcus.b@school.edu", course: "GEO 202", grade: "B", attendance: 81, status: "On track" as const },
  { id: "6", name: "Priya Singh", email: "priya.s@school.edu", course: "CAL 301", grade: "D+", attendance: 64, status: "At risk" as const },
  { id: "7", name: "Owen Walsh", email: "owen.w@school.edu", course: "ALG 101", grade: "B-", attendance: 79, status: "On track" as const },
  { id: "8", name: "Yuki Tanaka", email: "yuki.t@school.edu", course: "STAT 110", grade: "—", attendance: 100, status: "New" as const },
];

export const assignments = [
  { id: "1", title: "Problem set 4: Linear systems", course: "ALG 101", due: "May 21", submissions: 22, total: 34, status: "Open" as const },
  { id: "2", title: "Proof exercise: SAS congruence", course: "GEO 202", due: "May 19", submissions: 28, total: 28, status: "Grading" as const },
  { id: "3", title: "Midterm: Limits & continuity", course: "CAL 301", due: "May 17", submissions: 42, total: 42, status: "Graded" as const },
  { id: "4", title: "Reading reflection: Newton vs Leibniz", course: "HIS 150", due: "May 23", submissions: 8, total: 22, status: "Open" as const },
  { id: "5", title: "Quiz: Sampling distributions", course: "STAT 110", due: "May 24", submissions: 0, total: 19, status: "Scheduled" as const },
];

export const schedule = [
  { id: "1", time: "9:00 AM", duration: "50 min", title: "Intro to Algebra", room: "Room 204", course: "ALG 101", day: "Mon" },
  { id: "2", time: "11:00 AM", duration: "50 min", title: "Office hours", room: "Faculty 3B", course: "—", day: "Mon" },
  { id: "3", time: "10:30 AM", duration: "75 min", title: "Euclidean Geometry", room: "Room 109", course: "GEO 202", day: "Tue" },
  { id: "4", time: "1:00 PM", duration: "75 min", title: "Calculus I lab", room: "Lab A", course: "CAL 301", day: "Wed" },
  { id: "5", time: "2:00 PM", duration: "50 min", title: "Statistics seminar", room: "Room 305", course: "STAT 110", day: "Thu" },
];

export const announcements = [
  { id: "1", title: "Grading rubric updated for CAL 301", author: "Dean's office", time: "2h ago", type: "info" as const },
  { id: "2", title: "Final exam venue change — ALG 101", author: "Registrar", time: "Yesterday", type: "warning" as const },
  { id: "3", title: "New AI assistant features available", author: "Product", time: "3d ago", type: "info" as const },
];
