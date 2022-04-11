import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  [x: string]: any;

  constructor(private apolloClient: Apollo, private getEndPoint: HttpClient,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this['BookingOutput'] = this.apolloClient.watchQuery<any>({
      query: this.GETBOOKING
    }).valueChanges.pipe(
      map((resp:any)=>{
        console.log(resp.data.getuserbooking)
        return resp.data.getuserbooking
      })
    )
  }

  private GETBOOKING = gql`
  query{
    getuserbooking{
    listing_id
    booking_id
    booking_date
    booking_start
    booking_id
    booking_end
  }
  }
  `
}
