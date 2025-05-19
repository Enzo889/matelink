"use client"
import { UserTable } from "@/types/tables.type";
import { supabase } from "@/utils/client";
import { useEffect, useState } from "react";

export const UsersProfile = () => {
  const [usersData, setUsersData] = useState<UserTable[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('users').select('*');
    if (data) setUsersData(data);
    if (error) setErrorMsg(error.message);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {errorMsg && <p className="text-red-500">Error: {errorMsg}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : usersData.length > 0 ? (
        usersData.map((user) => (
          <div key={user.id}>
            <p>ID: {user.id}</p>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};
