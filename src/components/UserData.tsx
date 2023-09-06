import React, { useState, useEffect } from "react";
import axios from "axios";

const UserData:React.FC =()=> {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      console.log(response.data);
      const { name, email } = response.data.results[0];
      const userData  = { name: `${name.title}.${name.first} ${name.last}`, email };

       // Save the data to local storage as a JSON string
      localStorage.setItem("myData", JSON.stringify(userData));
      console.log("Data saved to local storage:", userData);
    
     setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {userData ? (
        <div className="m-2 p-2 border border-blue-300 rounded-xl justify-center lg:mx-80 my-40 bg-slate-100 w-auto">
          <p ><span className="text-lg font-bold">Name:</span>{userData.name}</p>
          <p ><span className="text-lg font-bold">Email:</span>{userData.email}</p>
        
          <button className="m-2 p-1 border border-blue-400 bg-green-400 rounded-lg text-white" onClick={fetchUserData}>Refresh</button>
        </div>
      ) : (
        <p className="text-xl font-bold lg:mx-80 my-56 w-auto">Loading...</p>
      )}
    </>
  );
};

export default UserData;
