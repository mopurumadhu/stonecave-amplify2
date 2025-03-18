import { useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import HomePage from "./pages/home/home";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useAppDispatch } from "./app/hooks";
import { updateUser } from "./slices/user-slice";
const client = generateClient<Schema>();
Amplify.configure(outputs);

function App() {
  return (
    <div>
      <DetermineLoggedInUser />
      <HomePage />
    </div>
  );
}

const DetermineLoggedInUser: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetchAuthSession();
        const currentUser = await getCurrentUser();
        dispatch(
          updateUser({
            id: "taj",
            email: "tajmadhu@gmail.com",
            mobile: "123",
            admin: true,
            displayName: "taj",
            firstName: "Madhu",
            lastName: "Mopuru",
            lang1: "E",
            lang2: "E",
            lang3: "E",
            lang4: "E",
            signedIn: true,
            signInType: "email",
            error: "",
            loginFor: "",
          })
        );
        // setUser(currentUser);
        console.log("Already logged in user: " + currentUser);
      } catch (err) {
        console.log((err as Error).message);
      }
    };
    fetchUser();
  }, []);
  return <div></div>;
};

export default App;
