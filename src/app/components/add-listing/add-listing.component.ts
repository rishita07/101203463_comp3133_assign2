import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {

  private ADD_LISTING = gql`
    mutation Mutation(
      $userId: String!,
      $listingId: String!,
      $listingTitle: String!,
      $description: String!,
      $street: String!,
      $city: String!,
      $postalCode: String!,
      $price: Float!) {
    addListing(
        userId: $userId,
        listing_id: $listingId,
        listing_title: $listingTitle,
        description: $description,
        street: $street,
        city: $city,
        postal_code: $postalCode,
        price: $price)
      {
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
      }
    }
  `

  listForm =  new FormGroup({
    listingId: new FormControl(),
    listingTitle: new FormControl(),
    description: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    price: new FormControl()
  });

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
  }

  addListing() {
  ;
    let listing_id = this.listForm.get('listingId')?.value;
    let listing_title = this.listForm.get('listingTitle')?.value;
    let description = this.listForm.get('description')?.value;
    let Street = this.listForm.get('street')?.value;
    let City = this.listForm.get('city')?.value;
    let PosCode = this.listForm.get('postalCode')?.value;
    let Price = this.listForm.get('price')?.value;
   

    if (listing_id == null) {
     listing_id = ''
    }
    if (listing_title== null) {
      listing_title = ''
    }
    if (description == null) {
      description = ''
    }
    if (Street == null) {
      Street = ''
    }
    if (City == null) {
      City = ''
    }
    if (PosCode == null) {
      PosCode = ''
    }

    if (isNaN(Price)){
      alert('Price must be a number.')
    } else {
      Price = parseFloat(Price);

      this.apollo.mutate({
        mutation: this.ADD_LISTING,
        variables: {
          
          listingId: listing_id,
          listingTitle: listing_title,
          description: description,
          street: Street,
          city: City,
          postalCode: PosCode,
          price: Price
        },}).subscribe((res: any) => {
          this.router.navigate(['/listing'])
        }, (err: any) => {
          alert(err);
        })
        
     
    }
  }

}
