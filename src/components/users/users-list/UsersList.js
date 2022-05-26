import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../../services/user-service";
import UserCard from "../user-card/UserCard";
import './UsersList.css';

export function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then(res => {
                setUsers(res.data)
            })
            .catch();
    }, []);

    const deleteUserById = async (id) => {
        await deleteUser(id);
        setUsers(pervState => {
            return pervState.filter(user => user.id !== id);
        });
    }

    return (
        <div className="users-list-wrapper">
            {
                users.map(user => {
                   return <UserCard
                        key={user.id}
                        user={user}
                        deleteUser={deleteUserById}
                    />
                })
            }
        </div>
    )
}