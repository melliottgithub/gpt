import React from "react";
import { ClassAttributes } from "react";
import Flex from "../flex";
import "./styles.css";

type TabProps = ClassAttributes<HTMLDivElement> & {
  title: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

type TabsProps = {
  tabs: TabProps[];
  defaultActiveTab?: number;
  className?: string;
  style?: React.CSSProperties;
  onTabClick?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0, className, style, onTabClick }) => {
  const [active, setActive] = React.useState(defaultActiveTab);

  const onTabClickHandler = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setActive(index);

    const tabClickHandler = tabs[index].onClick
    if (tabClickHandler) {
      tabClickHandler(event);
    }

    if (onTabClick) {
      onTabClick(index, event);
    }
  };

  return (
    <div className={`tabs ${className}`} style={style}>
      <Flex flexDirection={"row"} rowGap="4px" wrap={false} className="tabs-header">
        {tabs.map((tab, index) => (
          <div key={index}
            className={`tabs-header-item ${index === active ? "bg-secondary-1" : "bg-tertiary-1"}`}
          >
            <p onClick={(event) => onTabClickHandler(event, index)}>
              {tab.title}
            </p>
          </div>
        ))}
      </Flex>

      <div className="border border-thin border-primary tabs-body">
        {tabs[active].children}
      </div>
    </div>
  );
};

export default Tabs;
