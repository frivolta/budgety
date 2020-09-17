/// <reference types="cypress" />
import { NETWORK } from "../../support/variables";
import "cypress-localstorage-commands";

/**
 *  1) User get validation visual errors
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signin
 *  - Throws an error if required fileds are empty
 *  - Shows enabled button if all fields are correctly filled
 *  - Throws error if invalid credentials
 *  - Gets redirected if correctly sign in
 *  - Can navigate to signup
 */

describe("Signin requests", function () {
  this.beforeEach(() => {
    cy.visit(`${NETWORK.LOCAL}/login`, {
      onBeforeLoad: (win) => {
        win.fetch = null;
      },
    }).contains("Sign in");
  });

  it.skip("rejects user login if user email does not exists", () => {
    // Stub rejection server
    cy.server();
    cy.route({
      url: "https://cognito-idp.eu-west-2.amazonaws.com/",
      method: "POST",
      status: 400,
      response: {
        __type: "UserNotFoundException",
        message: "User does not exist.",
      },
      delay: 200,
    }).as("signin-reject");

    cy.signinUser({ email: "testuser@email.com", password: "TestPassword01!" });

    // Wait for server response
    cy.wait("@signin-reject").then((xhr) => {
      expect(xhr.status).to.equal(400);
      cy.get(".Toastify__toast")
        .contains("Oops, something went wrong...")
        .should("be.visible");
    });
  });
  it("signs in user with correct credentials", () => {
    // Stub rejection server
    cy.server();
    cy.route({
      url: "https://cognito-idp.eu-west-2.amazonaws.com/",
      method: "POST",
      status: 200,
      response: {
        ChallengeName: "PASSWORD_VERIFIER",
        ChallengeParameters: {
          SALT: "4003d5db13ffa37b1badfd1eb8628f5e",
          SECRET_BLOCK:
            "JcG095eUELqw4GUSiRi5lgQeG1qgVHcleXjp/pJme4Qxy5CGisWu8iFXS/YC3HXP6tMG1IA3ys+hX9OQ4DGFj3X5ZM1Lju5IQYAx5xpqGpGb6G9JGpoZ2LDu3cv1U39TXJ3KF5egmbq09jOmNey6gtsFPTvVlvh8MMM6NbXDvkErwek1MDdjHXDKL+K9nODOVbIoa2kMqquLKN8006aEMnhMis7XZzXHPuFB5RmZM66G4Stcj7pC9Cob4yhIl+lsW8QRRSpWqJTE431f5ruHAsNLsEX27xNHy/Gr7T4FjMzCFigUUstZKsWVB0krO53fSIo5sYfnxKEtu7sxkGFRj5ZB1BpL/4cj40iKoJGzBMOuEtg+sAbljYDlrT4l7IlHbk33bvqWYN9nxSa9T5CEjZdht6rvNPajLjq44Fhkss+ibCD44rzaK58ZmJHVVyKkVjYaYSXGpaHjq6e1gEBlEr5EWjrD8V+BHwG/N0lD7FfjXwqNmczsQA0ITQ2/gQeR8YoUmnNf6fCMBgwgasv1kmDdLc+xHcL2AeuB7Go5UNuCmiEcKx0/VX84q/b+DVw08vJEKEiqJ0jambAULfLNcyvlnmivxX3XDa1OwS1U3vxSEmzBIwCxrCEJ/iKn0Suw/v6F2D7HiXWwXRfOMrKXfCws7mN8VAO34PL4mtQBda2K0sYpmJqbmyEsSsvMF0CO1IF/7nzdiuT9M2Xz1ktPLah6vaNk4ft/LhGynXu5QKcRIamr8mRVQX9pUC758f2LUgNz5r93sDGz+7KqE0vb3f16ZOylGdYwKFKjcIVt9vh3QlN5CrvIOzrXC0buRPe1nu/Yp3QdK6UUe1tR9Mf0uiP+cUXY+oNISNsKfDSM6vY0IyeQ3MatikhZEfA+dqfTXsRqnXHSul9ZcmUSNUuuaXYut6EA47tkT1aY8mtYJaVb5tukENTSFKEvBl6XSeF//XwNMxftuSCx38tyWTn9IHSZoCXgBjyepyGYbtdJ24SOyAgiiPoccoAVLxOxG56D7/55nJ0qKyTbsbb9pT5qJPrjwKfRDLN6lqvHzODVWhvrHds/GfiREO73IIPDE2b8CoBua5XU3FsGFTX+SgF4zDpmv6hzxv+YEXm8JSwM+JL5AhXi6RoRRuSeBOvQpbsX6q2RVX0l1Cupi2tN6OBrxmc4274q2X83NSTpp2q6dcJLHaOy6O4cL14lkvt/j+7JvxPDdqTR8kW3IX1rRUcut4k5l7uj5Ol9/gAa77O+1Dt/ZtjjvlWBY7TYmfPXy0W+NjvSE/fMeZxJTjBfoTsRe8LAE+3TxLsv4tCqk4vAGEzaTvs3Pe8CSSh0yluKS3u6hhQoHJClQGG4IyjsY3+5rw/kcTq+5mKbHFSbKDC4TOjpqyDf/oAcRR+XCfXD7rnJpjd+pfDyWJnjBtJi8ge5l6P2gz2VnrO2oFS1gJxOcy7Vxyn7h4tOwWnfpRMY4ace1M+1hcj/8FEo1XkjySHWC8TKzxRtmwXPIajugGTJlS7q1KaAzyjyXC1KjclqbQC5iEFTJ8W5OI2pcyUoxCQfxmrbwUAtIxsqolVgNe8rdFZBdwJEBjKfD8QGlzKRWp6Oe2jgvhDiXoteo9dCuRn6qD4O1MpQ5aotaj8RUfK80pGx8whSy2b9vzsmF5jLbYrGnaciCE4AciVFy8hM5djJwzTZCnfABHr2jAOO3RpLf2eXAO9j5t/XMcvo",
          SRP_B:
            "40e077447012d50356179039188ce094cdb125db7089e4f92c65a0432896ad6cbd518f071f2b668ee23754c844b48c47687fe6ccd06d0b3dc9a756433044d1d8dda7ed48cf5bacbbf727ffe5c2618af8139a76017035551c5c223e7069c24790a37d647bfc639b0c1792ec8b524298d575eb3429b74ce9d4fd991c26976a0ad4614986f197710a55b93bdbe73374af660f4897adf3a7c29628e680368b2f5da95525ac9284f208cb5ff7581deda6366c2b9a401877099d997f0803c7bc2f546e35cbc8f6781ba55fad6dded278542421dd8af1ad890fce0a52fb1039ddfff2db9e5b7147579dd5d244dfd9b4027b1b3656aca3e57f37e835802518e533b7d777c19ec377ea548b152a1cfc6390f220bdf0226eba484a3ac278c819a0a7e20de7b3359659f64ff2be43b44c399d7bf5c79469b5a2707c7595639508037e064e3ebd72088adfd5ded77ab4b9788a11ca3cfa7e40d270fed4545b974c789181367443bd6a1bb1d006ac457bb73f1200782484548a839acb80ad603b5720e449df8e",
          USERNAME: "ac65d6d7-2489-47df-a75f-4a34ab5503ba",
          USER_ID_FOR_SRP: "ac65d6d7-2489-47df-a75f-4a34ab5503ba",
        },
      },
      delay: 200,
    }).as("signin-route");
    /*  cy.route({
      url: "https://cognito-identity.eu-west-2.amazonaws.com/",
      method: "POST",
      status: 200,
      response: {
        Credentials: {
          AccessKeyId: "ASIA5RQOUTATEBHWEFWC",
          Expiration: 1.600263198e9,
          SecretKey: "/oQNA4beVzNp5yIvM+XfnG8frgkq12XNynljhlXF",
          SessionToken:
            "IQoJb3JpZ2luX2VjEOX//////////wEaCWV1LXdlc3QtMiJHMEUCIQCNBZwTldfs+SJPrS+OybUI4sOEGZYCQ30bUnfcaU8U1wIgA5yNSA4VVZj3JRaeIDOw5Il1OmNVdgR8rUmouGHZZ2MqzQQI7v//////////ARABGgw5MzA5NjQ4NzEyMDYiDPvP2eI7/ywKD8K5mSqhBGlfUQaqHOWzYpgphPbmE68gvX54Z9vLH2DfHixRXccLpQP/hbs4UWhfDkYftRmlb5NW5UJCkWCF0maOxXwu5fmTcYpeKnqXi6n/tRmk8WffO5QEdH/eryVelBQYCVKcpJv9SQbV30YmOj64ptu1mN/dvFqUm5R7sxjXspk/IS1G45QKmY8z5PKpyDgEmxN201ohfm4ztG/FH5xwM+uGzVYLIFy4fyPSqqkRHDPZnqrL7koy1eLvy/A6dG5Q3dmKHgYPbXU3Fefx7E9NmRTDij/N0/nMcdQoKroAhDhcVVrO2Ltv5HFii7Hyj8GmTDFu47UwpoShMHF9mBBNqyZ80UJIyDNT4cq474Z1p49bFq0+pOm5OpjeIovWhDgHhJvWo3NLKeSlpzJTM3RYxD+ZCCwumFLwUyOCuD5JkqV5PvraribxEBiAuoYka/lGjhnojv2K/qK98HceNvjBoeXYGRFpGeCKyHO3CaQjAxoCGhG66E0czl7U4qfMDgAiukAzlMfaCqoI6dBX+zglJndVF1HX7LQMTdmLT4OEsbrlD+bPl1OExZ6ZeZnLaJvxWUducKW940viONMlC/RQKc/880Oun03co3/uJoUuhXihDerabxnb1h/YHDyT1wPsmn2au+gicytpvwlzyX94PIzn5McoTCqGL6phY0atmHeuM9xCHv441556DqZ29feDhyCtiwWzIs/wGbLzBSoQQixb/7R8MI6MiPsFOoUC+sr9hp/6NH7IiNvWgrCPnne/LJztyoQEj7y65DpNU70g6TplduEChiNZPwZFB9ZVCOSaisHuQ1aTbRAtWKE18nK7ZyGn5MwIlR9l4iVtTDLA/D5rSo2JX0+W7c9mxJE+P/L/6iXlIfxeYSN37KrwE74kjP75v1wSxVGr2+z5beq3f7oEs/A0kSDzDULJqdEhRlpaQF8wgUueN8RcHYlKveuRA9Nc0DA+kK/cdbI5qQuEXR93p56C/3fr30uaKVdjMi3kgfqMDn0kXq1FeoZKhtCNrUYGQ3yTWP+T5zpspUVnNS8LKUscECsLtRfA72dYiU4Gt5UuCqFrZoNGTbfhwMICj+6e",
        },
        IdentityId: "eu-west-2:cd804b2c-53a4-4f6f-814e-0bab5709bbc0",
      },
      delay: 200,
    }).as("signin-verification"); */

    cy.signinUser({ email: "testuser@email.com", password: "TestPassword01!" });

    // Wait for server response
    cy.wait("@signin-route").then((xhr) => {
      expect(xhr.status).to.equal(200);
    });
  });
});
