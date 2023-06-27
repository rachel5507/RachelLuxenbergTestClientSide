import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailRequest } from '../Models/EmailRequest';
import { EmailResponse } from '../Models/EmailResponse';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: EmailRequest) {
    return this.http.post<EmailResponse>(`${environment.apiUrl}/api/Email/GetTheEmailAndReceivedTime`, { email: emailRequest.email })
  }
  
}