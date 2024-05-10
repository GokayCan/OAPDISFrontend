import { Component, OnInit, ViewChild } from '@angular/core';
import { an } from '@fullcalendar/core/internal-common';
import { MenuItem, MessageService } from 'primeng/api';
import { Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';
import { DecodeService } from '../../service/decode.service';
import { UserChangePassword } from '../model/userChangePassword';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class ProfileComponent implements OnInit {

    items: MenuItem[] = [];

    uploadedFiles: any[] = [];

    data: Profile = new Profile();

    image: File = undefined;

    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;

    activeIndex: number = 0;

    @ViewChild('profileForm') profileForm: any;
    @ViewChild('passwordForm') passwordForm: any;
    loading: boolean = false;

    constructor(private profileService: ProfileService, private decodeService: DecodeService, private messageService: MessageService) {

    }

    ngOnInit(): void {

        this.profileService.getProfile(this.decodeService.getUserId()).subscribe((res: any) => {
            this.data = res.data;
        })

        this.items = [
            {
                label: 'Kişisel Bilgiler',
                command: (event: any) => this.activeIndex = 0
            },
            {
                label: 'Şifre Değiştir',
                command: (event: any) => this.activeIndex = 1
            },
            {
                label: 'Fotoğraf Değiştir',
                command: (event: any) => this.activeIndex = 2
            },
        ];
    }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    updatePersonalInformation() {
        if (this.profileForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if(this.loading){
            return;
        }
        this.loading = true;
        this.profileService.updatePersonalInformation(this.data).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
        }, error => {
            this.loading = false;
        },() => {
            this.loading = false;

        });
    }

    updatePassword() {
        if (this.passwordForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.newPassword != this.newPasswordConfirm) {
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: "Şifreler birbiri ile eşleşmiyor" });
            return;
        }
        if(this.loading){
            return;
        }
        this.loading = true;
        const passwordDto = new UserChangePassword();
        passwordDto.id = this.data.id;
        passwordDto.oldPassword = this.oldPassword;
        passwordDto.newPassword = this.newPassword;
        this.profileService.updatePassword(passwordDto).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
        }, error => {
            this.loading = false;
        },() => {
            this.loading = false;

        });
    }

    updatePhoto() {
        if(this.image == undefined){
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Fotoğraf Seçiniz!" });
            return;
        }
        if(this.loading){
            return;
        }
        this.loading = true;
        let formData = new FormData();
        formData.append('image', this.image);
        formData.append('id', this.data.id.toString());
        this.profileService.updateProfilePhoto(formData).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
        }, error => {
            this.loading = false;
        },() => {
            this.loading = false;

        });
    }

    onUpload(event: any) {
        this.image = event.files[0];
    }

    onClear() {
        this.image = undefined;
    }

}
