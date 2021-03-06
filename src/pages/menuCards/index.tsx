import "./index.scss";

import ListedCodes from "../../components/lists/listedMenus";
import { Typography } from "@material-ui/core";
import AddDialog from "../../components/dialogs/addMenuCard";
import React from "react";
import ClientRegistrationDialog from "../../components/forms/clientRegistration";
import { useSelector, RootStateOrAny } from "react-redux";

export default function MenuCards() {
  const userInfo = useSelector((state: RootStateOrAny) => state.userInfo);
  return (
    <main className="admin">
      {userInfo && userInfo.verified ? (
        <>
          <Typography className="my-3" variant="h5">
            Menu kaarten
          </Typography>
          <ListedCodes tools={true} />
          <AddDialog />
        </>
      ) : (
        userInfo && <ClientRegistrationDialog id={userInfo.docid} />
      )}
    </main>
  );
}
