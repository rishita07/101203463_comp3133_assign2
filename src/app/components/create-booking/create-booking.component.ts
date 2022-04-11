import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  
  constructor(private apolloClient: Apollo,private activeRoute: ActivatedRoute, private router: Router) {
   }
   bookingform = new FormGroup({
    booking_id: new FormControl(),
    booking_start: new FormControl(),
    booking_end: new FormControl()

   })
   

  ngOnInit(): void {}
  
  private CREATEBOOKING = gql`
  mutation adduserbooking($listing_id:String!,
    $booking_id:String!,
    $booking_start:String!,
    $booking_end:String!,
    $username:String!)
    {
    adduserbooking(
    listing_id: $listing_id
    booking_id: $booking_id
    booking_start: $booking_start
    booking_end: $booking_end
    username: $username
    )
  }
  `
  

  
  AddBooking(
    listing_id:any,
    booking_id:any,
    booking_start_date:any,
    booking_end_date:any,
    username:any){
    console.log(listing_id,booking_id,booking_start_date,booking_end_date,username)
    
    this.apolloClient.mutate({
      mutation: this.CREATEBOOKING,
      variables:{
        listing_id: listing_id,
        booking_id: booking_id,
        booking_start_date:booking_start_date,
        booking_end_date: booking_end_date,
        username: username
      }
    }).subscribe((res: any) => {
      this.router.navigate(['/history'])
    }, (err: any) => {
      alert(err);
    })
  }

}
