import * as React from 'react'
import { HTMLAttributes } from 'react';
import { connect, MapStateToProps } from 'react-redux';

export type TemplateFunction<ItemData extends {}> =
  (element: React.ReactElement<ItemData>, idx: number, elementsData: ItemData[])
    => React.ReactElement<any> | null;

export type TemplateableComponent<ItemData extends {}> = React.SFC<
  & { children?: TemplateFunction<ItemData>, items: ItemData[] }
  & React.HTMLAttributes<HTMLDivElement>
  >;

export const templateable = <ItemData extends {}>(InnerComponent: React.ComponentType<ItemData>) => {
  const RenderItems: TemplateableComponent<ItemData> = props => {
    const styler: TemplateFunction<ItemData> =
      typeof props.children === 'function' ? props.children : p => p;

    const outerProps = { ...props };
    delete outerProps.children;
    delete outerProps.items;
    delete (outerProps as any).dispatch;

    return (
      <div {...outerProps}>
        {
          props.items.map((item, idx) => {
            let ni = styler(<InnerComponent {...item} key={idx} />, idx, props.items);

            if (ni && !ni.key) {
              ni = React.cloneElement(ni, { ...ni.props, key: idx });
            }

            return ni;
          })
        }
      </div>
    );
  }

  return RenderItems;
}


export const makeConnectedTemplater = <ItemData extends {}>(
  InnerComponent: React.ComponentType<any>,
  mapStateToProps: MapStateToProps<{ items: any[] }, any>):
  React.ComponentType<{ children?: TemplateFunction<ItemData> } & React.HTMLAttributes<HTMLDivElement>> => props => {
    const RenderItems = templateable(InnerComponent);
    const SC = connect(mapStateToProps)(RenderItems);

    return <SC {...props} />;
  }