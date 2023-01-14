import { FC} from "react";
import Button from "@/components/Button";
import { btnType } from "@/components/Button/models";

import { LogsReportsBtnProps } from "./utils";


import "./style.css";

const BtnLogs: FC = () => {
 
  return (
    <>
    
      <div className="logsbtncontainer">
        {LogsReportsBtnProps.map((val, key) => {
          return (
            <p className="logswrapper" key={key}>
              <Button
                type={btnType.Submit}
                svg={val.svg}
                icon={val.icon}
                children={val.children}
                buttonStyle={val.buttonStyle}
                buttonSize={val.buttonSize}
                onClick={() => (val.id)}
              ></Button>
            </p>
          );
        })}
        </div>

      
      
    </>
  );
};

export default BtnLogs;
