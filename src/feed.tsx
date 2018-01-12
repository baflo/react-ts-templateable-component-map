import * as React from "react";
import { templateable } from "./templateable";

export class Post extends React.Component<{ text: string } & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const htmlProps = { ...this.props };
    delete htmlProps.text;

    return (
      <div {...htmlProps}>
        {this.props.text}
      </div>
    )
  }
}

export const Feed = templateable(Post);
