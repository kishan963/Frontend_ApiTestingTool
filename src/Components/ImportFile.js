import React, { useRef } from 'react';
import Button from "@mui/material/Button";

const FileInputComponent=()=> {
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Perform operations with the selected file
    console.log('Selected file:', file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={openFileDialog}  size="large"  sx={{ width: "100px", height: "30px" }}>
          IMPORT
        </Button>
    </div>
  );
}

export default FileInputComponent;
