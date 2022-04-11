import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  [x: string]: any;

    signinForm = new FormGroup({
    userName: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
   
  })

  private ADDNEWUSER = gql`
  mutation addUser(
    $userN:String!,
    $firstN:String!,
    $lastN:String!,
    $passW:String!,
    $EMAIL:String!
    ){
    addUser(
    userName: $userN,
    firstName:$firstN,
    lastName: $lastN,
    password: $passW,
    email: $EMAIL,
    
    ){
      userName
      firstName
      lastName
      password
      email
     
    }

  }
    `
    


  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }
  addUser(tempUsername: any ,tempFirstname: any,tempLastname: any, tempPassword: any,tempEmail: any ){
    console.log(tempUsername, tempFirstname, tempLastname,tempPassword,tempEmail)
    this.apollo.mutate({
      mutation: this['sign-up'],
      variables: {
        username: tempUsername,
        firstname: tempFirstname,
        lastname: tempLastname,
        password: tempPassword,
        email: tempEmail,

      }
    }).subscribe((res: any) => {
      console.log('signup', res.data)
      this['router'].navigate(['/login'])
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }


  onSubmit(){
    console.log(this.signinForm.value)
    console.log(this.signinForm.value.userName)
    console.log(this.signinForm.value.firstName)
    console.log(this.signinForm.value.lastName)
    console.log(this.signinForm.value.password)
    console.log(this.signinForm.value.email)
    let user_Name = this.signinForm.value.user_Name
    let first_Name = this.signinForm.value.first_Name
    let last_Name= this.signinForm.value.last_Name
    let password= this.signinForm.value.pass_word
    let email= this.signinForm.value.e_mail
   
    this.addUser(user_Name,first_Name,last_Name,password,email)
  }

}
