import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  if (!user || !potentialChats || !createChat || !onlineUsers) {
    return <div>Loading...</div>;
  }

  const sortedChats = potentialChats.sort((a, b) => {
    const aIsOnline = onlineUsers?.some(onlineUser => onlineUser?.userId === a?._id);
    const bIsOnline = onlineUsers?.some(onlineUser => onlineUser?.userId === b?._id);
    return bIsOnline - aIsOnline;
  });

  return (
    <div className="all-users">
      {sortedChats.map((receiver, index) => (
        <div
          className="single-user"
          key={index}
          onClick={() => createChat(user._id, receiver._id)}
        >
          <span
            className={
              onlineUsers?.some(onlineUser => onlineUser?.userId === receiver?._id)
              ? "user-online"
              : ""
            }
          ></span>
            <p className="user-name2">{receiver.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
