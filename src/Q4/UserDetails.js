import { useEffect, useState } from "react";
import { fakeFetch1 } from "./fakeFetch1";

export function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const options = userDetails.reduce((acc, curr) => {
    if (acc.includes(curr)) {
      return acc;
    } else {
      return [...acc, curr.company];
    }
  }, []);
  console.log(options);

  const getUserDetails = async () => {
    try {
      const response = await fakeFetch1("https://example.com/api/users");
      if (response.status === 200) {
        setUserDetails(response.data);
        setDisplayData(response.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const changeHandler = (event) => {
    const selectedCompny = event.target.value;
    // console.log(selectedCompny)
    if (selectedCompny === "all") {
      setDisplayData(userDetails);
    } else {
      const filteredUserDetails = userDetails.filter(
        (user) => user.company === selectedCompny
      );
      setDisplayData(filteredUserDetails);
    }
  };

  return (
    <>
      <h1>Question 4</h1>
      <select onChange={changeHandler}>
        <option value="all">All</option>
        {options.map((company) => (
          <option value={company}>{company}</option>
        ))}
      </select>
      <ul>
        {displayData.map(({ name, email, website, company }) => (
          <li key={email}>
            <p>{name}</p>
            <p>{email}</p>
            <p>{website}</p>
            <p>{company}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
