import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Property: a
    .model({
      id: a.string(),
      type: a.string(),
      title: a.string(),
      description: a.string(),
      status: a.string(),
      floors: a.integer(),
      AddedDate: a.string(),
      Effective: a.string(),
      coverImgage: a.string(),
      yearBuilt: a.integer(),
      renovated: a.boolean(),
      yearRenovated: a.integer(),
      userId: a.string(),

      // price range
      priceStart: a.integer(),
      priceEnd: a.integer(),

      // property address
      line1: a.string(),
      line2: a.string(),
      city: a.string(),
      state: a.string(),
      zip: a.string(),
      landMark: a.string(),
      geoCode: a.string(),
      lat: a.float(),
      lng: a.float(),

      // primary contact details
      firstName: a.string(),
      lastName: a.string(),
      mobile: a.string(),
      email: a.string(),
      lang1: a.string(),
      lang2: a.string(),
      lang3: a.string(),
      lang4: a.string(),

      // rating summary
      ratingStar: a.float(),
      ratingCount: a.integer(),

      // cover image url
      imgURL: a.string(),

      isGym: a.boolean(),
      isCarParking: a.boolean(),
      isBikeParking: a.boolean(),

      isDaily: a.boolean(),
      isWeekly: a.boolean(),
      isMonthly: a.boolean(),

      dailyMinPrice: a.integer(),
      dailyMaxPrice: a.integer(),
      weeklyMinPrice: a.integer(),
      weeklyMaxPrice: a.integer(),
      monthlyMinPrice: a.integer(),
      monthlyMaxPrice: a.integer(),

      verified: a.boolean(),

      mostCriticalRating: a.string(),
      mostHelpfulRating: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ApproveProperty: a
    .mutation()
    .arguments({ propId: a.string() })
    .returns(a.ref("Property"))
    .authorization((allow) => [allow.publicApiKey()]),
  // .handler(a.handler.function(echoHandler))

  Amenity: a
    .model({
      propId: a.string(),
      name: a.string(),
      usageType: a.string(),
      amount: a.integer(),
      span: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  MasterAmenity: a
    .model({
      name: a.string(),
      iconName: a.string(),
      displayValue: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  MasterAmenityUsageType: a
    .model({
      name: a.string(),
      iconName: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  MasterStayPlan: a
    .model({
      name: a.string(),
      iconName: a.string(),
      displayValue: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  Image: a
    .model({
      propId: a.string(),
      fileName: a.string(),
      descr: a.string(),
      displayOrder: a.integer(),
      imageURL: a.string(),
      width: a.integer(),
      height: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  NearBy: a
    .model({
      propId: a.string(),
      type: a.string(),
      name: a.string(),
      displayOrder: a.integer(),
      lat: a.integer(),
      lng: a.integer(),

      distance: a.integer(),

      line1: a.string(),
      line2: a.string(),
      city: a.string(),
      state: a.string(),
      zip: a.string(),
      landMark: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  User: a
    .model({
      propId: a.string(),
      displayName: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      signInMethod: a.string(),
      mobile: a.string(),
      lang1: a.string(),
      lang2: a.string(),
      lang3: a.string(),
      lang4: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Rating: a
    .model({
      id: a.string(), // rating id is needed for RatingConversation
      propId: a.string(),
      userId: a.string(),
      stayedFrom: a.string(),
      stayedTo: a.string(),
      stayCurrent: a.boolean(),
      rating: a.integer(),
      cleanRating: a.integer(),
      foodRating: a.integer(),
      valueRating: a.integer(),
      amensRating: a.integer(),
      title: a.string(),
      comment: a.string(),
      status: a.string(),
      createdDate: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  RatingConversation: a
    .model({
      ratingId: a.string(),
      userId: a.string(),
      comment: a.string(),
      status: a.string(),
      createdDate: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  StayPlan: a
    .model({
      propId: a.string(),
      name: a.string(),
      minPrice: a.integer(),
      maxPrice: a.integer(),
      foodIncluded: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
