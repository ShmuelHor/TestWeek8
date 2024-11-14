import React from "react";
import "./ThreatChart.css";
interface MessageProps {
  threatsList: {
    _id?: string;
    missileName: string;
    location: string;
    idUser: string;
    status: string;
    speed?: number;
  }[];
  user: {
    username: string;
    password: string;
    organization: string;
    location?: string;
    resources: {
      name: string;
      amount: number;
    }[];
    budget: number;
  };
}

const ThreatChart: React.FC<MessageProps> = ({ threatsList, user }) => {
//   const { joinRoom, leaveRoom, sendMessageToRoom, threats } = useSocket();
//   const aaa = async (_id: any) => {
//     Math.max(...user.resources.map((x) => x.amount));
//     joinRoom(user.location!);
//     await setTimeout(() => {
//       sendMessageToRoom(user.location!, { _id: _id, status: "Intercepted" });
//     }, Math.min(...user.resources.map((x) => x.amount)));
//   };
  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Missile Name</th>
            <th>Speed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {threatsList.map((threat) => (
            <tr key={threat._id}>
              <td>{threat.missileName}</td>
              <td>{threat.speed ?? "N/A"}</td>
              <td>
                {threat.status}
                {threat.status === "Launched" &&
                  user.organization === "IDF" &&
                  threat.speed! <
                    Math.max(...user.resources.map((x) => x.amount)) && (
                    <button
                    //   onClick={() => {
                    //     aaa(threat._id);
                    //   }}
                    >
                      {" "}
                      ❌{" "}
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatChart;
