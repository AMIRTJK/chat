import React from "react";
import { Button } from "@mui/material";

const PanelTabVisa = ({ name, handleShowMention }) => {
  return (
    <Button
      onClick={() => handleShowMention("@")}
      variant="contained"
      sx={{
        padding: "5px 15px",
        backgroundColor: "#007fd2",
        borderRadius: "10px",
        color: "#fff",
        cursor: "pointer",
        textTransform: "none",
        fontWeight: "400",
        fontSize: "16px",
        "&:hover": {
          backgroundColor: "#0065a9",
        },
        transition: "all 100ms",
      }}
    >
      {name}
    </Button>
  );
};

export default PanelTabVisa;
