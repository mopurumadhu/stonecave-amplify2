import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface NumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberProps> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      variant="standard"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileProps {
  onChange: { files: FileList | null };
}

export const InputFileUpload: React.FC<InputFileProps> = ({}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localFiles = event.target.files;
    window.console.log(localFiles);
    // onChange(localFiles);
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(event) => {
          window.console.log(event.target.files);
          handleChange(event);
        }}
        // window.console.log(event.target.files)
        // handleChange
        multiple
      />
    </Button>
  );
};

//     // AWS Cognito synchronization
// export const checkCurrentUser = async () => {
//       try {
//         const { username, userId, signInDetails } = await getCurrentUser();

//         setUser({
//           isLoggedIn: true,
//           userId: userId,
//           email: signInDetails?.loginId || null, // Assuming loginId is the email
//         });
//       } catch (error) {
//         console.log('Error getting current authenticated user:', error);
//         if (user.isLoggedIn) {
//           setUser({
//             isLoggedIn: false,
//             userId: null,
//             email: null,
//           });
//         }
//       }
//     };

// async function checkUserLoggedIn() {
//   try {
//     const user = await Auth.currentAuthenticatedUser();
//     if (user) {
//       console.log('User is logged in:', user);
//       return true;
//     }
//   } catch (error) {
//     console.log('User is not logged in.');
//     return false;
//   }
// }

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export function CircularSize() {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      {/* <CircularProgress size="30px" /> */}
      <CircularProgress size={40} />
      {/* <CircularProgress size="3rem" /> */}
    </Stack>
  );
}

import { createContext, useContext } from "react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
  open: false,
  setOpen: () => {},
});

export const DialogProvider: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}></DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default NumberInput;

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ProgressDiaglogProps {
  // onClose: () => void;
  open: boolean;
}

export const ProgressDiaglog: React.FC<ProgressDiaglogProps> = ({ open }) => {
  // when user clicks out side of window or press esc character, do nothing
  const handleClose = () => {
    // setOpen(false);
    // onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>My Dialog</DialogTitle>
      <DialogContent>
        {" "}
        <CircularSize />{" "}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export function IdentifyMaxLengthWord(str: string): string {
  const tStr = RemoveExtraSpaces(str);
  const parts: string[] = tStr.split(" ");
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 20) {
      return parts[i];
    }
  }
  return "";
}

export function RemoveExtraSpaces(str: string): string {
  return str.replace(/\s+/g, " ");
}

export function PriceDisplay(amount: number): string {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  return formattedPrice;
}

export const formatDateToyyyymmdd = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export const formatStringDateToDisplay = (date: string): string => {
  if (date == null || date == undefined || date == "") {
    return "";
  }
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${day}/${month}/${year}`;
};

export const getCurrentDateyyyymmdd = (): string => {
  return formatDateToyyyymmdd(new Date());
};

export function formatReviewRating(rating: number): string {
  if (rating.toString().length == 1) {
    return rating.toString() + ".0";
  } else {
    return rating.toFixed(1);
  }
}

export function formatReviewRatingForDisplay(rating: number): string {
  if (rating == 0) return "";
  return formatReviewRating(rating);
}

export function formatIndianNumber(number: number): string {
  return new Intl.NumberFormat("en-IN").format(number);
}

export function isMobile(): boolean {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return isMobile;
}
