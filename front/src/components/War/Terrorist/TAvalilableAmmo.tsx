import React, { useEffect, useState } from "react";
import {
  fetchMissiles,
  selectUser,
} from "../../../store/features/User/usersSlice";
import { useAppDispatch } from "../../../store/hook";
import { useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useSocket";
import { Link } from "react-router-dom";
import ThreatChart from "../ThreatChart";
import "../AvalilableAmmo.css";

const TAvalilableAmmo = () => {
  const dataUsers = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { joinRoom, sendMessageToRoom, threats } = useSocket();
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    if (room) {
      joinRoom(room);
    }
  }, [room, joinRoom]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  };

  const onClickAmmunition = async (name: string) => {
    const token = GetIDFromToken();
    sendMessageToRoom(room, {
      missileName: name,
      location: room,
      idUser: token,
      status: "Launched",
    });

    setRoom("");
    setTimeout(() => {
      dispatch(fetchMissiles(null));
    }, 400);
  };

  const GetIDFromToken = () => {
    const token = localStorage.getItem("Token");
    if (!token) throw new Error("No token found");
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.userId) throw new Error("User ID not found in token");
    // console.log(payload.userId);
    return payload.userId;
  };
  return (
    <div>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>

        <h3>organization: {dataUsers?.data.organization}</h3>
        {dataUsers?.data.organization !== "IDF" && (
          <div>
            <h4>Location:</h4>
            <select
              name="location"
              value={room}
              onChange={handleChange}
              required
            >
              <option value="">Location</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
              <option value="West Bank">West Bank</option>
            </select>
          </div>
        )}
        {dataUsers?.data.resources.map((res) => (
          <div key={res.name}>
            {res.amount > 0 && (
              <p onClick={() => onClickAmmunition(res.name)}>
                {res.name} X {res.amount}
              </p>
            )}
          </div>
        ))}
      </div>
      <ThreatChart
        threatsList={threats.filter((threat) => threat.idUser === GetIDFromToken())}
        user={dataUsers?.data!}
      />
    </div>
  );
};

export default TAvalilableAmmo;
