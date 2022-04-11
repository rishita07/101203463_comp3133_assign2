import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
//might be unnessiacry 
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {

  dataList: any[] = []
  ListingsOutput = new Observable<any>();
  constructor(private apolloClient: Apollo, private getEndPoint: HttpClient) { }

  ngOnInit(): void{}
  
  private GET_LISTING = gql`
  query {
    getAdminListings{
      listing_title
        description
        street
        city
        price
        email
        username
        postal_code
    }
  }
  `

  getListing(){
    console.log("active")
    this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING

    }).valueChanges.subscribe((resp: any)=>{
      console.log(resp)
    })
  }
}
