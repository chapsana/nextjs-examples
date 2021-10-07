import React from "react";

import { useDocument } from "@nandorojo/swr-firestore";
import type { GetStaticProps, GetServerSidePropsContext, NextPage } from "next";

interface Acc {
  accessToken: string;
  accessTokenExpires: string;
  providerAccountId: string;
  providerId: string;
  providerType: string;
  userId: string;
}

const prods = [
  {
    item_id: "SKU_123",
    item_name: "jeggings",
    item_category: "pants",
    item_variant: "black",
    item_brand: "Google",
    price: 9.99,
  },

  // A pair of boots
  {
    item_id: "SKU_456",
    item_name: "boots",
    item_category: "shoes",
    item_variant: "brown",
    item_brand: "Google",
    price: 24.99,
  },

  // A pair of socks
  {
    item_id: "SKU_789",
    item_name: "ankle_socks",
    item_category: "socks",
    item_variant: "red",
    item_brand: "Google",
    price: 5.99,
  },
];

import { getRemoteConfig, getValue } from "firebase/remote-config";

export async function getStaticProps(context: GetServerSidePropsContext) {
  return {
    props: {
      appTitle:context.appTitle,
    },
  };
}

import { getAnalytics, logEvent } from "firebase/analytics";
const Home: NextPage = () => {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "notification_x_received");
    logEvent(analytics, "view_item_list", prods[0]);
    logEvent(analytics, "select_item", prods[0]);
    logEvent(analytics, "view_item", prods[0]);

    // return () => {
    //   cleanup
    // }
  }, []);
  const { data, update, error } = useDocument<Acc>(
    "accounts/WRHlvstlrn0eXQfMwtN0"
  );

  if (error) return <div>Error!</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      Access token : {data.accessToken} <br />
      Access token expires : {data.accessTokenExpires} <br />
      Provider account id : {data.providerAccountId} <br />
      Provider id : {data.providerId} <br />
      Provider type : {data.providerType} <br />
      User id : {data.userId} <br />
    </div>
  );
  // return <div>Name:</div>;
};

export default Home;
