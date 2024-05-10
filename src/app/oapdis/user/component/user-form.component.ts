import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styles: [
    ],
    providers: [MessageService]
})
export class UserFormComponent implements OnInit {

    data: User = new User();

    image: File = undefined;

    uploadedFiles: any[] = [];

    id: number = 0;
    loading: boolean = false;
    @ViewChild('userForm') userForm: any;

    constructor(private userService: UserService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params["id"];
            if (this.id > 0) {
                this.userService.get(this.id).subscribe((res: any) => {
                    this.data = res.data;
                });
            }
        });
    }

    save() {
        if (this.userForm.invalid) {
            this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.data.typeId = 1

        let formData = new FormData();

        formData.append('firstName', this.data.firstName);
        formData.append('lastName', this.data.lastName);
        formData.append('title', this.data.title);
        formData.append('task', this.data.task);
        formData.append('phoneNumber', this.data.phoneNumber);
        formData.append('email', this.data.email);
        formData.append('typeId', this.data.typeId.toString());


        if (this.id == undefined) {
            if (this.image == undefined) {
                this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: "Forumun Doldurulduğundan Emin Olun!" });
                this.loading = false;
                return;
            }
            formData.append('image', this.image, this.image.name)
            this.data.password = "123456"
            formData.append('password', this.data.password);
            this.userService.add(formData).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/user"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        } else {
            if(this.image != undefined){
                formData.append('image', this.image, this.image.name)
            }
            formData.append('id', this.data.id.toString());
            this.userService.update(formData).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: res.message });
                setTimeout(() => {
                    this.router.navigate(["/user"]);
                }, 700);
            },
                (error) => {
                    this.loading = false;
                    //this.messageService.add({ severity: 'danger', summary: 'Danger', detail: error.error });
                });
        }
    }

    onUpload(event: any) {
        this.image = event.files[0];
    }

    onClear() {
        this.image = undefined;
    }

}
