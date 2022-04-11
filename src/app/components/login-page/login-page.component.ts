import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
import { Models } from 'mongoose';

Router
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  [x: string]: any;
  
  loginForm = new FormGroup({
  user_Name: new FormControl(),
  pass_word: new FormControl()
  })
  private LOGIN = gql`
  mutation Mutation(
    $username: String!,
    $password: String!
    ) {
      login(
        username: $username,
        password: $password
      )
    }
  `

 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  Login(){let tempUsername = this.loginForm.get('username')?.value;
  let tempPassword = this.loginForm.get('password')?.value;

  console.log(tempUsername, tempPassword);

  this['apollo'].mutate({
    mutation: this.LOGIN,
    variables: {
      username: tempUsername,
      password: tempPassword
    }
  }).subscribe((res: any) => {
    if (res.data.login === null || res.data.login === undefined) {
      alert(new Error('username and password do not match, or does not exist'));
    } else {
      this['authService'].setUserData(res.data.login[0], res.data.login[5]);
      this.router.navigate(['']);
    }
  }, (err: { message: any; }) => {
    alert(err.message);
  })

  }


  onSubmit(){
    console.log(this.loginForm.value)
    console.log(this.loginForm.value.user_Name)
    console.log(this.loginForm.value.password)
    

  }

}
