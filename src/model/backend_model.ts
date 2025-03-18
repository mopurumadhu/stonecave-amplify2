export class SearchResult {
  resultCount?: number = 0;
  properties?: Property[];
}

export class UploadPresignedURLResult {
  resultCount?: number = 0;
  properties?: Property[];
}

export class PropAmenityResult {
  resultCount?: number = 0;
  amenities?: PropAmenity[];
}

export class APISequenceResult {
  sequenceType?: string = "";
  sequenceValue?: string;
}

export class PropertyImage {
  propID: string = "";
  s3Path: string = "";
  description: string = "";
  displayOrder: number = 0;
  s3URL: string = "";
  width: number = 0;
  height: number = 0;
}

export class PropTopRating {
  topRatingType: boolean = true; // false = lowest rating, true = highest rating
  rating: PropRating = new PropRating();
}

export class GenericFile {
  source: string = "file";
  index: number = 0;
}

export class NearBy {
  propID: string = "";
  type: string = "";
  name: string = "";
  address: Address = new Address();
  distance: number = 0;
  displayOrder: number = 0;
}

export class NearByResult {
  resultCount?: number = 0;
  nearBys?: NearBy[] = [];
}

export class PropRating {
  fbID: string = ""; // firebase document Id to fetch RatingConver record
  propID: string = ""; // Property document ID
  userId: string = ""; // App user id who created/added review
  stayedFrom: string = "";
  stayedTo: string = "";
  stayCurrent: boolean = false;
  rating: number = 0;
  cleanRating: number = 0;
  foodRating: number = 0;
  valueRating: number = 0;
  amensRating: number = 0;
  title: string = "";
  comment: string = "";
  status: string = "";
  createdDate: string = "";
}

// Conversations of a Rating
export class RatingConver {
  propID: string = ""; // Property document ID
  userId: string = ""; // App user id who created/added review
  comment: string = "";
  verified: string = "";
}

export class Property {
  //identifiers
  id: string = "";
  userId: string = "";

  // property details
  type: string = "";
  title: string = "";
  description: string = "";
  status: string = "";
  floors: number = -1;
  AddedDate: Date = new Date("1999-12-31");
  Effective: string;
  coverImgage: string;
  yearBuilt: number = 0;
  renovated: boolean = false;
  yearRenovated: number = 0;

  // price range
  priceStart: number = 0;
  priceEnd: number = 0;

  // property address
  line1: string = "";
  line2: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
  landMark: string = "";
  geoCode: string = "";
  lat: number = 0.0;
  long: number = 0.0;

  // primary contact details
  firstName: string = "";
  lastName: string = "";
  mobile: string = "";
  email: string = "";
  lang1: string = "";
  lang2: string = "";
  lang3: string = "";
  lang4: string = "";

  // rating summary
  ratingStar: number = 0;
  ratingCount: number = 0;

  // cover image url
  imgURL: string = "";

  address: Address = new Address();
  contact: Contact = new Contact();
  amenities: PropAmenity[] = [];
  stayPlans: PropStayPlan[] = [];
  images: PropertyImage[] = [];
  nearbys: NearBy[] = [];

  isDaily: boolean = false;
  isWeekly: boolean = false;
  isMonthly: boolean = false;

  dailyMinPrice: number = 0;
  dailyMaxPrice: number = 0;
  weeklyMinPrice: number = 0;
  weeklyMaxPrice: number = 0;
  monthlyMinPrice: number = 0;
  monthlyMaxPrice: number = 0;

  verified: boolean = false;

  constructor() {
    this.id = "";
    this.type = "";
    this.title = "";
    this.description = "";
    this.status = "";
    this.floors = -1;
    this.AddedDate = new Date("1999-12-31");
    this.Effective = "";
    this.coverImgage = "";
    this.images = [];
  }
}

export class UploadPresignedAPIDetails {
  folderPath: string = "";
  objectName: string = "";
  preSignedURL: string = "";
}

export class UploadPresignedAPIRequest {
  imagesDetails: UploadPresignedAPIDetails[] = [];
}

export class UploadPresignedAPIResponse {
  imagesDetails: UploadPresignedAPIDetails[] = [];
}

export class PropertyAPIRequest {
  property: Property = new Property();
}

export class UploadDetails {
  detail: UploadPresignedAPIDetails = new UploadPresignedAPIDetails();
  content: File = new File(
    [new Blob(["initialize file object"], { type: "text/plain" })],
    "test.txt"
  );
}

export class Address {
  propID: string = "";
  type: string = "";
  line1: string = "";
  line2: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
  landMark: string = "";
  geoCode: string = "";
  lat: number = 0.0;
  long: number = 0.0;

  constructor() {
    this.propID = "";
    this.type = "";
    this.line1 = "";
    this.line2 = "";
    this.city = "";
    this.state = "";
    this.zip = "";
    this.landMark = "";
    this.geoCode = "";
    this.lat = 0.0;
    this.long = 0.0;
  }
}

export class Contact {
  propID: string = "";
  firstName: string = "";
  lastName: string = "";
  mobile: string = "";
  lang1: string = "";
  lang2: string = "";
  lang3: string = "";
  lang4: string = "";
  email: string = "";
  constructor() {
    this.propID = "";
    this.firstName = "";
    this.lastName = "";
    this.mobile = "";
    this.lang1 = "";
    this.lang2 = "";
    this.lang3 = "";
    this.lang4 = "";
    this.email = "";
  }
}

export class AppUser {
  id: string = ""; // Firebase document ID
  displayName: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  signInMethod: string = "";
  mobile: string = "";
  admin: boolean = false;
  lang1: string = "";
  lang2: string = "";
  lang3: string = "";
  lang4: string = "";
}

export interface PHUploadFile {
  file: File;
  fileDescr: string;
  signedURL: string;
  width: number;
  height: number;
  validAspect: string;
}

export class PropAmenity {
  propID: string = "";
  name: string = "";
  usageType: string = "";
  amount: number = 0;
  perSpan: string = "";
  constructor() {
    this.propID = "";
    this.name = "";
    this.usageType = "";
    this.amount = 0;
    this.perSpan = "";
  }
}

export class PropStayPlan {
  propID: string = "";
  name: string = "";
  minPrice: number = 0;
  maxPrice: number = 0;
  foodIncluded: string = "";
}

export class MasterAmenity {
  name: string = "";
  iconName: string = "";
  displayValue: string = "";
}

export class MasterAmenityUsageType {
  name: string = "";
  iconName: string = "";
}

export class MasterStayPlan {
  name: string = "";
  iconName: string = "";
  displayValue: string = "";

  //   constructor() {
  //     this.name = "";
  //     this.iconName = "";
  //     this.displayValue = "";
  // }

  constructor(pname: string, piconName: string, pdisplayValue: string) {
    this.name = pname;
    this.iconName = piconName;
    this.displayValue = pdisplayValue;
  }
}
export class RawFilter {
  type: string = ""; // Distance, Amenity
  name: string = "";
  value: string = "";

  constructor() {
    this.name = "";
    this.value = "";
  }
}

export class AppData {
  firstSearch: boolean = true;
}

export type GlobalData = {
  compName: string;
  callingCompName: string;
  property: Property;
  searchText: string;
  searchWithIn: number;
  searchLat: number;
  searchLong: number;
  performSearch: boolean;
  curLat: number;
  curLong: number;
  curAddress: string;
  firstSearch: boolean;
};

export const GLOBAL_INITIAL_DATA: GlobalData = {
  compName: "home",
  callingCompName: "home",
  property: new Property(),
  searchText: "",
  searchWithIn: 5,
  searchLat: 0,
  searchLong: 0,
  performSearch: false,
  curLat: 12.981989594362222,
  curLong: 77.59589210484589,
  curAddress: "Bengaluru",
  firstSearch: true,
};
