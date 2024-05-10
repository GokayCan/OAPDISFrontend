import { DeparmentList } from "../department/model/department-list";
import { Teacher } from "../teacher/model/teacher";
import { MonthlyCount } from "./monthlyCount";

export class Dashboard {
    totalUsers: number;
    totalProjects: number;
    totalMeetings: number;
    totalArticles: number;

    monthlyProjectCounts: MonthlyCount[];
    monthlyMeetingCounts: MonthlyCount[];
    monthlyArticleCounts: MonthlyCount[];

    mostProductiveTeacher: Teacher;
    mostProductiveDepartment: DeparmentList;
}
