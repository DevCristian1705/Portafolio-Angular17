import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../shared/service/validators.service';
import { of, throwError } from 'rxjs';
import { DialogMessageComponent } from '../../shared/components/dialog/dialog-message/dialog-message.component';
import { messageAuth } from '../../shared/components/message-type/message-type';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let validatorsServiceSpy: jasmine.SpyObj<ValidatorsService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: FormBuilder, useValue: formBuilderSpy },
        { provide: ValidatorsService, useValue: validatorsServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should create the login form', () => {
    // Arrange
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    // Assert
    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  it('should call login service when the form is submitted', () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({ email, password });
    authServiceSpy.login.and.returnValue(of<boolean>(true));

    // Act
    component.onLogin();

    // Assert
    expect(authServiceSpy.login).toHaveBeenCalledTimes(1);
    expect(authServiceSpy.login).toHaveBeenCalledWith(email, password);
  });

  it('should navigate to dashboard when login is successful', () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({ email, password });
    authServiceSpy.login.and.returnValue(of<boolean>(true));
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));

    // Act
    component.onLogin();

    // Assert
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/Dashboard');
  });


  it('should show error message when login fails', () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({ email, password });
    authServiceSpy.login.and.returnValue(throwError(new Error('Login failed')));
 
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    dialogRefMock.afterClosed.and.returnValue(of({}));

    dialogSpy.open.and.returnValue(dialogRefMock);

    // Act
    component.onLogin();

    // Assert
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogMessageComponent, {
      disableClose: false,
      width: '350px',
      data: messageAuth.datos_Noexistentes
    });
  });


  it('should validate email field', () => {
    // Arrange
    const emailControl = component.loginForm.get('email');
    if (emailControl) emailControl.setValue('invalid-email')  
    // Act
    component.isValidField('email');

    // Assert
    expect(component.getFieldError('email')).toBe('No tienes formato de email');
  });

  it('should validate password field', () => {
    // Arrange
    const passwordControl = component.loginForm.get('password');
    if (passwordControl)  passwordControl.setValue('short');

    // Act
    component.isValidField('password');

    // Assert
    expect(component.getFieldError('password')).toBe('password debe tener ');
  });

});
