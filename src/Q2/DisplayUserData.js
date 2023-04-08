import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

export function DisplayUserData() {
  const [userData, setUserData] = useState({});
  const [isShowAddress, setIsShowAddress] = useState(true);

  const getUserData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/user");
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {}
  };

  const buttonHandler = () => {
    setIsShowAddress(!isShowAddress);
    console.log(userData.address.street);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <h1>Question 2</h1>
      <h2>User</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
      <button onClick={buttonHandler}>
        {isShowAddress ? "Hide Address" : "Show Address"}
      </button>
      {isShowAddress && (
        <>
          <p>Address: {userData.address?.street}</p>
          <p>{userData.address?.suite}</p>
          <p>{userData.address?.city}</p>
          <p>{userData.address?.zipcode}</p>
        </>
      )}
    </>
  );
}
