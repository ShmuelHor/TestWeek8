import React, { useEffect, useState } from "react";
import {
  fetchMissiles,
  fetchSubtractAmmunition,
  selectUser,
} from "../../store/features/User/usersSlice";
import { useAppDispatch } from "../../store/hook";
import { useSelector } from "react-redux";

const AvalilableAmmo = () => {
  const [location, setLocation] = useState<string>("");
  const dataUsers = useSelector(selectUser);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    const a = async () => {
      await dispatch(fetchMissiles(null));
      console.log("first");
    };
    a();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };
  const onClickAmmunition = async (name: string) => {
    await dispatch(
      fetchSubtractAmmunition({
        missileName: name,
        location: location.toString(),
      })
    );
    setLocation("");
    console.log(location);
  };
  return (
    <div style={{backgroundColor: "red"}}>
        <h3>organization: {dataUsers?.data.organization}</h3>
      <label>Location:</label>
      {dataUsers?.data.organization !== "IDF" && (
        <select
          name="location"
          value={location}
          onChange={handleChange}
          required
        >
          <option value="">Location</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
      )}
      {dataUsers?.data.resources.map((res) => {
        return (
          <div key={res.name}>
            <p onClick={() => onClickAmmunition(res.name)}>
              {res.name} X {res.amount}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AvalilableAmmo;
