import  { useEffect } from "react";
import {

  selectUser,
} from "../../../store/features/User/usersSlice";
import { useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useSocket";
import { Link } from "react-router-dom";
import ThreatChart from "../ThreatChart";
import "../AvalilableAmmo.css";

const IDFAvalilableAmmo = () => {
  const dataUsers = useSelector(selectUser);
//   const dispatch = useAppDispatch();
  const { joinRoom, leaveRoom, threats } = useSocket();

  useEffect(() => {
    if (dataUsers?.data.location) {
      console.log("first", dataUsers?.data.location);
      joinRoom(dataUsers?.data.location!);
    }
  }, [joinRoom]);

    // const onClickAmmunition = async (name: string) => {
    //   setTimeout(() => {
    //     dispatch(fetchMissiles(null));
    //   }, 400);
    // };
  console.log(threats);
  return (

    <div>


    <div>
      <Link to="/">
        <button onClick={() => leaveRoom(dataUsers?.data.location!)}>Home</button>
      </Link>
      <h3>organization: {dataUsers?.data.organization}</h3>
      {dataUsers?.data.resources.map((res) => {
        return (
          <div key={res.name}>
            <p>
              {res.name} X {res.amount}
            </p>
          </div>
        );
      })}
    </div>
      <ThreatChart
        threatsList={threats.filter((t) => t.location === dataUsers?.data.location)}
        user={dataUsers?.data!}
      />
    </div>
  );
};

export default IDFAvalilableAmmo;
