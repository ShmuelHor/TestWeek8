import React, { useEffect } from "react";
import TAvalilableAmmo from "./Terrorist/TAvalilableAmmo";
import IDFAvalilableAmmo from "./IDF/IDFAvalilableAmmo";
import { useSelector } from "react-redux";
import {
  fetchMissiles,
  selectUser,
} from "../../store/features/User/usersSlice";
import { useAppDispatch } from "../../store/hook";
import "./WarPage.css"

const WarPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const dataUsers = useSelector(selectUser);

  useEffect(() => {
    const a = async () => {
      await dispatch(fetchMissiles(null));
      console.log("first");
    };
    a();
  }, [dispatch]);

  return (
    <div className="page-container">
      {dataUsers?.data.organization === "IDF" ? (
        <IDFAvalilableAmmo />
      ) : (
        <TAvalilableAmmo />
      )}
    </div>
  );
};

export default WarPage;
