// import { defineBackend } from '@aws-amplify/backend';
// import { auth } from './auth/resource';
// import { data } from './data/resource';

// /**
//  * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
//  */
// defineBackend({
//   auth,
//   data,
// });


import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  data,
});

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.ca-central-1.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "ca-central-1",
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:ca-central-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
    ],
    actions: ["bedrock:InvokeModel"],
    
  })
);