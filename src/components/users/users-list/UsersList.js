import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../../services/user-service";
import { userConstants } from "../../../utils/constants";
import UserCard from "../user-card/UserCard";
import "./UsersList.css";

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch();
  }, []);

  const deleteUserById = async (id) => {
    const currentUser = users.find((u) => u.id === id);

    if (
      window.confirm(
        userConstants.CONFIRM_TO_DELETE_USER +
          currentUser.name +
          " with id: " +
          currentUser.id
      )
    ) {
      await deleteUser(id);
      setUsers((pervState) => {
        return pervState.filter((user) => user.id !== id);
      });
    }
  };

  return (
    <div className="users-list-wrapper">
      {users.map((user) => {
        return (
          <UserCard key={user.id} user={user} deleteUser={deleteUserById} />
        );
      })}
    </div>
  );
}
