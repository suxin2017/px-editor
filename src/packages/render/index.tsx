import { observer } from "mobx-react-lite";
import React from "react";
import { componentLibs, getComponent } from "./common/componentLib";
import { IComponentProps } from "./interface/IComponentProps";
import { ComponentStore } from "./store/Component";

export interface IRenderProps {
  component: ComponentStore;
}

let Render: React.FC<IRenderProps> = ({ component }) => {
  const Component = getComponent(component.name);
  if (!Component) {
    throw Error("component not found");
  }
  console.log(component);
  return (
    <Component props={component.props} store={component}>
      {component.children?.map((child) => {
        return <Render key={child.id} component={child}></Render>;
      })}
    </Component>
  );
};

Render = observer(Render);

export interface ICreateRenderParams {
  beforeHoc?: () => void;
  hoc?: ((Component: React.FC<IComponentProps>) => React.FC<IComponentProps>)[];
  afterHoc?: () => void;
  componentJson?: string | ComponentStore;
}
const createRender = (options?: ICreateRenderParams) => {
  console.log("运行了");
  if (options?.beforeHoc) {
    options.beforeHoc();
  }
  if (options?.hoc) {
    componentLibs.forEach((Com, key) => {
      const realCom = options.hoc?.reduce((c, hoc) => hoc(c), Com);
      if (realCom) {
        componentLibs.set(key, realCom);
      } else {
        throw Error("component lose ");
      }
    });
  }
  if (options?.afterHoc) {
    options.afterHoc();
  }
  return Render;
};
export { createRender };
