import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { TeacherService } from './teacher/service/teacher.service';
import { Teacher } from './teacher/model/teacher';
import { DepartmentService } from './department/service/department.service';
import { Department } from './department/model/department';
import { DeparmentList } from './department/model/department-list';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DashboardService } from './dashboard/dashboard.service';
import { Dashboard } from './dashboard/dashboard';
import { ConnectionState, SignalRService } from './service/signalR.service';

@Component({
    selector: 'app-oapdis',
    templateUrl: './oapdis.component.html',
    styles: [
    ]
})
export class OapdisComponent implements OnInit, OnDestroy, AfterViewInit {

    //tek tek göstermelik değişkenler
    private valueUpdateSubscription: Subscription | undefined;
    realDashboardData: Dashboard = new Dashboard();
    dashboardData: Dashboard = new Dashboard();

    //takvim için toplantı datası
    meetingDailyCounts: any[] = [];

    //grafik için değişkenler
    basicProjectOptions: any;
    basicMeetingOptions: any;
    basicArticleOptions: any;

    chartDataProjectCounts: any;
    chartDataMeetingCounts: any;
    chartDataArticleCounts: any;


    constructor(private dashboardService: DashboardService, private signalRService: SignalRService) {
        const backgroundColors = [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            // Devam eden renkler
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        ];

        const borderColors = [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            // Devam eden renkler
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)'
        ];
        this.chartDataProjectCounts = {
            labels: [],
            datasets: [
                {
                    label: 'Son 12 Ayın Proje Sayıları',
                    data: [],
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }
            ]
        };
        this.chartDataMeetingCounts = {
            labels: [],
            datasets: [
                {
                    label: 'Son 12 Ayın Toplantı Sayıları',
                    data: [],
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }
            ]
        };
        this.chartDataArticleCounts = {
            labels: [],
            datasets: [
                {
                    label: 'Son 12 Ayın Makale Sayıları',
                    data: [],
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }
            ]
        };
    }

    ayIsimleri = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);

        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.dashboardService.getDashboardData().subscribe(res => {
            this.dashboardData = res.data;

            // Grafik ayarlarını tanımla
            this.basicProjectOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                            // y ekseni değerlerini dinamik olarak ayarla
                            stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                            min: 0, // minimum değer, burada 0
                            max: Math.max(...this.chartDataProjectCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        type: 'category', // x ekseni tipini kategori olarak ayarla
                        ticks: {
                            color: textColorSecondary,
                            callback: (value, index, values) => {
                                // Sadece ayların isimlerini döndür
                                return this.chartDataProjectCounts.labels[index];
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            this.basicMeetingOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                            // y ekseni değerlerini dinamik olarak ayarla
                            stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                            min: 0, // minimum değer, burada 0
                            max: Math.max(...this.chartDataMeetingCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        type: 'category', // x ekseni tipini kategori olarak ayarla
                        ticks: {
                            color: textColorSecondary,
                            callback: (value, index, values) => {
                                // Sadece ayların isimlerini döndür
                                return this.chartDataProjectCounts.labels[index];
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            this.basicArticleOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                            // y ekseni değerlerini dinamik olarak ayarla
                            stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                            min: 0, // minimum değer, burada 0
                            max: Math.max(...this.chartDataArticleCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        type: 'category', // x ekseni tipini kategori olarak ayarla
                        ticks: {
                            color: textColorSecondary,
                            callback: (value, index, values) => {
                                // Sadece ayların isimlerini döndür
                                return this.chartDataProjectCounts.labels[index];
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            this.realDashboardData.monthlyArticleCounts = res.data.monthlyArticleCounts;
            this.realDashboardData.monthlyMeetingCounts = res.data.monthlyMeetingCounts;
            this.realDashboardData.monthlyProjectCounts = res.data.monthlyProjectCounts;
        }, () => { }, () => {
            this.dashboardData.monthlyProjectCounts.reverse().forEach(item => {
                this.chartDataProjectCounts.datasets[0].data.push(item.count);
                this.chartDataProjectCounts.labels.push(this.ayIsimleri[item.month - 1]);
            });
            this.dashboardData.monthlyMeetingCounts.reverse().forEach(item => {
                this.chartDataMeetingCounts.datasets[0].data.push(item.count);
                this.chartDataMeetingCounts.labels.push(this.ayIsimleri[item.month - 1]);
            });
            this.dashboardData.monthlyArticleCounts.reverse().forEach(item => {
                this.chartDataArticleCounts.datasets[0].data.push(item.count);
                this.chartDataArticleCounts.labels.push(this.ayIsimleri[item.month - 1]);
            });

            this.startValueUpdates();

        })
        this.realDashboardData.mostProductiveDepartment = new DeparmentList();
        this.realDashboardData.mostProductiveTeacher = new Teacher();
        this.realDashboardData.mostProductiveTeacher.projectCount = 0;
        this.realDashboardData.mostProductiveDepartment.projectCount = 0;
        this.realDashboardData.totalProjects = 0;
        this.realDashboardData.totalMeetings = 0;
        this.realDashboardData.totalArticles = 0;
        this.realDashboardData.totalUsers = 0;

        this.dashboardService.getDailyMeetingCount().subscribe(res => {
            this.meetingDailyCounts = res.data;
            setTimeout(() => {
                this.meetingDailyCounts.forEach((item: any) => {
                    this.calendarOptions.events = this.convertToCalendarEvents(res.data);
                });
            }, 500);
        })

    }

    async ngAfterViewInit(): Promise<void> {
        setTimeout(async () => {
            await this.connectSignalR();
        }, 1000);
    }

    private async connectSignalR() {
        if (this.signalRService.getState() === ConnectionState.Connected) {
            await this.signalRService.addDashboardDataListener().then(() => {
                this.signalRService.dashboardDataSubject.subscribe((data) => {
                    this.realDashboardData = data;
                    this.updateCharts(); // Grafikleri güncelleyin
                });
            })
            await this.signalRService.addCalendarDataListener().then(() => {
                this.signalRService.calendarDataSubject.subscribe((data) => {
                    this.meetingDailyCounts.find((item: any) => item.date === data.date).count = data.count;
                    this.meetingDailyCounts.forEach((item: any) => {
                        this.calendarOptions.events = this.convertToCalendarEvents(this.meetingDailyCounts);
                    });
                });
            });
        }
    }

    private updateCharts() {
        const documentStyle = getComputedStyle(document.documentElement);

        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartDataProjectCounts.datasets[0].data = [];
        this.chartDataProjectCounts.labels = [];
        this.chartDataMeetingCounts.datasets[0].data = [];
        this.chartDataMeetingCounts.labels = [];
        this.chartDataArticleCounts.datasets[0].data = [];
        this.chartDataArticleCounts.labels = [];

        this.realDashboardData.monthlyProjectCounts.reverse().forEach(item => {
            this.chartDataProjectCounts.datasets[0].data.push(item.count);
            this.chartDataProjectCounts.labels.push(this.ayIsimleri[item.month - 1]);
        });

        this.realDashboardData.monthlyMeetingCounts.reverse().forEach(item => {
            this.chartDataMeetingCounts.datasets[0].data.push(item.count);
            this.chartDataMeetingCounts.labels.push(this.ayIsimleri[item.month - 1]);
        });

        this.realDashboardData.monthlyArticleCounts.reverse().forEach(item => {
            this.chartDataArticleCounts.datasets[0].data.push(item.count);
            this.chartDataArticleCounts.labels.push(this.ayIsimleri[item.month - 1]);
        });

        // Grafik ayarlarını tanımla
        this.basicProjectOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                        // y ekseni değerlerini dinamik olarak ayarla
                        stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                        min: 0, // minimum değer, burada 0
                        max: Math.max(...this.chartDataProjectCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    type: 'category', // x ekseni tipini kategori olarak ayarla
                    ticks: {
                        color: textColorSecondary,
                        callback: (value, index, values) => {
                            // Sadece ayların isimlerini döndür
                            return this.chartDataProjectCounts.labels[index];
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.basicMeetingOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                        // y ekseni değerlerini dinamik olarak ayarla
                        stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                        min: 0, // minimum değer, burada 0
                        max: Math.max(...this.chartDataMeetingCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    type: 'category', // x ekseni tipini kategori olarak ayarla
                    ticks: {
                        color: textColorSecondary,
                        callback: (value, index, values) => {
                            // Sadece ayların isimlerini döndür
                            return this.chartDataProjectCounts.labels[index];
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.basicArticleOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                        // y ekseni değerlerini dinamik olarak ayarla
                        stepSize: 4, // adım miktarı, 1 olması tüm sayıları gösterecektir
                        min: 0, // minimum değer, burada 0
                        max: Math.max(...this.chartDataArticleCounts.datasets[0].data) + 1 // maksimum değer, verilerin maksimum değeri artı 1
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    type: 'category', // x ekseni tipini kategori olarak ayarla
                    ticks: {
                        color: textColorSecondary,
                        callback: (value, index, values) => {
                            // Sadece ayların isimlerini döndür
                            return this.chartDataProjectCounts.labels[index];
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    private startValueUpdates(): void {
        this.valueUpdateSubscription = interval(5).subscribe(() => {
            this.incrementDashboardData();
        });
    }

    private stopValueUpdates(): void {
        if (this.valueUpdateSubscription) {
            this.valueUpdateSubscription.unsubscribe();
        }
    }

    private incrementDashboardData(): void {
        // 1'er 1'er artırma işlemi gerçek değere ulaşıncaya kadar devam eder
        if (this.dashboardData.mostProductiveTeacher.projectCount > this.realDashboardData.mostProductiveTeacher.projectCount) {
            this.realDashboardData.mostProductiveTeacher.projectCount += 1;
        }

        if (this.dashboardData.mostProductiveDepartment.projectCount > this.realDashboardData.mostProductiveDepartment.projectCount) {
            this.realDashboardData.mostProductiveDepartment.projectCount += 1;
        }

        if (this.dashboardData.totalProjects > this.realDashboardData.totalProjects) {
            this.realDashboardData.totalProjects += 1;
        }

        if (this.dashboardData.totalMeetings > this.realDashboardData.totalMeetings) {
            this.realDashboardData.totalMeetings += 1;
        }

        if (this.dashboardData.totalArticles > this.realDashboardData.totalArticles) {
            this.realDashboardData.totalArticles += 1;
        }

        if (this.dashboardData.totalUsers > this.realDashboardData.totalUsers) {
            this.realDashboardData.totalUsers += 1;
        }

        else if (
            this.dashboardData.mostProductiveDepartment.projectCount == this.realDashboardData.mostProductiveDepartment.projectCount
            && this.dashboardData.mostProductiveTeacher.projectCount == this.realDashboardData.mostProductiveTeacher.projectCount
            && this.dashboardData.totalProjects == this.realDashboardData.totalProjects
            && this.dashboardData.totalMeetings == this.realDashboardData.totalMeetings
            && this.dashboardData.totalArticles == this.realDashboardData.totalArticles
            && this.dashboardData.totalUsers == this.realDashboardData.totalUsers) {
            this.stopValueUpdates();
        }
    }

    ngOnDestroy(): void {
        this.stopValueUpdates();
    }

    public events: EventInput[] = [];

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        locale: 'tr',
        events: this.events,
        buttonText: {
            today: 'Bugün',
            month: 'Ay',
            week: 'Hafta',
            day: 'Gün',
            list: 'Liste',
        },
        displayEventTime: false,
        eventTextColor: 'white',
        eventBackgroundColor: '#D81B60',
    };

    convertToCalendarEvents(data: any[]): any[] {
        return data.map((item) => ({
            title: item.count + ' Toplantı',
            date: item.date,
            backgroundColor: '#D81B60',
            textColor: 'white'
        }));
    }
}
