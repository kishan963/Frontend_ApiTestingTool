import React, { useState, useContext } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import { DataContext } from "../Context/DataStorage";
import LanguageIcon from "@mui/icons-material/Language";

const ResponseHandler = () => {
  const storedBody = localStorage.getItem("response");

  const { responseData, responseStatus, apiDuration,responseLength } = useContext(DataContext);
 console.log(responseLength);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography mt={2} mb={2}>
        Response
      </Typography>
      <TextareaAutosize
        value={JSON.stringify(responseData, null, "\t")}
        style={{
          width: "77%",
          paddingLeft: 30,
          background: "url(http://i.imgur.com/2cOaJ.png)",
          backgroundAttachment: "local",
          backgroundRepeat: "no-repeat",
        }}
        placeholder="Response"
        readOnly
        minRows={10}
        maxRows={30}
      />

      <Typography sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
        <LanguageIcon sx={{ marginRight: "8px" }} />{" "}
        <div style={{color: 'green'}}>
        {responseStatus}&nbsp;  {apiDuration} ms &nbsp; {responseLength} B
        </div>
      </Typography>
    </div>
  );
};

export default ResponseHandler;
