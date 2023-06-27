import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmailRequest } from 'src/app/Models/EmailRequest';
import { EmailService } from 'src/app/Services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnDestroy {
  email: string = '';
  isValidEmail: boolean = false;
  responseTime: Date | null = null;
  emailRequest = new EmailRequest();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private emailService: EmailService) { }

  validateEmail() {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    this.isValidEmail = regex.test(this.email);
  }

  submitEmail() {
    this.emailRequest.email=this.email;
    this.emailService.sendEmail(this.emailRequest).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.responseTime = new Date(data.receivedTime);
      }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
